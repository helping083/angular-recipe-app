import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthServiceService, AuthResponseData, LogInResponseData } from '../auth-service.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-auth-component',
  templateUrl: './auth-component.component.html',
  styleUrls: ['./auth-component.component.css']
})
export class AuthComponentComponent implements OnInit {
  iSFocused: boolean = false;
  isLoggin: boolean = false;
  error: string|null = null;
  private isLoading: boolean = false;

  constructor(private authService: AuthServiceService, private router:Router) { }

  ngOnInit() {

  }

  onFocus(): void {
    this.iSFocused = true
  }

  onSwitchLogginMode(): void {
    this.isLoggin = !this.isLoggin;
  }

  onSubmit(f: NgForm): void {
    if (!f.valid) {
      return;
    }

    let email = f.value.email;
    let password = f.value.password;
    let authObservable: Observable<AuthResponseData|LogInResponseData>;
    this.isLoaded = true;

    if (this.isLoggin) {
      authObservable = this.authService.login(email,password);
    } else {
      authObservable = this.authService.signUp(email, password);
    }

    authObservable.subscribe((resData)=>{
      console.log('resData', resData);
      this.isLoaded = false;
      this.router.navigate(['/recipes']);
    }, errorRes => {
      this.error = errorRes;
      this.isLoaded = false;
      console.log('error in resData', errorRes, email, password);
    });
    f.reset();
  }

  private setFormValue(email: string, password:string, form:NgForm):void {
    
  }

  set isLoaded (val: boolean) {
    this.isLoading = val;
  }

  get isLoadingMode () {
    return this.isLoading;
  }

 
}
