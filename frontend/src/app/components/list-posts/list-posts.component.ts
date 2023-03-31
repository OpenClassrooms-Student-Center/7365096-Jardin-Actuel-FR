import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {Post} from "../../models/post.model";
import {FormControl, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.scss']
})
export class ListPostsComponent implements OnInit, OnChanges, OnDestroy {

  @Input() public page: number = 1;
  @Input() public authorId: number = -1;
  @Input() public categoryId: number = -1;
  @Input() public title: string = 'Nos publications';

  public showFilter: boolean = false;

  private search: string = '';

  public posts: Post[] | null = [];
  public total: number | null = 0;
  public totalPages: number = 0;

  public searchForm: FormGroup;
  private subscribe: Subscription|undefined;

  public constructor(private api: ApiService) {
    this.searchForm = new FormGroup({
      search: new FormControl(''),
      start: new FormControl(''),
      end: new FormControl('')
    });


    this.subscribe = this.searchForm?.valueChanges.subscribe(search => {
      this.search = search.search;
      this.updatePosts();
    });
  }

  public ngOnDestroy() {
    if(this.subscribe) {
      this.subscribe.unsubscribe();
    }
  }

  public ngOnInit() {
    this.updatePosts();
  }

  public ngOnChanges(changes: SimpleChanges) {
    this.updatePosts();
  }

  private updatePosts() {
    this.api.getPosts(this.page, this.categoryId, this.authorId, this.search, this.searchForm.get('start')?.value, this.searchForm.get('end')?.value).then(list => {
      ({
        total: this.total,
        list: this.posts
      } = list);
      this.totalPages = Math.ceil((this.total ?? 0) / 9);
    })
  }

  public changePage(page: number) {
    this.page = page;
    this.updatePosts();
  }

  public removeHTML(str: string): string {
    return str.replace(/<[^>]*>/g, '');
  }

  public toggleFilter(): void {
    this.showFilter = !this.showFilter;
  }

}
