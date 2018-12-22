import {IObject} from "./IObject";
import {ProcessStep} from "./ProcessStep";

export interface MaterialProcess extends IObject{
  ownerId: string;
  processSteps: ProcessStep[];
}