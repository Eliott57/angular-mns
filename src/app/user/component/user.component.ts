import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { UserService } from "../../user.service";
import { Comment } from '../../comment/model/comment';
import { Article } from '../../article/model/article';
import { User } from '../model/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  lastArticles: Article[];
  lastComments: Comment[];
  user: User | null;
  userAccount: boolean;
  onEdit: boolean;
  userPseudo: string | undefined;
  userEmail: string | undefined;
  userAvatar: string | undefined;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) {
    this.lastArticles = [];
    this.lastComments = [];
    this.user = null;
    this.userAccount = false;
    this.onEdit = false;
    this.userPseudo = '';
    this.userEmail = '';
    this.userAvatar = '';
  }

  ngOnInit(): void {
    const that = this;
    this.activatedRoute.params.subscribe(params => {
      if(params['id'].toString() === localStorage.getItem('user_id')) this.userAccount = true;
      this.userService.getUser(params['id']).subscribe({
        next(res: any) {
          that.user = res;
          that.userPseudo = that.user?.pseudo;
          that.userEmail = that.user?.email;
          that.userAvatar = that.user?.avatar;
        },
        error(err) {
          alert(err);
        }
      });

      this.userService.getLastArticles(params['id']).subscribe({
        next(res: any) {
          that.lastArticles = res.slice(0,5);
        },
        error(err) {
          alert(err);
        }
      });

      this.userService.getLastComments(params['id']).subscribe({
        next(res: any) {
          that.lastComments = res.slice(0,5);
        },
        error(err) {
          alert(err);
        }
      });
    });
  }

  editAccount(){
    const that = this;
    this.userService.editAccount(this.user?.id, this.userPseudo, this.userEmail, this.userAvatar).subscribe({
      next(res: any) {
        that.user = res;
        that.toggleEdit();
      },
      error(err) {
        alert(err);
      }
    });
  }

  deleteAccount(){
    if(confirm('Êtes-vous sûr de vouloir supprimer votre compte ?')){
      this.userService.deleteAccount(this.user?.id).subscribe({
        next() {
          localStorage.removeItem('_token');
          localStorage.removeItem('user_id');
          window.location.href = '/login';
        },
        error(err) {
          alert(err);
        }
      });
    }
  }

  toggleEdit(){
    this.onEdit = !this.onEdit;
  }
}
