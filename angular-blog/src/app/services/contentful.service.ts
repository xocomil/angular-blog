import { Injectable } from '@angular/core';
import { createClient, EntrySkeletonType } from 'contentful';
import { environment } from '../../environments/environment';
import { ArticleModel, createTestArticle } from '../models/article.model';

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

  getArticles(query?: object): Promise<ArticleModel[]> {
    return this.#client
      .getEntries<{
        fields: Omit<ArticleModel, 'author' | 'date'> & {
          author: EntrySkeletonType<{ firstName: string; lastName: string }>;
          publishedDate: string;
        };
        contentTypeId: 'blogPosts';
      }>(
        Object.assign(
          {
            content_type: this.#config.contentTypeIds.articles,
          },
          query,
        ),
      )
      .then((res) => {
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
      });
  }
}
