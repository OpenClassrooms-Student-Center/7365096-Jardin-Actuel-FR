import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {Post} from "../../models/post.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit{

  public post: Post;
  private subscription: Subscription|undefined;

  public commentForm: FormGroup;
  public commentInProgress = false;
  public name = '';
  public admin = false;

  public constructor(public api: ApiService, private title: Title, private route: ActivatedRoute, private router: Router) {
    this.post = new Post();
    this.commentForm = new FormGroup({
      content: new FormControl('', Validators.required)
    });
  }

  public ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.api.getPost(params['id']).then(post => {
        this.post = post;
        this.title.setTitle(post.title + ' - Jardin Actuel');
      }, error => this.router.navigate(['/']));
    });
    const user = JSON.parse(localStorage.getItem('user') ?? '{"name": "", "admin": false}');
    this.name = user.name;
    this.admin = user.admin;

  }

  public postComment(): void {
    this.commentInProgress = true;
    this.commentForm.markAllAsTouched();
    if(this.commentForm.valid) {
      this.api.comment(this.post.id ?? 0, this.commentForm.get('content')?.value).then(result => {
        this.api.getPost(this.post.id ?? 0).then(post => {
          this.commentInProgress = false;
          this.commentForm.get('content')?.setValue('');
          this.post = post;
        });
      });
    }
  }

  public encodeURI(titre: string) {
    return encodeURI(titre);
  }

  public deletePost(): void {
    this.api.deletePost(this.post.id ?? 0).then(_ => {
      this.router.navigate(['/posts']);
    });
  }
}
