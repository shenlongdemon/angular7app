import {DynProperty} from "./DynProperty";
import {IObject} from "./IObject";

export interface ProcessStep extends IObject {
  name: string;
  index: number;
  dynProperties: DynProperty[];
  posistion: {
    top: number;
    left: number;
  }
}
