import {BaseDto} from "../../../core/apiclient";
import {MaterialProcess} from "../../shared/models";

export interface GetMaterialProcessDto extends BaseDto{
  materialProcess: MaterialProcess | null;
}