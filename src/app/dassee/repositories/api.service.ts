import { Injectable } from '@angular/core';
import {LoginSdo} from './sdo/LoginSdo';
import {ApiClientService, ApiResult} from '../../core';
import {API} from '../shared/commons';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private apiclient: ApiClientService) { }
  
  login = async (phone: string, password: string): Promise<LoginSdo> => {
    const res: ApiResult = await this.apiclient.post(API.LOGIN_USER(), {phone, password});
    
    
  }
}
