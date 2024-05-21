import { inject, Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { ArticleModel, createTestArticle } from '../models/article.model';
import { ContentfulService, MainArticles } from './contentful.service';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  readonly #contentfulService = inject(ContentfulService);

  getArticle(
    articleId: string,
    imageSize: [height: number, width: number] = [250, 250],
  ): Observable<ArticleModel> {
    const [imageWidth, imageHeight] = imageSize;

    return of(
      createTestArticle({
        id: articleId,
        imageHeight,
        imageWidth,
      }),
    );
  }

  getMainArticles(): Observable<MainArticles> {
    return from(this.#contentfulService.getMainArticles());
  }

  getAllArticles(): Observable<ArticleModel[]> {
    console.log('Getting articles from Contentful');

    return from(this.#contentfulService.getArticles());
  }
}
