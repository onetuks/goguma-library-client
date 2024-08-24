// ISBN 도서 정보 조회
import { CategoryType } from "@/types/Category";
import { get, postFormData } from "@/api/ServerRequest";
import { buildPageQuery } from "@/types/Page";

export interface BookIsbnGetResponse {
  title: string;
  authorName: string;
  introduction: string;
  publisher: string;
  isbn: string;
  categories: CategoryType[];
  coverImageUrl: string;
}

export interface BookResponse {
  bookId: number;
  title: string;
  authorName: string;
  introduction: string;
  isbn: string;
  publisher: string;
  categories: CategoryType[];
  coverImageUrl: string;
  isIndie: boolean;
  isPermitted: boolean;
}

export interface BookPostRequest {
  title: string;
  authorName: string;
  introduction: string | null;
  isbn: string | null;
  publisher: string | null;
  categories: CategoryType[];
  isIndie: boolean;
  coverImageFilename: string | null;
}

export interface Book {
  bookId: number | null;
  title: string;
  authorName: string;
  introduction: string | null;
  isbn: string | null;
  publisher: string | null;
  categories: CategoryType[];
  coverImageUrl: string;
  isIndie: boolean;
  isPermitted: boolean;
  pickCount: number | null;
  createdAt: Date | null;
}

export const BookApis = {
  getBookWithIsbn: async (isbn: string): Promise<BookIsbnGetResponse> => {
    // ISBN 도서 정보 조회
    return await get(`/books/isbn/${isbn}`)
      .then((data) => data as BookIsbnGetResponse)
      .catch((error) => {
        throw error;
      });
  },
  postNewBook: async (
    request: BookPostRequest,
    coverImage: File | null
  ): Promise<BookResponse> => {
    // 도서 등록
    return await postFormData("/books", request, ["cover-image", coverImage])
      .then((data) => data as BookResponse)
      .catch((error) => {
        throw error;
      });
  },
  getBook: async (bookId: number): Promise<BookResponse> => {
    // 도서 단건 조회
    return await get(`/books/${bookId}`).then((data) => data as BookResponse);
  },
  getBooksWithKeyword: async (
    keyword: string,
    page?: number,
    size?: number
  ): Promise<BookResponse[]> => {
    // 제목/저자/출판사 포함 도서 다건 조회
    return await get(
      `/books?keyword=${keyword}${buildPageQuery(page, size)}`
    ).then((data) => data as BookResponse[]);
  },
  getBooksWithInterestedCategories: async (): Promise<BookResponse[]> => {
    // 관심 카테고리 포함 도서 다건 조회
    return await get("/books/recommend/interested-categories").then(
      (data) => data as BookResponse[]
    );
  },
  getWeeklyBooks: async (): Promise<BookResponse[]> => {
    // 금주도서 조회
    return await get("/books/recommend/weekly-featured").then(
      (data) => data as BookResponse[]
    );
  },
};

export const mapBookIsbnGetResponseToBook = (
  bookIsbnGetResponse: BookIsbnGetResponse
): Book => {
  return {
    bookId: null,
    title: bookIsbnGetResponse.title,
    authorName: bookIsbnGetResponse.authorName,
    introduction: bookIsbnGetResponse.introduction,
    isbn: bookIsbnGetResponse.isbn,
    publisher: bookIsbnGetResponse.publisher,
    categories: bookIsbnGetResponse.categories,
    coverImageUrl: bookIsbnGetResponse.coverImageUrl,
    isIndie: bookIsbnGetResponse.isbn.length === 13,
    isPermitted: false,
    pickCount: null,
    createdAt: null,
  };
};

export const mapBookToBookPostRequest = (
  book: Book,
  coverImageFilename: string | null
): BookPostRequest => {
  return {
    title: book.title,
    authorName: book.authorName,
    introduction: book.introduction,
    isbn: book.isbn,
    publisher: book.publisher,
    categories: book.categories,
    isIndie: book.isIndie,
    coverImageFilename: book.coverImageUrl
      ? book.coverImageUrl
      : coverImageFilename,
  };
};

export const initBook = (): Book => {
  return {
    bookId: null,
    title: "",
    authorName: "",
    introduction: null,
    isbn: null,
    publisher: null,
    categories: [],
    coverImageUrl: "",
    isIndie: true,
    isPermitted: false,
    pickCount: null,
    createdAt: null,
  };
};
