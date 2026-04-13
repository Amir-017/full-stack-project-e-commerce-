import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UserService } from '../../../services/user-service';
import { Router } from '@angular/router';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const passwordMatchValidators = ((form:AbstractControl)=>{
const password = form.get('password')?.value
const confirmedPassword = form.get('confirmedPassword')?.value
// condition
return password === confirmedPassword ? null : {notMatched : true}
})

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  constructor(private userService: UserService,private router:Router) {}
  check = false

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.pattern(emailPattern)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmedPassword: new FormControl('', Validators.required),
  },{validators: passwordMatchValidators});

  submitForm() {
    this.form.markAllAsTouched();

    if (this.form.invalid) {

      return;
    }else{
        console.log(this.form.value);
    this.userService.postUsers(this.form.value).subscribe(() => console.log('done'));
this.router.navigate(['/login'])
    }


  }
}
