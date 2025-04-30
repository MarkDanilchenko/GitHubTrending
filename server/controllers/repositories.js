import { badRequestError, notFoundError } from "#server/utils/errors.js";
import { TrendingRepository } from "../models/init.js";

class RepositoriesController {
  async getRepos(req, res) {
    /*
    #swagger.tags = ['Repositories']
    #swagger.summary = 'Get repositories'
    #swagger.description = 'Get repositories'
    #swagger.operationId = 'getRepos'
    #swagger.parameters['$ref'] = [
      '#/components/parameters/LimitInQuery',
      '#/components/parameters/OffsetInQuery',
      '#/components/parameters/SortInQuery',
      '#/components/parameters/OrderInQuery',
      '#/components/parameters/QueryInQuery'
      ]
    #swagger.responses[200] = {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/ResponseGetReposListSchema'
          }
        }
      }
    },
    #swagger.responses[400] = {
      description: 'Bad request',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Response400Schema'
          }
        }
      }
    }
     */
    try {
      const { limit, offset, sort, order, query } = req._query;

      const count = await TrendingRepository.countDocuments();
      const repositories = await TrendingRepository.find({
        $or: [
          { name: { $regex: new RegExp(query, "i") } },
          { description: { $regex: new RegExp(query, "i") } },
          { full_name: { $regex: new RegExp(query, "i") } },
        ],
      })
        .sort({ [sort]: parseInt(order) })
        .skip(offset)
        .limit(limit);

      res.status(200);
      res.send(
        JSON.stringify({
          repositories,
          count,
          limit,
          offset,
        }),
      );
      res.end();
    } catch (error) {
      badRequestError(res, error.message);
    }
  }

  async getExactRepo(req, res) {
    /*
    #swagger.tags = ['Repositories']
    #swagger.summary = 'Get exact repository'
    #swagger.description = 'Get exact repository'
    #swagger.operationId = 'getExactRepo'
    #swagger.parameters['$ref'] = ['#/components/parameters/IdInPath']
    #swagger.responses[200] = {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/ResponseGetExactRepoSchema'
          }
        }
      }
    },
    #swagger.responses[400] = {
      description: 'Bad request',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Response400Schema'
          }
        }
      }
    }
     */
    try {
      const { id } = req.params;

      const repository = await TrendingRepository.findById(id);
      if (!repository) {
        return notFoundError(res, "Repository not found!");
      }

      res.status(200);
      res.send(JSON.stringify({ repository }));
      res.end();
    } catch (error) {
      badRequestError(res, error.message);
    }
  }
}

const repositoriesController = new RepositoriesController();

export default repositoriesController;
