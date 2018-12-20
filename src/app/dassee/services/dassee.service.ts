import {Injectable} from '@angular/core';
import {StoreService, ApiService} from '../repositories';
import {User} from '../shared/models';
import {LoginDto} from "./dto";
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
}
