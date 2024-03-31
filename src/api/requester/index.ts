/* eslint-disable no-unused-vars */
import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import axios from 'axios';
import type { RequesterConfig } from './config';
import defaultConfig from './config.ts';

const apiKey = import.meta.env.VITE_API_KEY;

interface ServerResponse {
  msg: string;
  code: number | string;
  data?: any;
  /**
   * YYYY/MM/DD HH:mm:ss
   * @example
   * "2024/01/23 14:09:03"
   */
  systemTime: string;
}

// eslint-disable-next-line no-shadow
export enum RestRequestErrorCode {
  OFFLINE = 0,
  TIMEOUT = -1,
  BAD_REQUEST = -2,
  BAD_RESPONSE = -3,
  UNKNOWN = -999,
}

export interface TransformedResponse<T = any> {
  success: boolean;
  message: string;
  action?: string;
  errorCode?: RestRequestErrorCode | number | string;
  /**
   * 是否為非正確回應錯誤
   * 以 `errorCode === RestRequestErrorCode` 判斷
   */
  isRestRequestError?: boolean;
  data?: T;
  systemTime?: number;
  axiosResponse?: AxiosResponse<ServerResponse | any>;
}

interface Requester {
  get: (
    url: string,
    requestConfig?: AxiosRequestConfig,
  ) => Promise<TransformedResponse>;
  post: (
    url: string,
    data?: Record<string, any>,
    requestConfig?: AxiosRequestConfig,
  ) => Promise<TransformedResponse>;
  patch: (
    url: string,
    data?: Record<string, any>,
    requestConfig?: AxiosRequestConfig,
  ) => Promise<TransformedResponse>;
}

export type Request<T> = Promise<TransformedResponse<T>>;

let requester: Requester | null = null;

export function createRequester(requesterConfig?: RequesterConfig) {
  if (requester !== null) {
    throw new Error('Requester is already created');
  }

  const config = { ...defaultConfig, ...requesterConfig };
  const { errorMessages, beforeRequest, afterResponseParsed } = config;
  const axiosInstance = axios.create({
    baseURL: config.baseURL,
    timeout: 1000 * config.timeoutSeconds!,
    headers: {
      'Content-Type': config.defaultContentType,
      ...config.customHeaders,
    },
    withCredentials: true,
    transitional: {
      clarifyTimeoutError: true,
    },
  });

  // order 1: Execute callback before request
  axiosInstance.interceptors.request.use((requestConfig) => {
    // console.log('request interceptor');
    // 取出cookie內的token (fat_vite_token)
    // const cookieToken = document.cookie.replace(
    //   /(?:(?:^|.*;\s*)hyra_token\s*=\s*([^;]*).*$)|^.*$/,
    //   '$1',
    // );

    // requestConfig.headers.Authorization = `Bearer ${cookieToken}`; // 將cookie內的Token塞入header

    beforeRequest?.(requestConfig);

    return requestConfig;
  }, (error) => {
    console.log('request interceptor error');
    console.log(error);

    return Promise.reject(error);
  });

  // order 4: Transform response.data into TransformedResponse
  axiosInstance.interceptors.response.use((response: AxiosResponse<ServerResponse>) => {
    // console.log('response interceptor');
    // console.log(response);
    const { data } = response;
    const systemTime = Date.parse(data.systemTime);

    const transformedResponse: TransformedResponse = {
      success: data.code === '0001',
      data: null,
      message: data.msg,
      systemTime,
      axiosResponse: response,
    };

    if (!transformedResponse.success) {
      transformedResponse.errorCode = data.code;
    }

    if (response.data !== null) {
      transformedResponse.data = response.data.data;
    }

    return transformedResponse as any;
  }, (error: AxiosError): TransformedResponse => {
    // console.log('response interceptor error');
    // console.log(error);
    const { code } = error;

    if (code === 'ERR_NETWORK') {
      // 1. navigator.onLine is false
      // 2. user connection is offline between request and response
      // timeout
      return {
        success: false,
        errorCode: RestRequestErrorCode.OFFLINE,
        isRestRequestError: true,
        message: errorMessages!.ERR_NETWORK(error),
        axiosResponse: error.response,
      };
    }

    if (code === 'ETIMEDOUT') {
      // timeout
      return {
        success: false,
        errorCode: RestRequestErrorCode.TIMEOUT,
        isRestRequestError: true,
        message: errorMessages!.ETIMEDOUT(error),
        axiosResponse: error.response,
      };
    }

    if (code === 'ERR_BAD_REQUEST') {
      // http is not ok, status 400 to 499
      return {
        success: false,
        errorCode: RestRequestErrorCode.BAD_REQUEST,
        isRestRequestError: true,
        message: errorMessages!.ERR_BAD_REQUEST(error),
        axiosResponse: error.response,
      };
    }

    if (code === 'ERR_BAD_RESPONSE') {
      // http is not ok, status 500 to 599
      return {
        success: false,
        errorCode: RestRequestErrorCode.BAD_RESPONSE,
        isRestRequestError: true,
        message: errorMessages!.ERR_BAD_RESPONSE(error),
        axiosResponse: error.response,
      };
    }

    return {
      success: false,
      errorCode: RestRequestErrorCode.UNKNOWN,
      isRestRequestError: true,
      message: errorMessages!.UNKNOWN(error),
      axiosResponse: error.response,
    };
  });

  // order after order 4: Execute callback before response return
  axiosInstance.interceptors.response.use((transformedResponse: any) => {
    // console.log('afterResponseParsed');
    afterResponseParsed?.(transformedResponse);

    return (transformedResponse as TransformedResponse) as any;
  });

  async function get(
    url: string,
    requestConfig?: AxiosRequestConfig,
  ) {
    const defaultRequestConfig = {
      params: {
        apiKey,
      },
    };
    const newRequestConfig = {
      ...requestConfig,
      params: {
        ...defaultRequestConfig.params,
        ...requestConfig?.params,
      },
    };
    const result = await axiosInstance.get(url, newRequestConfig);

    return result as unknown as TransformedResponse;
  }

  async function post(
    url: string,
    data?: Record<string, any>,
    requestConfig?: AxiosRequestConfig,
  ) {
    const result = await axiosInstance.post(url, { ...data, apiKey }, requestConfig);

    return result as unknown as TransformedResponse;
  }

  async function patch(
    url: string,
    data?: Record<string, any>,
    requestConfig?: AxiosRequestConfig,
  ) {
    const result = await axiosInstance.patch(url, { ...data, apiKey }, requestConfig);

    return result as unknown as TransformedResponse;
  }

  requester = { get, post, patch };

  return requester;
}

export function useRequester() {
  if (requester === null) {
    throw new Error('Requester is not created');
  }

  return requester;
}
