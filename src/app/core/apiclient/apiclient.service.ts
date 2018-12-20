import { Injectable } from '@angular/core';
import {ErrorResult} from './ErrorResult';
import {ApiResult} from './ApiResult';
import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {API_STATUS_CODE, CONSTANTS, HTTP_CODE} from '../commons/Constants';

@Injectable()
export class ApiClientService {

  private handleBusiness?: (error: ErrorResult | null) => void;
  private handleException?: (error: ErrorResult | null) => void;
  private genHeader?: () => Promise<any>;
  
  constructor() {
  }
  
  setHeader(genHeader: () => Promise<any>): void {
    this.genHeader = genHeader;
  }
  
  handleExceptionError = (handle: (error: ErrorResult | null) => void): void => {
    this.handleException = handle;
  };
  
  handleBusinessError = (handle: (error: ErrorResult | null) => void): void => {
    this.handleBusiness = handle;
  };
  
  get = async (url: string): Promise<ApiResult> => {
    let apiResult: ApiResult;
    let response: AxiosResponse<ApiResult> | null = null;
    try {
      const instance: AxiosInstance = await this.getInstance();
      response = await instance.get<AxiosResponse<ApiResult>>(url);
      apiResult = this.handle(response);
    } catch (e) {
      apiResult = this.catchException(url, e, response);
    }
    return apiResult;
  };
  
  post = async (url: string, data: any): Promise<ApiResult> => {
    let apiResult: ApiResult;
    let response: AxiosResponse<ApiResult> | null = null;
    try {
      const instance: AxiosInstance = await this.getInstance();
      response = await instance.post<AxiosResponse<ApiResult>>(url, data);
      
      apiResult = this.handle(response);
    } catch (e) {
      apiResult = this.catchException(url, e, response);
    }
    return apiResult;
  };
  
  put = async (_url: string, _data: any): Promise<ApiResult> => {
    return {
      data: null,
      message: '',
      code: 0
    };
  };
  
  delete = async (_url: string): Promise<ApiResult> => {
    return {
      data: null,
      message: '',
      code: 0
    };
  };
  
  private catchException = (url: string, e: any, response: AxiosResponse<ApiResult> | null): ApiResult => {
    
    if (this.handleException) {
      const errorResilt: ErrorResult | null = this.transform(e, response);
      this.handleException(errorResilt);
    }
    const apiResult: ApiResult = {
      data: e,
      message: CONSTANTS.STR_EMPTY,
      code: API_STATUS_CODE.EXCEPTION
    };
    return apiResult;
  };
  
  private handle = (response: AxiosResponse<ApiResult>): ApiResult => {
    let apiResult: ApiResult;
    
    if (response.status !== HTTP_CODE.OK && this.handleException) {
      this.handleException({
        businessCode: API_STATUS_CODE.EXCEPTION,
        error: response.data,
        httpCode: response.status,
        message: response.statusText,
        __debug: response
      });
      apiResult = {
        data: response.data,
        message: response.statusText,
        code: API_STATUS_CODE.EXCEPTION
      };
    } else {
      apiResult = response.data;
      if (apiResult.code !== API_STATUS_CODE.OK && this.handleBusiness) {
        this.handleBusiness({
          businessCode: apiResult.code,
          error: apiResult.data,
          httpCode: HTTP_CODE.OK,
          message: apiResult.message,
          __debug: response
        });
      }
    }
    return apiResult;
  };
  
  private transform = (error: any | null, response: AxiosResponse<ApiResult> | null): ErrorResult | null => {
    let errorResilt: ErrorResult | null = null;
    if (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // error.response.data;
        // error.response.status;
        // error.response.headers;
        errorResilt = {
          businessCode: API_STATUS_CODE.EXCEPTION,
          error: error.response.data,
          httpCode: error.response.status,
          message: error.response.statusText,
          __debug: error
        };
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        errorResilt = {
          businessCode: API_STATUS_CODE.EXCEPTION,
          error: error.request,
          httpCode: HTTP_CODE.NOT_RECEIVED,
          message: error.message,
          __debug: error
        };
      } else {
        // Something happened in setting up the request that triggered an Error
        errorResilt = {
          businessCode: API_STATUS_CODE.EXCEPTION,
          error,
          httpCode: HTTP_CODE.NOT_RECEIVED,
          message: error.message,
          __debug: error
        };
      }
    } else if (response) {
      errorResilt = {
        businessCode: API_STATUS_CODE.EXCEPTION,
        error: response,
        httpCode: response.status,
        message: response.statusText,
        __debug: response
      };
    }
    return errorResilt;
  };
  
  private getInstance = async (): Promise<AxiosInstance> => {
    let headers: any = {};
    if (this.genHeader) {
      headers = await this.genHeader();
    }
    const config: AxiosRequestConfig = {
      headers
    };
    return axios.create(config);
  };
}
