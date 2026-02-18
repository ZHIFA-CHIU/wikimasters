import "server-only";
import { Redis } from "@upstash/redis";

// Initialize Redis
const redis = Redis.fromEnv();

export const incrementViewCountBySlug = async (slug: string) => {
  return redis.incr(`article::viewcount::${slug}`);
};
