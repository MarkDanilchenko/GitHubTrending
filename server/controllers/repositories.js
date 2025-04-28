import { badRequestError } from "../utils/errors.js";

class RepositoriesController {
  async getRepos(req, res) {
    try {
    } catch (error) {
      badRequestError(res, error.message);
    }
  }

  async getExactRepo(req, res) {
    try {
    } catch (error) {
      badRequestError(res, error.message);
    }
  }
}

const repositoriesController = new RepositoriesController();

export default repositoriesController;
