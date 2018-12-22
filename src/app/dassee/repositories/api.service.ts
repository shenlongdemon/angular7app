import { Injectable } from '@angular/core';
import {ApiClientService, ApiResult, BaseApi} from '../../core';
import {API} from '../shared/commons';
import {ProcessStep} from "../shared/models";
import {LoginSdo, GetMaterialProcessSdo, SaveMaterialProcessSdo} from "./sdo";

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
  
  saveMaterialProcesses = async (ownerId: string, processSteps: ProcessStep[]): Promise<SaveMaterialProcessSdo> => {
    const req : any = {
      ownerId,
      processSteps
    };
    const res: ApiResult = await this.apiclient.post(API.SAVE_MATERIAL_PROCESSES(), req);
    return {
      ...this.populate(res)
    };
    
  }
  
  getMaterialProcesses = async (ownerId: string): Promise<GetMaterialProcessSdo> =>{
    const res: ApiResult = await this.apiclient.get(API.GET_MATERIAL_PROCESSES_BY_OWNER_ID(ownerId));
    return {
      ...this.populate(res),
      materialProcess: res.data
    };
  }
}
