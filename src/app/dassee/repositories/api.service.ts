import { Injectable } from '@angular/core';
import {LoginSdo} from './sdo/LoginSdo';
import {ApiClientService, ApiResult} from '../../core';
import {API} from '../shared/commons';
import {BaseApi} from "../../core";

@Injectable({
  providedIn: 'root'
})
export class ApiService extends BaseApi{

  constructor(private apiclient: ApiClientService) {
    super();
  }
  
  login = async (phone: string, password: string): Promise<LoginSdo> => {
    const res: ApiResult = await this.apiclient.post(API.LOGIN(), {phone, password});
     return {
       ...this.populate(res),
       user: res.data
     };
  }
}
