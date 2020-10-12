import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { FormModal } from 'src/app/models/form.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  authSubscription: Subscription;
  loading: boolean;
  passNotMatch: boolean = true;
  constructor(private router: Router, private authService: AuthService) {}

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
      this.loading = true;
      let url = 'signin';
      if (this.isSignup) {
        url = 'signup';
        this.passNotMatch =
          authForm.value.password === authForm.value.confirmpassword;
        if (!this.passNotMatch) {
          return;
        }
      }
      this.authSubscription = this.authService
        .authenticate(this.form, url)
        .subscribe(
          (res) => {
            this.loading = false;
            this.authService.setAuthData(res);
            this.router.navigate(['/']);
          },
          (error) => {
            this.loading = false;
          }
        );
    } else {
    }
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
