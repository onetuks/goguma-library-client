import { Category } from "@/dto/Category";
import { MemberStatics } from "@/dto/MemberStatics";

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
