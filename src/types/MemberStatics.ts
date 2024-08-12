import { Category } from "@/types/Category";

export interface MemberStatics {
  memberStaticsId: number;
  reviewCounts: number;
  followerCounts: number;
  followingCounts: number;
  reviewCategoryCounts: Map<Category, number>;
}
