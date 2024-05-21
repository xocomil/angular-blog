import { faker } from '@faker-js/faker';
import { EntryFieldTypes } from 'contentful';

export type ArticleModel = {
  id: string;
  title: string;
  author: string;
  content: string;
  date: Date;
  imageUrl: string;
};

export type ContentfulArticleModel = {
  fields: {
    title: EntryFieldTypes.Text;
    content: EntryFieldTypes.Text;
    author: EntryFieldTypes.Object<{
      fields: {
        firstName: EntryFieldTypes.Text;
        lastName: EntryFieldTypes.Text;
      };
      contentTypeId: 'authors';
    }>;
    publishedDate: EntryFieldTypes.Date;
  };
  contentTypeId: 'blogPosts';
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
      `https://picsum.photos/seed/${getPicSumSeed(title, content)}/${imageWidth}/${imageHeight}`,
  };
}

function getPicSumSeed(title?: string, content?: string): string {
  if (!title || !content) {
    return faker.word.noun();
  }

  return [title ?? '', content ?? '']
    .join('')
    .slice(0, 64)
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0)
    .toString(36);
}
