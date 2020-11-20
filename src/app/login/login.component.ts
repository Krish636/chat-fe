import { UserService } from './../service/user.service';
/* import { UserService } from './../../services/user.service';
import { User } from '../../shared/models'; */
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormGroup,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  signupForm: FormGroup;
  success: boolean = false;
  error: boolean = false;
  constructor(private userService: UserService, private router: Router) {
    this.signupForm = this.createSignUpFormGroup();
  }

  ngOnInit(): void {}
  matcher = new MyErrorStateMatcher();
  createSignUpFormGroup() {
    return new FormGroup({
      nameFormControl: new FormControl('', [Validators.required]),
      passwordFormControl: new FormControl('', [Validators.required]),
    });
  }

  login() {
    this.success = false;
    this.error = false;
    console.log(this.signupForm);
    if (this.signupForm.valid) {
      let user = {
        userName: this.signupForm.value.nameFormControl,
        password: this.signupForm.value.passwordFormControl,
      };
      this.userService.login(user).subscribe((result: any) => {
        if (result.body === 200) {
          sessionStorage.setItem('name', this.signupForm.value.nameFormControl);
          sessionStorage.setItem(
            'authorization',
            result.headers.get('Authorization')
          );
          this.router.navigate(['/chat']);
        } else {
          this.error = true;
        }
      });
    } else {
      alert('there are some errors in the form');
    }
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
