import { BookResponse } from "@/api/BookApis";
import { Category } from "@/types/Category";
import { patch } from "@/api/ServerRequest";

export interface BookPatchRequest {
  title: string;
  authorName: string;
  introduction: string;
  isbn: string;
  publisher: string;
  categories: Category[];
  isIndie: boolean;
  isPermitted: boolean;
}

export const AdminBookApis = {
  patchBook: async (
    bookId: number,
    request: BookPatchRequest,
    coverImage: File
  ): Promise<BookResponse> => {
    // 도서 정보 수정
    return await patch();
  },
};
