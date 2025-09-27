import { ArgsProps, ApiResponse } from "./types";

// Request/Response Interceptors
export interface RequestInterceptor {
  onRequest?: (config: ArgsProps) => ArgsProps | Promise<ArgsProps>;
  onRequestError?: (error: Error) => void | Promise<void>;
}

export interface ResponseInterceptor<T = unknown> {
  onResponse?: (response: ApiResponse<T>) => ApiResponse<T> | Promise<ApiResponse<T>>;
  onResponseError?: (error: Error) => void | Promise<void>;
}

// Timeout configuration
export interface TimeoutConfig {
  timeout?: number; // milliseconds
  timeoutErrorMessage?: string;
}

// Request cancellation
export interface CancellationConfig {
  signal?: AbortSignal;
  onCancel?: () => void;
}

// Plugin system
export interface Plugin {
  name: string;
  version?: string;
  install: (apiInstance: unknown) => void;
  uninstall?: (apiInstance: unknown) => void;
}

// Enhanced configuration
export interface EnhancedArgsProps extends ArgsProps {
  timeout?: TimeoutConfig;
  cancellation?: CancellationConfig;
  interceptors?: {
    request?: RequestInterceptor[];
    response?: ResponseInterceptor[];
  };
}

// Performance monitoring
export interface PerformanceMetrics {
  startTime: number;
  endTime?: number;
  duration?: number;
  requestSize?: number;
  responseSize?: number;
  retryCount?: number;
}

export interface PerformanceConfig {
  enableMetrics?: boolean;
  onMetrics?: (metrics: PerformanceMetrics) => void;
}

// Cache configuration
export interface CacheConfig {
  ttl?: number; // Time to live in milliseconds
  key?: string | ((args: ArgsProps) => string);
  storage?: "memory" | "localStorage" | "sessionStorage" | CustomCacheStorage;
}

export interface CustomCacheStorage {
  get: (key: string) => Promise<unknown> | unknown;
  set: (key: string, value: unknown, ttl?: number) => Promise<void> | void;
  delete: (key: string) => Promise<boolean> | boolean;
  clear: () => Promise<void> | void;
}

// Rate limiting
export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
  onRateLimit?: (retryAfter: number) => void;
}

// Request deduplication
export interface DeduplicationConfig {
  enabled?: boolean;
  keyGenerator?: (args: ArgsProps) => string;
  maxAge?: number;
}
