import {IObject} from './IObject';

export interface User extends IObject{
  address: string;
  country: string;
  firstName: string;
  imageUrl: string;
  lastName: string;
  password: string;
  phone: string;
  state: string;
  zipCode: string;
}
