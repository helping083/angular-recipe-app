import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';

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

  constructor(private authService: AuthServiceService) { }

  ngOnInit() {

  }

  onFocus(): void {
    this.iSFocused = true
    console.log('hello', this.iSFocused);
  }

  onSwitchLogginMode(): void {
    this.isLoggin = !this.isLoggin;
  }

  onSubmit(f: NgForm): void {
    if (!f.valid) {
      return;
    }

    this.isLoaded = true;

    if (this.isLoggin) {
      
    } else {
      let email = f.value.email;
      let password = f.value.password;
      this.authService.signUp(email, password).subscribe((authCredentials) => {
        this.isLoaded = false
        console.log('authCredentials', authCredentials);
      }, error => {
        this.error = 'an error ocured';
        this.isLoaded = false;
        console.log(error)
      });
    }
    f.reset();
  }

  set isLoaded (val: boolean) {
    this.isLoading = val;
  }

  get isLoadingMode () {
    return this.isLoading;
  }

}
