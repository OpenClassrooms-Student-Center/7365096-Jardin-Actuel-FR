import {Component, OnInit, Renderer2} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {Category} from "../../models/category.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  public categories: Category[] = [];
  public darkmode: boolean = false;
  public admin = false;
  public menuShowed = false;

  public constructor(public api: ApiService, private renderer: Renderer2) {
  }

  ngOnInit() {
    this.api.getCategories().then(categories => this.categories = categories);
    this.admin = JSON.parse(localStorage.getItem('user') ?? '{"admin": false}').admin;
  }

  changerDarkmode(): void {
    if(this.darkmode) {
      this.darkmode = false;
      this.renderer.removeClass(document.body, 'darkmode');
    } else {
      this.darkmode = true;
      this.renderer.addClass(document.body, 'darkmode');
    }
  }

  logout(): void {
    this.api.logout();
  }

  showMenu(): void {
    this.menuShowed = true;
  }

  hideMenu(): void {
    this.menuShowed = false;
  }
}
