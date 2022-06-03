import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/component/login.component';
import { RegisterComponent } from './register/component/register.component';
import { UsersComponent } from './users/component/users.component';
import { ArticlesComponent } from './articles/component/articles.component';
import { UserComponent } from './user/component/user.component';
import { ConnectedGuard } from './connected.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'users', component: UsersComponent, canActivate: [ConnectedGuard]},
  { path: 'articles', component: ArticlesComponent, canActivate: [ConnectedGuard]},
  { path: 'user/:id', component: UserComponent, canActivate: [ConnectedGuard]},
  { path: '**', component: ArticlesComponent, canActivate: [ConnectedGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
