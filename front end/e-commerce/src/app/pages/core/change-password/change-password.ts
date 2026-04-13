import { ChangeDetectionStrategy, Component, signal, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule],
  templateUrl: './change-password.html',
  styleUrl: './change-password.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePassword {
  handleError = ''
  readonly submitted = signal(false);
  constructor(private userService:UserService,private router:Router,private  cdr:ChangeDetectorRef){}
  readonly form = new FormGroup({
    currentPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  submit(): void {


    const token = localStorage.getItem('accessToken')
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

this.userService.changePassword(token!,this.form.value).subscribe({
  next:(response)=>{
    console.log(response);
    this.router.navigate(['/'])

  },
  error:(err)=>{
   this.handleError = err.error
   console.log(this.handleError);
this.cdr.detectChanges()
  }
})

  }
}
