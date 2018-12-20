import { Component, OnInit } from '@angular/core';
import {DasseeService} from '../../services/dassee.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private dasseeService: DasseeService) {
  }

  ngOnInit = async (): Promise<void> => {
  }

}
