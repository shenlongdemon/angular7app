import {Injectable} from '@angular/core';
import {User} from '../shared/models';
import {CONSTANTS, STORAGE_KEYS} from '../shared/commons';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  
  constructor() {
  }
  
  getUser = async (): Promise<User | null> => {
    const user: User | null = await this.getObject<User>(STORAGE_KEYS.USER);
    return user;
  };
  
  saveUser = async (user: User): Promise<void> => {
    await this.saveItem(STORAGE_KEYS.USER, user);
  };
  
  
  private getItem = async (key: string, defaultValue: string): Promise<string> => {
    let value = '';
    try {
      value = await localStorage.getItem(key) || defaultValue;
    }
    catch (e) {
      value = defaultValue;
    }
    return value;
  };
  
  private saveItem = async <T>(key: string, data: T): Promise<void> => {
    const json: string = JSON.stringify(data);
    localStorage.setItem(key, json);
  };
  
  private async getObject<T>(key: string): Promise<T | null> {
    try {
      const json: string = await this.getItem(key, CONSTANTS.STR_EMPTY);
      if (json !== CONSTANTS.STR_EMPTY) {
        const t: T = JSON.parse(json);
        return t;
      }
    }
    catch (e) {
      return null;
    }
    return null;
  }
  
}
