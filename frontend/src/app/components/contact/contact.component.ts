import { Component } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  public contactForm: FormGroup;

  public success = false;

  public constructor(private title: Title, private router: Router) {
    this.title.setTitle('Contactez-nous - Jardin Actuel');
    this.contactForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl('', Validators.required)
    });
  }

  public send() {
    this.success = false;
    this.contactForm.markAllAsTouched();
    if(/[éàùèçÉÀÇÈûîÛÎïüÏÜâÂäÄôöÖÔêËÊëŷŸÿŶ]/.test(this.contactForm.get('name')?.value)) {
      alert('Erreur inconue !');
    } else if(this.contactForm.valid) {
      this.success = true;
    }
  }
}
