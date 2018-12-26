import {Component, OnInit} from '@angular/core';
import {DasseeService} from '../../services/dassee.service';
import {DynProperty, DynPropertyType, ProcessStep} from "../../shared/models";
import {CONSTANTS} from "../../../core/commons/Constants";
import {GetMaterialProcessDto, SaveMaterialProcessDto} from "../../services/dto";
import { Router} from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  isLoading: boolean = false;
  isProcess: boolean = false;
  groups: ProcessStep[] = [];
  currentGroup: ProcessStep | null = null;
  currentTypeIsMoving: string = '';
  currentGroup: ProcessStep | null = null;
  currentProperty: DynProperty | null = null;
  item: string | null | undefined = CONSTANTS.STR_EMPTY;
  constructor(private dasseeService: DasseeService, private router: Router) {
  }
  
  ngOnInit () {
    this.loadData();
  }
  
  loadData = async () : Promise<void> => {
    this.isLoading = true;
    
    const dto: GetMaterialProcessDto = await this.dasseeService.getMaterialProcesses();
    this.isLoading = false;
  
    if (dto.success) {
      if (dto.materialProcess) {
        this.groups = dto.materialProcess.processSteps;
      }
    }
  };
  
  save = async () : Promise<void> => {
    if (this.isProcess) {
      return;
    }
    this.isProcess = true;
    const dto : SaveMaterialProcessDto = await this.dasseeService.saveMaterialProcesses(this.groups);
    this.isProcess = false;
    if (dto.success) {
      // reload page
      alert('Update success');
    }
    else {
      alert(dto.message);
    }
  }
  
  calcPoint = (index: number): any => {
    const W: number = 130;
    const H: number = 30 / 2;
    let p: { x1: number, y1: number, x2: number, y2: number } = {
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0
    };
    
    if (index === this.groups.length - 1) {
      
      const g: ProcessStep = this.groups[(index === 0 ? 1 : index) - 1];
      p = {
        x1: g.position.left,
        y1: g.position.top,
        x2: g.position.left,
        y2: g.position.top
      };
    }
    else {
      const g1 = this.groups[index].position;
      const g2 = this.groups[index + 1].position;
      p = {
        x1: g1.left + W,
        y1: g1.top + H,
        x2: g2.left,
        y2: g2.top + H
      };
      if (g1.left < g2.left) {
        if (g1.left + W > g2.left) {
          p = {
            x1: g1.left + W,
            y1: g1.top + H,
            x2: g2.left + W,
            y2: g2.top + H
          };
        }
      }
      else {
        p = {
          x1: g1.left + W,
          y1: g1.top + H,
          x2: g2.left + W,
          y2: g2.top + H
        };
        if (g2.left + W < g1.left) {
          p = {
            x1: g1.left,
            y1: g1.top + H,
            x2: g2.left + W,
            y2: g2.top + H
          };
        }
        else if (g2.left + W > g1.left) {
          p = {
            x1 : g1.left,
            y1 : g1.top + H,
            x2 : g2.left + W,
            y2 : g2.top + H
          };
        }
      }
      
    }
    return p;
  };
  
  calcFrom = (group: ProcessStep): any => {
    return {
      left: group.position.left + 130,
      top: group.position.top + 15,
    };
  }
  calcTo = (group: ProcessStep): any => {
    return {
      left: group.position.left,
      top: group.position.top + 15,
    };
  }
  
  
  allowDrop(ev) {
    ev.preventDefault();
  }
  
  onDropfieldIntoGroup(ev, group: ProcessStep) {
    if (this.currentTypeIsMoving === DynPropertyType.TEXT
      || this.currentTypeIsMoving === DynPropertyType.CHECKBOX
      || this.currentTypeIsMoving === DynPropertyType.RADIO
      || this.currentTypeIsMoving === DynPropertyType.COMBOBOX
      || this.currentTypeIsMoving === DynPropertyType.FILE
      || this.currentTypeIsMoving === DynPropertyType.IMAGE
    ) {
      const property: DynProperty = {
        type: this.currentTypeIsMoving as DynPropertyType,
        id: '',
        title: this.currentTypeIsMoving,
        value: '',
        items: ''
      };
      group.dynProperties.push(property);
    }
  }
  
  onDropIntoMain(ev) {
    console.log(ev);
    
    if (this.currentTypeIsMoving === DynPropertyType.GROUP) {
      const group: ProcessStep = {
        id: '',
        name: 'New process',
        index: this.groups.length,
        dynProperties: [],
        position: {
          top: ev.offsetY,
          left: ev.offsetX
        },
        isOpen: true
      };
      
      this.groups.push(group);
    }
    else if (this.currentTypeIsMoving === 'GROUP_MOVING' && this.currentGroup) {
      this.currentGroup.position = {
        top: ev.offsetY,
        left: ev.offsetX
      };
    }
    
    this.currentTypeIsMoving = CONSTANTS.STR_EMPTY;
  }
  getIconName = (type: DynPropertyType) : string => {
    let iconName: string = CONSTANTS.STR_EMPTY;
    if (type === DynPropertyType.TEXT) {
      iconName = 'format_color_text';
    }
    else if (type === DynPropertyType.CHECKBOX) {
      iconName = 'check';
    }
    else if (type === DynPropertyType.COMBOBOX) {
      iconName = 'list';
    }
    else if (type === DynPropertyType.RADIO) {
      iconName = 'radio_button_checked';
    }
    else if (type === DynPropertyType.IMAGE) {
      iconName = 'insert_photo';
    }
    else if (type === DynPropertyType.FILE) {
      iconName = 'attach_file';
    }
    return iconName;
  }
  moveItem(ev, type: DynPropertyType) {
    console.log(ev);
    this.currentTypeIsMoving = type;
  }
  
  moveGroup(ev, group: ProcessStep) {
    console.log(ev);
    this.currentTypeIsMoving = "GROUP_MOVING";
    this.currentGroup = group;
  }
  
  isCurrentPropertyHasItems = (): boolean => {
    return ( this.currentProperty
      && (
        this.currentProperty.type === DynPropertyType.COMBOBOX
        || this.currentProperty.type === DynPropertyType.RADIO
        || this.currentProperty.type === DynPropertyType.CHECKBOX
      )
    )
  }
  
  getItemsOfCurrentProperty = () : string[] => {
    let items : string[] = [];
    if (this.currentProperty) {
      items = this.currentProperty.items.split(',').filter((s: string): boolean => {return s.trim() !== CONSTANTS.STR_EMPTY});
    }
    return items;
  }
  
  addItemIntoCurrentProperty = (): void => {
    if (this.currentProperty && this.item && this.item.trim() !== CONSTANTS.STR_EMPTY) {
      const items: string[] = this.getItemsOfCurrentProperty();
      items.push(this.item.trim());
      this.currentProperty.items = items.join(',');
      this.item = CONSTANTS.STR_EMPTY;
    }
  };
  
  loadGroup = (group: ProcessStep) : void => {
    this.currentGroup = group;
    this.currentProperty = null;
  
  };
  
  loadField = (field: DynProperty): void => {
    this.currentProperty = field;
    this.currentGroup = null;
  };
}
