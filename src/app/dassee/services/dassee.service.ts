import {Injectable} from '@angular/core';
import {StoreService} from '../repositories/store.service';
import {ApiService} from '../repositories/api.service';
import {User} from '../shared/models';

@Injectable({
  providedIn: 'root'
})
export class DasseeService {
  
  constructor(private store: StoreService, private api: ApiService) {
  }
  
  getDydProperties = (): any => {
    return null;
  };
  
  isLogged = async (): Promise<User | null> => {
    const user: User | null = await this.store.getUser();
    return user;
  };
  
  login = async (phone: string, password: string) : Promise<LoginDto> => {
    const sdo: LoginSdo = await this.api.login(phone, password);
    
  }
}
