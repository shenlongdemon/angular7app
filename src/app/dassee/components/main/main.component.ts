import { Component, OnInit } from '@angular/core';
import {DasseeService} from '../../services/dassee.service';
import {DynProperty, DynPropertyType, ProcessStep} from "../../shared/models";
import {CONSTANTS} from "../../../core/commons/Constants";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  groups: ProcessStep[] = [];
  currentTypeIsMoving: string = '';
  constructor(private dasseeService: DasseeService) {
  }

  ngOnInit = async (): Promise<void> => {
  
  }
  
  allowDrop(ev){
    ev.preventDefault();
  }
  
  onDropIntoMain(ev){
    console.log(ev);
    
    if (this.currentTypeIsMoving === DynPropertyType.GROUP) {
      const group: ProcessStep = {
        id: '',
        name: 'New process',
        index: this.groups.length,
        dynProperties: [],
        posistion: {
          top: ev.offsetY,
          left: ev.offsetX
        }
      };
      
      this.groups.push(group);
    }
    
    this.currentTypeIsMoving = CONSTANTS.STR_EMPTY;
  }
  
  moveItem(ev, type: DynPropertyType){
    console.log(ev);
    this.currentTypeIsMoving = type;
  }

}
