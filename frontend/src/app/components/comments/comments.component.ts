import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {Router} from "@angular/router";
import {Comment} from "../../models/comment.model";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  public comments: Comment[] = [];

  constructor(private api: ApiService, private router: Router) {
  }

  ngOnInit() {
    if(!JSON.parse(localStorage.getItem('user') ?? '{"admin": false}').admin) {
      this.router.navigate(['/']);
    }

    this.getComments();
  }

  publishComment(comment: Comment): void {
    this.api.publishComment(comment.id ?? 0).then(_ => {
      this.getComments();
    });
  }

  deleteComment(comment: Comment): void {
    this.api.deleteComment(comment.id ?? 0).then(_ => {
      this.getComments();
    });
  }

  getComments(): void {
    this.api.getCommentsToPublish().then(comments => {
      this.comments = comments;
    }, error => {
      this.router.navigate(['/']);
    });
  }

}
