import {IObject} from "./IObject";

enum DynPropertyType {
  GROUP = 'GROUP',
  TEXT = 'TEXT',
  CHECKBOX = 'CHECKBOX',
  RADIO = 'RADIO',
  IMAGE = 'IMAGE',
  FILE = 'FILE',
  COMBOBOX = 'COMBOBOX'
}

interface DynProperty extends IObject {
  type: DynPropertyType;
  title: string;
  value: string,
  items: string;
}

export {DynProperty, DynPropertyType};