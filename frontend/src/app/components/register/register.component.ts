import { Component } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Title} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public registerForm: FormGroup;
  private errorRegister = false;
  public registerInProgress = false;

  public constructor(private title: Title, private router: Router, private api: ApiService) {
    this.title.setTitle('S\'inscrire - Jardin Actuel');
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email, () => this.checkEmail()]),
      emailConfirm: new FormControl('', [Validators.required, Validators.email, this.checkPasswords]),
      password: new FormControl('', Validators.required),
    });
  }

  public checkPasswords(group: AbstractControl):  ValidationErrors| null {
    let email = group.parent?.get('email')?.value;
    let confirmEmail = group.parent?.get('emailConfirm')?.value
    return email === confirmEmail ? null : { notSame: true }
  }

  public checkEmail(): ValidationErrors|null {
    return this.errorRegister ? {alreadyUsed: true} : null;
  }

  public register() {
    this.errorRegister = false;
    this.registerInProgress = true;
    this.registerForm.markAllAsTouched();
    if(this.registerForm.valid) {
      this.api.register(this.registerForm.get('name')?.value, this.registerForm.get('email')?.value, this.registerForm.get('password')?.value).then(result => {
        this.registerInProgress = false;
        if(result) {
          this.errorRegister = false;
          this.api.login(this.registerForm.get('email')?.value, this.registerForm.get('password')?.value).then(result => {
            this.router.navigate(['/']);
          });
        } else {
          this.errorRegister = true;
          this.registerForm.get('email')?.updateValueAndValidity();
        }
      });
    }
  }

}
