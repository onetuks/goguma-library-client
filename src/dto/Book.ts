import { Category } from "@/dto/Category";

export interface Book {
  bookId: number;
  title: string;
  authorName: string;
  introduction: string;
  isbn: string;
  publisher: string;
  categories: Category[];
  coverImageUrl: string;
  isIndie: boolean;
  isPermitted: boolean;
  pickCount: number;
  createdAt: Date;
}
