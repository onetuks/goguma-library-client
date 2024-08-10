export interface Review {
  reviewId: number;
  memberId: number;
  nickname: string;
  bookId: number;
  bookTitle: string;
  reviewTitle: string;
  reviewContent: string;
  pickCount: number;
  createdAt: Date;
  updatedAt: Date;
}
