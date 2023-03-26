import { Component } from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Title} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {ApiService} from "../../services/api.service";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loginForm: FormGroup;
  public loginInProgress = false;
  private errorLogin = false;

  public constructor(private title: Title, private router: Router, private api: ApiService) {
    this.title.setTitle('Se connecter - Jardin Actuel');
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email, () => this.checkCredentials()]),
      password: new FormControl('', [Validators.required, () => this.checkCredentials()]),
    });
  }

  public checkCredentials():  ValidationErrors| null {
    return this.errorLogin ? { invalid: true } : null;
  }

  public login() {
    this.errorLogin = false;
    this.loginInProgress = true;
    this.loginForm.get('email')?.updateValueAndValidity();
    this.loginForm.get('password')?.updateValueAndValidity();
    this.loginForm.markAllAsTouched();

    if(this.loginForm.valid) {
      this.api.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value).then(result => {
        this.loginInProgress = false;
        if(!result) {
          this.errorLogin = true;
          this.loginForm.get('email')?.updateValueAndValidity();
          this.loginForm.get('password')?.updateValueAndValidity();
        } else {
          this.router.navigate(['/']).then(() => {
            window.location.reload();
          });

        }
      });
    }
  }

}
