import {BaseSdo} from "./BaseSdo";
import {BaseDto} from "./BaseDto";

export class BaseService {
  constructor() {
  }
  
  protected populate = (sdo: BaseSdo): BaseDto => {
    const dto: BaseDto = {
      success: sdo.success,
      message: sdo.message
    };
    return dto;
  };
}