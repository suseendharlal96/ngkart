import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormModal } from 'src/app/models/form';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor() {}

  isFormSubmitted: boolean;
  form: FormModal;
  isSignup: boolean;

  ngOnInit(): void {
    this.isSignup = false;
    this.form = {
      email: '',
      password: '',
      confirmpassword: '',
    };
  }

  changeMode(): void {
    this.isSignup = !this.isSignup;
    this.isFormSubmitted = false;
  }

  submit(authForm: NgForm): void {
    this.isFormSubmitted = true;
    if (authForm.valid) {
      console.log('valid');
    } else {
      console.log(authForm);
    }
  }
}
