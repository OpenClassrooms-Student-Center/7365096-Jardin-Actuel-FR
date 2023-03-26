import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {Post} from "../../models/post.model";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public lastPosts: Post[] = [];
  public constructor(private api: ApiService, private title: Title) {
    this.title.setTitle('Accueil - Jardin Actuel');
  }

  public ngOnInit() {
    this.api.getLastPosts().then(list => this.lastPosts = list.list);
  }
}
