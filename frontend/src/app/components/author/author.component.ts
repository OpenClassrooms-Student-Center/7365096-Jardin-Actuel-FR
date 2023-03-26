import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../services/api.service";
import {Subscription} from "rxjs";
import {User} from "../../models/user.model";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit, OnDestroy{

  public user: User;

  private subscription: Subscription|undefined;

  public constructor(private route: ActivatedRoute, private router: Router, private api: ApiService,
                     private title: Title) {
    this.user = new User();
  }

  public ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.user = new User();
      this.api.getUser(params['id']).then(u => {
        this.user = u;
        this.title.setTitle((this.user.name ? ('Articles de ' + this.user.name) : 'Nos publications') + ' - Jardin Actuel');
      }, error => {
        this.router.navigate(['/']);
      });
    });
  }

  public ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
