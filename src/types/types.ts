import { AxiosRequestConfig, AxiosResponse } from 'axios';

export type HttpServiceError = {
  readonly error?: unknown;
  readonly message: string;
};

export type BoolBacks<T> = {
  readonly onSuccess: (data: T) => unknown;
  readonly onFailure: (error: HttpServiceError) => unknown;
};

export type HTMLHeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type SassyAxiosError<T = unknown, D = unknown> = {
  message?: string;
  code?: string;
  config?: AxiosRequestConfig<T>;
  request?: unknown;
  response?: AxiosResponse<T, D>;
};
