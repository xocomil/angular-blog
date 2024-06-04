import { Injectable } from '@angular/core';
import * as contentful from 'contentful';
import { environment } from '../../environments/environment';
import {
  ArticleModel,
  ContentfulArticleModel,
  createTestArticle,
} from '../models/article.model';

const maxCacheAgeMs = 300_000 as const; // 5 minutes

export type MainArticles = {
  main: ArticleModel | undefined;
  highlights: ArticleModel[];
};

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

  #lastCheck: Date | undefined;
  #cache: ArticleModel[] = [];

  readonly #client = contentful.createClient({
    space: this.#config.space,
    accessToken: this.#config.key,
  });

  #getCachedArticles(): ArticleModel[] {
    if (!this.#lastCheck) {
      return [];
    }

    const now = new Date();

    if (now.getTime() - this.#lastCheck.getTime() > maxCacheAgeMs) {
      return [];
    }

    return this.#cache;
  }

  #setCachedArticles(articles: ArticleModel[]): void {
    this.#cache = articles;
    this.#lastCheck = new Date();
  }

  async getArticles(query?: object): Promise<ArticleModel[]> {
    const cached = this.#getCachedArticles();

    if (cached.length > 0) {
      return cached;
    }

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
    this.#setCachedArticles(mapped);
    return mapped;
  }

  async getMainArticles(): Promise<MainArticles> {
    return await this.getArticles().then((articles) => ({
      main: articles[0],
      highlights: articles.slice(1, 6),
    }));
  }

  async getArticle(
    articleId: string,
    imageSize: [height: number, width: number] = [250, 250],
  ): Promise<ArticleModel | undefined> {
    const response =
      await this.#client.getEntry<ContentfulArticleModel>(articleId);

    if (!response) {
      return undefined;
    }

    const [imageWidth, imageHeight] = imageSize;

    const author = response.fields.author;

    const article = createTestArticle({
      id: response.sys.id,
      title: response.fields.title,
      content: response.fields.content,
      date: new Date(response.fields.publishedDate),
      author: author
        ? `${author.fields.firstName} ${author.fields.lastName}`
        : 'Unknown',
      imageHeight,
      imageWidth,
    });
    console.log('article', article);
    return article;
  }
}
