import {Component, OnInit} from '@angular/core';
import {Category} from "../../models/category.model";
import {ApiService} from "../../services/api.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  public categories: Category[] = [];

  public postForm: FormGroup;
  public loading = false;
  public imagePreview = '';

  constructor(private api: ApiService, private router: Router, private title: Title) {
    this.title.setTitle('Créer un post - Jardin actuel');
    this.postForm = new FormGroup({
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      picture: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    if (!JSON.parse(localStorage.getItem('user') ?? '{"admin": false}').admin) {
      this.router.navigate(['/']);
    }
    this.api.getCategories().then(categories => {
      this.categories = categories;
    });
  }


  onFileChange(event: any) {
    const reader = new FileReader();

    if (event.target?.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imagePreview = reader.result as string;
        this.postForm.get('picture')?.patchValue(reader.result);

      };

    }
  }

  public sendPost(): void {
    this.postForm.markAllAsTouched();
    if (this.postForm.valid) {
      this.loading = true;
      this.api.sendPost(this.postForm.value).then(response => {
        this.loading = false;
        if (response) {
          this.router.navigate(['/posts', response.id]);
        }
      });

    }
  }


}
