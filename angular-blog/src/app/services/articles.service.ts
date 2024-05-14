import { inject, Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { from, Observable, of } from 'rxjs';
import { ArticleModel, createTestArticle } from '../models/article.model';
import { ContentfulService } from './contentful.service';

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

  getMainArticle(): Observable<ArticleModel> {
    return of(createTestArticle());
  }

  getHighlightArticles(): Observable<ArticleModel[]> {
    return of(
      Array.from(
        { length: faker.number.int({ min: 3, max: 4 }) },
        createTestArticle,
      ),
    );
  }

  getAllArticles(): Observable<ArticleModel[]> {
    console.log('Getting articles from Contentful');

    return from(this.#contentfulService.getArticles());
  }
}
