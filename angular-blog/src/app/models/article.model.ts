import { faker } from '@faker-js/faker';

export type ArticleModel = {
  id: string;
  title: string;
  author: string;
  content: string;
  date: Date;
  imageUrl: string;
};

export function createTestArticle(
  {
    id,
    title,
    author,
    content,
    date,
    imageUrl,
    imageWidth,
    imageHeight,
  }: Partial<ArticleModel> & { imageHeight: number; imageWidth: number } = {
    imageHeight: 250,
    imageWidth: 250,
  },
): ArticleModel {
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
    author: author ?? faker.person.fullName(),
    content:
      content ?? faker.lorem.paragraphs({ min: 30, max: 50 }, '<br><br>'),
    date: date ?? faker.date.recent({ days: 30 }),
    imageUrl:
      imageUrl ??
      `https://picsum.photos/seed/${faker.word.noun()}/${imageWidth}/${imageHeight}`,
  };
}
