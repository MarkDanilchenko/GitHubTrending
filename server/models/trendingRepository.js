import { Schema } from "./index.js";

const TrendingRepositorySchema = new Schema(
  {
    full_name: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    git_id: {
      type: Number,
      required: true,
      unique: true,
    },
    owner_login: {
      type: String,
      required: true,
    },
    html_url: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      default: "",
    },
    stargazers_count: {
      type: Number,
      required: true,
      default: 0,
    },
    language: {
      type: String,
      required: true,
    },
  },
  { versionKey: false },
);

export default TrendingRepositorySchema;
