import {BaseDto} from '../../../core';
import {User} from '../../shared/models';
export interface LoginDto extends BaseDto{
  user: User | null;
}
