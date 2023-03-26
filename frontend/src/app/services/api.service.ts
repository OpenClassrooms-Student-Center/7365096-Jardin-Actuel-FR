import { Injectable } from '@angular/core';
import {ListPosts} from "../models/list-posts.model";
import {Category} from "../models/category.model";
import {User} from "../models/user.model";
import {Post} from "../models/post.model";
import {Comment} from "../models/comment.model";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public API_URL = 'http://localhost:8081/';

  constructor(private router: Router) { }

  public getPosts(page: number = 1, categoryId: number = -1, authorId: number = -1, search: string = ''): Promise<ListPosts> {
    const url = new URL(this.API_URL + 'posts');
    url.searchParams.append('page', page.toString());
    url.searchParams.append('limit', '9');

    if(categoryId !== -1) {
      url.searchParams.append('category', categoryId.toString());
    }
    if(authorId !== -1) {
      url.searchParams.append('author', authorId.toString());
    }

    if(search !== '') {
      url.searchParams.append('search', search);
    }

    return fetch(url.toString()).then(response => response.json()) as Promise<ListPosts>;
  }

  public getLastPosts(number: number = 3): Promise<ListPosts> {
    const url = new URL(this.API_URL + 'posts');
    url.searchParams.append('sort-column', 'date');
    url.searchParams.append('sort-direction', 'DESC');
    url.searchParams.append('limit', number.toString());

    return fetch(url.toString()).then(response => response.json()) as Promise<ListPosts>;
  }

  public getCategories(): Promise<Category[]> {
    return fetch(this.API_URL + 'categories').then(response => response.json()) as Promise<Category[]>;
  }

  public getCategory(id: number): Promise<Category> {
    return fetch(this.API_URL + 'categories/' + id).then(response => response.json()) as Promise<Category>;
  }
  public getUser(id: number): Promise<User> {
    return fetch(this.API_URL + 'users/' + id).then(response => response.json()) as Promise<User>;
  }

  public getPost(id: number): Promise<Post> {
    return fetch(this.API_URL + 'posts/' + id, {
      headers: {'Authorization': 'Bearer ' + this.getToken()}
    }).then(response => {
      if(response.status === 401) {
        this.logout();
      }
      return response.json()
    }) as Promise<Post>;
  }

  public deletePost(id: number): Promise<Post> {
    return fetch(this.API_URL + 'admin/posts/' + id, {
      method: 'DELETE',
      headers: {'Authorization': 'Bearer ' + this.getToken()}
    }).then(response => {
      if(response.status === 401) {
        this.logout();
      }
      return response;
    }) as Promise<Post>;
  }

  public login(email: string, password: string): Promise<boolean|User> {
    return fetch(this.API_URL + 'login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({username: email, password: password}),
    }).then((response) => {
      return (response.status === 200 ? response.json() : false);
    }).then(response => {
      localStorage.setItem('token', response.token ?? '');
      localStorage.setItem('user', JSON.stringify(response.user ?? {}));

      return response;
    });
  }

  public register(name: string, email: string, password: string): Promise<boolean> {
    return fetch(this.API_URL + 'register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({name: name, email: email, password: password}),
    }).then((response) => {
      return (response.status === 201);
    });
  }

  public comment(postId: number, content: string): Promise<boolean> {
    return fetch(this.API_URL + 'posts/' + postId.toString() + '/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.getToken()
      },
      body: JSON.stringify({content: content}),
    }).then((response) => {
      return (response.status === 201);
    });
  }

  public getCommentsToPublish(): Promise<Comment[]> {
    return fetch(this.API_URL + 'admin/comments', {
      headers: {'Authorization': 'Bearer ' + this.getToken()}
    }).then(response => {
      if(response.status === 401) {
        this.logout();
      }
      return response.json();
    }) as Promise<Comment[]>;
  }

  public publishComment(id: number): Promise<Comment> {
    return fetch(this.API_URL + 'admin/comments/' + id.toString() + '/publish', {
      method: 'PUT',
      headers: {'Authorization': 'Bearer ' + this.getToken()}
    }).then(response => {
      if(response.status === 401) {
        this.logout();
      }
      return response.json();
    }) as Promise<Comment>;
  }

  public deleteComment(id: number): Promise<Response> {
    return fetch(this.API_URL + 'admin/comments/' + id.toString(), {
      method: 'DELETE',
      headers: {'Authorization': 'Bearer ' + this.getToken()}
    }).then((response) => {
      if (response.status === 401) {
        this.logout();
      }
      return response;
    });
  }

  public sendPost(post: Post): Promise<Post> {
    return fetch(this.API_URL + 'posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.getToken()
      },
      body: JSON.stringify(post),
    }).then((response) => {
      if(response.status === 401) {
        this.logout();
      }
      return response.json();
    });
  }


  public isLogged(): boolean {
    return !!localStorage.getItem('token');
  }

  public getToken(): string {
    return localStorage.getItem('token') ?? '';
  }
  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload();
  }
}
