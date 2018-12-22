import {Injectable} from '@angular/core';
import {StoreService, ApiService, SaveMaterialProcessSdo, GetMaterialProcessSdo} from '../repositories';
import {MaterialProcess, ProcessStep, User} from '../shared/models';
import {GetMaterialProcessDto, LoginDto, SaveMaterialProcessDto} from "./dto";
import {LoginSdo} from "../repositories/sdo";
import {BaseService} from "../../core/apiclient";

@Injectable({
  providedIn: 'root'
})
export class DasseeService extends BaseService {
  
  constructor(private store: StoreService, private api: ApiService) {
    super();
  }
  
  getDydProperties = (): any => {
    return null;
  };
  
  isLogged = async (): Promise<User | null> => {
    const user: User | null = await this.store.getUser();
    return user;
  };
  
  login = async (phone: string, password: string): Promise<LoginDto> => {
    const sdo: LoginSdo = await this.api.login(phone, password);
    let user: User | null = null;
    if (sdo.success && sdo.user) {
      user = sdo.user;
      this.store.saveUser(user);
    }
    return {
      ...this.populate(sdo),
      user
    };
  }
  
  saveMaterialProcesses = async (processSteps: ProcessStep[]) : Promise<SaveMaterialProcessDto> => {
    const user: User | null = await this.store.getUser();
    const ownerId: string = user!.id;
    const sdo: SaveMaterialProcessSdo = await this.api.saveMaterialProcesses(ownerId, processSteps);
    return {
      ...this.populate(sdo)
    };
  }
  
  
  getMaterialProcesses = async (): Promise<GetMaterialProcessDto> => {
    const user: User | null = await this.store.getUser();
    const ownerId: string = user!.id;
    const sdo: GetMaterialProcessSdo = await this.api.getMaterialProcesses(ownerId);
    let materialProcess: MaterialProcess | null = null;
    if (sdo.success && sdo.materialProcess) {
      materialProcess = sdo.materialProcess;
    }
    return {
      ...this.populate(sdo),
      materialProcess
    };
  }
}
