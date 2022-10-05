import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data-service';
import notify from 'devextreme/ui/notify';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formData: any = {};
  constructor(private ds: DataService, private router: Router) {}

  ngOnInit(): void {}

  submitButtonOptions = {
    text: 'Login',
    useSubmitBehavior: true,
  };

  onLogin(e: Event) {
    e.preventDefault();
    if (!this.ds.requestLogin(this.formData.email, this.formData.password)) {
      notify('Wrong username or password', 'error', 2000);
      return;
    }
    this.router.navigate(['/posts']);
  }
}