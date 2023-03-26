import {User} from "./user.model";
import {Category} from "./category.model";
import {Comment} from "./comment.model";

export class Post {
  public id: number|null;
  public title: string|null;

  public date: Date|null;

  public content: string|null;

  public author: User|null;

  public category: Category|null;

  public picture: string|null;

  public comments: Comment[] = [];

  public constructor({id = null, title = null, date = null, content = null, author = null, category = null, picture = null, comments = []} = {}) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.date = date;
    this.author = author;
    this.category = category;
    this.picture = picture;
    this.comments = comments;
  }
}
