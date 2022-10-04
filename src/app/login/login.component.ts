import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formData: any = {};
  constructor() {}

  ngOnInit(): void {}

  submitButtonOptions = {
    text: 'Login',
    useSubmitBehavior: true,
  };

  onLogin(e: Event) {
    e.preventDefault();
    console.log(this.formData);
  }
}
