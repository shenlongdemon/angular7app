import {BaseDto} from './BaseDto';
import {User} from '../../shared/models';
export interface LoginDto extends BaseDto{
  user: User | null;
}
