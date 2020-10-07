import { Component, OnInit } from '@angular/core';
import { FormModal } from 'src/app/models/form';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor() {}
  form: FormModal;
  ngOnInit(): void {
    this.form = {
      email: '',
      password: '',
    };
  }
  submit(e: Event): void {
    e.preventDefault();
    console.log(this.form);
  }
}
