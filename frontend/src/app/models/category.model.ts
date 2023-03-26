export class Category {
  public id: number|null;
  public name: string|null;

  public constructor({id = null, name = null} = {}) {
    this.id = id;
    this.name = name;
  }
}
