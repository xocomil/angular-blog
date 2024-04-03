import { faker } from '@faker-js/faker';

export type ArticleModel = {
  id: string;
  title: string;
  content: string;
  date: Date;
  imageUrl: string;
};

export function createTestArticle({
  id,
  title,
  content,
  date,
  imageUrl,
}: Partial<ArticleModel> = {}): ArticleModel {
  return {
    id: id ?? faker.string.uuid(),
    title:
      title ??
      faker.word
        .words({
          count: {
            min: 5,
            max: 20,
          },
        })
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
    content: content ?? faker.lorem.paragraph({ min: 10, max: 40 }),
    date: date ?? faker.date.recent({ days: 30 }),
    imageUrl:
      imageUrl ?? `https://picsum.photos/seed/${faker.word.noun()}/250/250`,
  };
}
