import {Post} from "./post.model";

export class ListPosts {
  public total: number|null;
  public list: Post[];

  public constructor({total = null, list = []} = {}) {
    this.total = total;
    this.list = list;
  }
}
