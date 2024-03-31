import type { InternalAxiosRequestConfig, AxiosError } from 'axios';
import type CommonContentType from './CommonContentType';
import type { TransformedResponse } from './index';

const ApiUrl = import.meta.env.VITE_APP_PROXY_TARGET;
type ErrorMessage = (error: AxiosError) => string;

export interface RequesterConfig {
  baseURL?: string;
  timeoutSeconds?: number;
  defaultContentType?: keyof typeof CommonContentType;
  customHeaders?: Record<string, string>;
  errorMessages?: {
    ERR_NETWORK: ErrorMessage;
    ETIMEDOUT: ErrorMessage;
    ERR_BAD_REQUEST: ErrorMessage;
    ERR_BAD_RESPONSE: ErrorMessage;
    UNKNOWN: ErrorMessage;
  };
  beforeRequest?: (requestConfig: InternalAxiosRequestConfig) => InternalAxiosRequestConfig;
  afterResponseParsed?: (transformedResponse: TransformedResponse) => TransformedResponse;
}

const defaultConfig: RequesterConfig = {
  baseURL: ApiUrl,
  timeoutSeconds: 10,
  defaultContentType: 'application/json',
  customHeaders: {},
  errorMessages: {
    ERR_NETWORK: () => '沒有網路連線',
    ETIMEDOUT: () => '連線逾時，請稍後再試',
    ERR_BAD_REQUEST: () => '錯誤的請求，無法取得資源',
    ERR_BAD_RESPONSE: () => '伺服器錯誤，無法執行請求',
    UNKNOWN: () => '未知錯誤',
  },
  beforeRequest: undefined,
  afterResponseParsed: undefined,
};

export default defaultConfig;
