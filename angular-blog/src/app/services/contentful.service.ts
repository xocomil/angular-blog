import { Injectable } from '@angular/core';
import { createClient } from 'contentful';
import { environment } from '../../environments/environment';
import {
  ArticleModel,
  ContentfulArticleModel,
  createTestArticle,
} from '../models/article.model';

@Injectable({
  providedIn: 'root',
})
export class ContentfulService {
  #config = {
    space: 'a37izfgltg4n',
    key: environment.contentfulKey,
    contentTypeIds: {
      articles: 'blogPosts',
    },
  } as const;

  readonly #client = createClient({
    space: this.#config.space,
    accessToken: this.#config.key,
  });

  async getArticles(query?: object): Promise<ArticleModel[]> {
    const res = await this.#client.getEntries<ContentfulArticleModel>(
      Object.assign(
        {
          content_type: this.#config.contentTypeIds.articles,
        },
        query,
      ),
    );
    console.log('Contentful Articles:', res.items);
    const mapped = res.items.map((item) => {
      const author = item.fields.author;

      return createTestArticle({
        id: item.sys.id,
        title: item.fields.title,
        content: item.fields.content,
        date: new Date(item.fields.publishedDate),
        author: author
          ? `${author.fields.firstName} ${author.fields.lastName}`
          : 'Unknown',
        imageHeight: 250,
        imageWidth: 250,
      });
    });
    console.log('mapped', mapped);
    return mapped;
  }
}
