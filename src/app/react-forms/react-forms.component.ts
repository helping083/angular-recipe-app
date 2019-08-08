import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-react-forms',
  templateUrl: './react-forms.component.html',
  styleUrls: ['./react-forms.component.css']
})
export class ReactFormsComponent implements OnInit {
  genders = ['male', 'female'];
  signUpForm: FormGroup;
  forbiddenUserNames = ['chris', 'anna'];

  constructor() { }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl("Oleh", [Validators.required, this.forbbidenNames.bind(this)]),
        'email': new FormControl("your-email@google.com", [Validators.required, Validators.email], this.forbbidenEmails)
      }),
      'gender': new FormControl(this.genders[0], Validators.required),
      'hobbies': new FormArray([])
    });
    this.signUpForm.valueChanges.subscribe((item)=>{
      console.log(item);
    });
  }

  get controls() {
    return (this.signUpForm.get('hobbies') as FormArray).controls;
  }

  onAddHobby(): void {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signUpForm.get('hobbies')).push(control);
  }
 
  onSubmit(): void {
    console.log(this.signUpForm);
  }

  forbbidenNames(c: FormControl): { [s:string]: boolean } {
    if(this.forbiddenUserNames.indexOf(c.value)!==-1) {
      return {'nameIsForbidden': true}
    }
    return null;
  }


  forbbidenEmails(c: FormControl): Promise<any>|Observable<any> {
    const prom = new Promise<any>((res,rej)=>{
      setTimeout(()=>{
        if(c.value=='test@test.com') {
          res({'emailIsForbidden': true});
        } else  {
          res(null);
        }
      },2500);
    });
    return prom;
  }

}
