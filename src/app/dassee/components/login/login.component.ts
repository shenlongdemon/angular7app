import { Component, OnInit } from '@angular/core';
import {DasseeService} from '../../services/dassee.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  phone: string = '+84567890';
  password: string = '123';
  constructor(private dasseeService: DasseeService) { }

  ngOnInit() {
  }
  
  onLoginClick = async () : Promise<void> => {
    const dto: LoginDto = await this.dasseeService.login(this.phone, this.password);
  }

}
