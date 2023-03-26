import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './components/app/app.component';
import {HomeComponent} from './components/home/home.component';
import {ContactComponent} from './components/contact/contact.component';
import {PostComponent} from './components/post/post.component';
import {CategoryComponent} from './components/category/category.component';
import {ListPostsComponent} from './components/list-posts/list-posts.component';
import {AuthorComponent} from './components/author/author.component';
import {ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {AddPostComponent} from './components/add-post/add-post.component';
import {CommentsComponent} from './components/comments/comments.component';
import {FroalaEditorModule, FroalaViewModule} from "angular-froala-wysiwyg";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    PostComponent,
    CategoryComponent,
    ListPostsComponent,
    AuthorComponent,
    LoginComponent,
    RegisterComponent,
    AddPostComponent,
    CommentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
