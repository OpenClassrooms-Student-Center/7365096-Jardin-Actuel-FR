import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {first, Subscription} from "rxjs";
import {ApiService} from "../../services/api.service";
import {Category} from "../../models/category.model";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {

  public category: Category;

  private subscription: Subscription|undefined;

  public constructor(private route: ActivatedRoute, private router: Router, private api: ApiService,
                     private title: Title) {
    this.category = new Category();
  }

  public ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.category = new Category();
      this.api.getCategory(params['id']).then(c => {
        this.category = c;
        this.title.setTitle((this.category.name ?? 'Nos publications') + ' - Jardin Actuel');
      }, error => {
        this.router.navigate(['/']);
      });
    });
  }

  public ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
