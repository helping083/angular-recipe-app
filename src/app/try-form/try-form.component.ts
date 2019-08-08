import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-try-form',
  templateUrl: './try-form.component.html',
  styleUrls: ['./try-form.component.css']
})
export class TryFormComponent implements OnInit {
  @ViewChild('f', {static:false}) signUpForm: NgForm;
  defaultQuestion: string = 'pet';
  answer: string = '';
  genders = ['male', 'female'];
  user = {
    userName: '',
    email: '',
    secretQuestion: '',
    answer: ''
  };
  submitted: boolean = false;

  constructor() { }

  ngOnInit() {
  }
  
  suggestUserName():void {
    const sugestUserName = 'Oleh'
    // this.signUpForm.setValue({
    //   userData: {
    //     userName: sugestUserName,
    //     email: 'yourEmail@google.com'
    //   },
    //   secret: 'teacher',
    //   questionAnswer: 'some random comment',
    //   gender: 'male'
    // });
    this.signUpForm.form.patchValue({
      userData: {
        userName: sugestUserName,
        email: 'yourEmail@google.com'
      }
    });
  }

  onSubmit(form: NgForm): void {
    this.user.userName = this.signUpForm.value.userData.userName;
    this.user.email = this.signUpForm.value.userData.email;
    this.user.secretQuestion = this.signUpForm.value.secret;
    this.user.answer = this.signUpForm.value.questionAnswer;
    this.submitted = true;
    this.signUpForm.reset();
  }
}
