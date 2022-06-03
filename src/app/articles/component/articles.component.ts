import { Component, OnInit } from '@angular/core';
import { ArticleService } from "../../article.service";
import { Article } from '../../article/model/article';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})

export class ArticlesComponent implements OnInit {

  articles: Article[];
  title: string;
  content: string;

  constructor(private articleService: ArticleService) {
      const that = this;
      this.articles = [];
      this.title = '';
      this.content = '';
      this.articleService.getArticles().subscribe({
      next(res: Article[]) {
        that.articles = res;
      },
      error(err) {
        alert(err);
      }
    });
  }

  ngOnInit(): void {
  }

  addArticle(){
    const that = this;
    this.articleService.addArticle(this.title, this.content).subscribe({
      next(res: Article) {
        that.articles.unshift(res);
        that.title = '';
        that.content = '';
      },
      error(err) {
        alert(err);
      }
    });
  }
}
