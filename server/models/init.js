import { mongoose } from "./index.js";
import TrendingRepositorySchema from "./trendingRepository.js";

export const TrendingRepository = mongoose.model("TrendingRepository", TrendingRepositorySchema);

export default mongoose;
