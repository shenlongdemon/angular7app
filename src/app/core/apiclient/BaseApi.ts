import {ApiResult} from "./ApiResult";
import {BaseSdo} from "./BaseSdo";
import {API_STATUS_CODE} from "../commons/Constants";

export class BaseApi {
  constructor() {
  }
  
  protected populate = (apiResult: ApiResult): BaseSdo => {
    const baseSdo: BaseSdo = {
      success: apiResult.code === API_STATUS_CODE.OK,
      message: apiResult.message,
      __debug: apiResult
    };
    
    return baseSdo;
  };
}