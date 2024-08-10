import { Category } from "@/types/Category";
import { MemberStatics } from "@/types/MemberStatics";

export interface Member {
  memberId: number;
  nickname: string;
  introduction: string;
  interestedCategories: Category[];
  isAlarmAccepted: boolean;
  points: number;
  profileImageUrl: string;
  profileBackgroundImageUrl: string;
  memberStatics: MemberStatics;
}
