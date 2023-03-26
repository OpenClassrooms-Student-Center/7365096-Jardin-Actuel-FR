import {User} from "./user.model";
import {Post} from "./post.model";

export class Comment {
  public id: number|null;
  public content: string|null;
  public author: User|null;
  public date: Date|null;
  public published: boolean|null
  public post: Post|null;

  public constructor({id = null, content = null, author = null, date = null, publihed = null, post = null} = {}) {
    this.id = id;
    this.content = content;
    this.author = author;
    this.date = date;
    this.published = publihed;
    this.post = post;
  }

}
