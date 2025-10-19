import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Initialize Upstash Redis
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// Single rate limiter: 10 requests per 60 seconds per IP
export const rateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "60 s"),
  prefix: "global-api-rl", // Single prefix for all APIs
  analytics: true, // Track usage in Upstash dashboard
});

// Get IP for rate limiting
export const byIP = (req) =>
  req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anonymous";
