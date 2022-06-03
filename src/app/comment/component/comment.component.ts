import {Component, Input, OnInit} from '@angular/core';
import { UserService } from "../../user.service";
import { CommentService } from "../../comment.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() comment!: any;

  author: any;
  userComment: boolean;
  onEdit: boolean;
  commentContent: string;

  constructor(private userService: UserService, private commentService: CommentService) {
    this.userComment = false;
    this.onEdit = false;
    this.commentContent = '';
  }

  ngOnInit(): void {
    const that = this;
    if(this.comment?.id.toString() === localStorage.getItem('user_id')) this.userComment = true;
    this.userService.getUser(this.comment?.id).subscribe({
      next(res) {
        that.author = res;
      },
      error(err) {
        alert(err);
      }
    });

    this.commentContent = this.comment?.contenu;
  }

  deleteComment(){
    if(confirm('Êtes-vous sûr de vouloir supprimer votre commentaire ?')){
      this.commentService.deleteComment(this.comment?.id_commentaire).subscribe({
        next() {
          location.reload();
        },
        error(err) {
          alert(err);
        }
      });
    }
  }

  editComment(){
    const that = this;
    this.commentService.editComment(this.comment?.id_commentaire, this.commentContent).subscribe({
      next(res) {
        that.toggleEdit();
        that.comment = res;
      },
      error(err) {
        alert(err);
      }
    });
  }

  toggleEdit(){
    this.onEdit = !this.onEdit;
  }
}
