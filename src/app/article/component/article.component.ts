import {Component, Input, OnInit} from '@angular/core';
import { ArticleService } from "../../article.service";
import { UserService } from "../../user.service";
import { CommentService } from "../../comment.service";
import { User } from '../../user/model/user';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  @Input() article!: any;

  comments: Comment[];
  author: User | null;
  newComment: string;
  userArticle: boolean;
  onEdit: boolean;
  articleTitle: string;
  articleContent: string;

  constructor(private articleService: ArticleService, private userService: UserService, private commentService:CommentService) {
    this.comments = [];
    this.newComment = '';
    this.userArticle = false;
    this.onEdit = false;
    this.articleTitle = '';
    this.articleContent = '';
    this.author = null;
  }

  ngOnInit(): void {
    const that = this;
    if(this.article?.id.toString() === localStorage.getItem('user_id')) this.userArticle = true;
    this.articleService.getComments(this.article?.id_article).subscribe({
      next(res) {
        that.comments = res;
      },
      error(err) {
        alert(err);
      }
    });

    this.userService.getUser(this.article?.id).subscribe({
      next(res) {
        that.author = res;
      },
      error(err) {
        alert(err);
      }
    });

    this.articleTitle = this.article?.titre;
    this.articleContent = this.article?.contenu;
  }

  addComment(){
    if(this.newComment.trim() !== ''){
      const that = this;
      this.commentService.addComment(this.article?.id_article, this.newComment).subscribe({
        next(res: Comment) {
          that.comments.unshift(res);
          that.newComment = '';
        },
        error(err) {
          alert(err);
        }
      });
    }
  }

  deleteArticle(){
    if(confirm('Êtes-vous sûr de vouloir supprimer votre article ?')){
      this.articleService.deleteArticle(this.article?.id_article).subscribe({
        next() {
          location.reload();
        },
        error(err) {
          alert(err);
        }
      });
    }
  }

  editArticle(){
    const that = this;
    this.articleService.editArticle(this.article?.id_article, this.articleTitle, this.articleContent).subscribe({
      next(res) {
        that.toggleEdit();
        that.article = res;
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
