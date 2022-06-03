import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/component/navbar.component';
import { LoginComponent } from './login/component/login.component';
import { RegisterComponent } from './register/component/register.component';
import { FooterComponent } from './footer/component/footer.component';
import { UsersComponent } from './users/component/users.component';
import { ArticlesComponent } from './articles/component/articles.component';
import { TruncatePipe } from './truncate.pipe';
import { UserComponent } from './user/component/user.component';
import { ArticleComponent } from './article/component/article.component';
import { CommentComponent } from './comment/component/comment.component';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    UsersComponent,
    ArticlesComponent,
    TruncatePipe,
    UserComponent,
    ArticleComponent,
    CommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
