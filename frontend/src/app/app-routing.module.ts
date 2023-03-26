import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {ContactComponent} from "./components/contact/contact.component";
import {PostComponent} from "./components/post/post.component";
import {CategoryComponent} from "./components/category/category.component";
import {AuthorComponent} from "./components/author/author.component";
import {LoginComponent} from "./components/login/login.component";
import {AddPostComponent} from "./components/add-post/add-post.component";
import {RegisterComponent} from "./components/register/register.component";
import {CommentsComponent} from "./components/comments/comments.component";

const routes: Routes = [
  { path: 'contact', component: ContactComponent },
  { path: 'posts/add', component: AddPostComponent },
  { path: 'posts/:id', component: PostComponent },
  { path: 'category/:id', component: CategoryComponent },
  { path: 'author/:id', component: AuthorComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'comments', component: CommentsComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
