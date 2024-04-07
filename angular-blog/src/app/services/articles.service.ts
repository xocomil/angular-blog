import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ArticleModel, createTestArticle } from '../models/article.model';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
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
}
