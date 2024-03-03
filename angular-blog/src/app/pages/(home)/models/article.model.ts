import { faker } from '@faker-js/faker';

export type ArticleModel = {
  title: string;
  content: string;
  date: Date;
};

export function createTestArticle({
  title,
  content,
  date,
}: Partial<ArticleModel> = {}): ArticleModel {
  return {
    title:
      title ??
      faker.word.words({
        count: {
          min: 5,
          max: 20,
        },
      }),
    content: content ?? faker.lorem.paragraph({ min: 10, max: 40 }),
    date: date ?? faker.date.recent({ days: 30 }),
  };
}
