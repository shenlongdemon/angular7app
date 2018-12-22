import {Component, OnInit} from '@angular/core';
import {DasseeService} from '../../services/dassee.service';
import {LoginDto} from "../../services/dto";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  phone: string = '+84567890';
  password: string = '123';
  isProcess: boolean = false;
  private returnUrl: string = '';
  
  constructor(private dasseeService: DasseeService,
              private router: Router,
              private route: ActivatedRoute) {
  }
  
  ngOnInit() {
    this.route.queryParams
    .subscribe(params => this.returnUrl = params['return'] || '');
  }
  
  onLoginClick = async (): Promise<void> => {
    if (this.isProcess) {
      return;
    }
    this.isProcess = true;
    const dto: LoginDto = await this.dasseeService.login(this.phone, this.password);
    this.isProcess = false;
    if (dto.success && dto.user) {
      this.router.navigateByUrl(this.returnUrl);
    }
  }
  
}
