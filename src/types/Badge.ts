export interface Badge {
  badgeType: BadgeType;
  badgeName: string;
  badgeDescription: string;
  badgeImageUrl: string;
  badgeCondition: number;
}

export const BADGES = new Map<BadgeKey, Badge>([
  [
    "REVIEW_NOOB",
    {
      badgeType: "REVIEW_BADGE",
      badgeName: "개털 서재",
      badgeDescription: "서평 1회 작성",
      badgeImageUrl: require("@/assets/icon/badge/default-badge.png"),
      badgeCondition: 1,
    },
  ],
  [
    "REVIEW_APPRENTICE",
    {
      badgeType: "REVIEW_BADGE",
      badgeName: "이제 좀 볼만한 서재",
      badgeDescription: "서평 5회 작성",
      badgeImageUrl: require("@/assets/icon/badge/default-badge.png"),
      badgeCondition: 5,
    },
  ],
  [
    "REVIEW_PRO",
    {
      badgeType: "REVIEW_BADGE",
      badgeName: "제법 좀 치는 서재",
      badgeDescription: "서평 10회 작성",
      badgeImageUrl: require("@/assets/icon/badge/default-badge.png"),
      badgeCondition: 10,
    },
  ],
  [
    "REVIEW_EXPERT",
    {
      badgeType: "REVIEW_BADGE",
      badgeName: "열심히 해줘서 고마워 서재",
      badgeDescription: "서평 20회 작성",
      badgeImageUrl: require("@/assets/icon/badge/default-badge.png"),
      badgeCondition: 20,
    },
  ],
  [
    "FOLLOWER_NOOB",
    {
      badgeType: "FOLLOWER_BADGE",
      badgeName: "차가운 고구마",
      badgeDescription: "팔로워 1명 달성",
      badgeImageUrl: require("@/assets/icon/badge/default-badge.png"),
      badgeCondition: 1,
    },
  ],
  [
    "FOLLOWER_APPRENTICE",
    {
      badgeType: "FOLLOWER_BADGE",
      badgeName: "따뜻한 고구마",
      badgeDescription: "팔로워 5명 달성",
      badgeImageUrl: require("@/assets/icon/badge/default-badge.png"),
      badgeCondition: 5,
    },
  ],
  [
    "FOLLOWER_PRO",
    {
      badgeType: "FOLLOWER_BADGE",
      badgeName: "조금 더 따뜻한 고구마",
      badgeDescription: "팔로워 10명 달성",
      badgeImageUrl: require("@/assets/icon/badge/default-badge.png"),
      badgeCondition: 10,
    },
  ],
  [
    "FOLLOWER_EXPERT",
    {
      badgeType: "FOLLOWER_BADGE",
      badgeName: "앗뜨거 고구마",
      badgeDescription: "팔로워 20명 달성",
      badgeImageUrl: require("@/assets/icon/badge/default-badge.png"),
      badgeCondition: 20,
    },
  ],
  [
    "ATTENDANCE_NOOB",
    {
      badgeType: "ATTENDANCE_BADGE",
      badgeName: "얼굴도장",
      badgeDescription: "출석 1회 달성",
      badgeImageUrl: require("@/assets/icon/badge/default-badge.png"),
      badgeCondition: 1,
    },
  ],
  [
    "ATTENDANCE_APPRENTICE",
    {
      badgeType: "ATTENDANCE_BADGE",
      badgeName: "인사하고 지내는 사이",
      badgeDescription: "출석 5회 달성",
      badgeImageUrl: require("@/assets/icon/badge/default-badge.png"),
      badgeCondition: 5,
    },
  ],
  [
    "ATTENDANCE_PRO",
    {
      badgeType: "ATTENDANCE_BADGE",
      badgeName: "제법 친한 사이",
      badgeDescription: "출석 10회 달성",
      badgeImageUrl: require("@/assets/icon/badge/default-badge.png"),
      badgeCondition: 10,
    },
  ],
  [
    "ATTENDANCE_EXPERT",
    {
      badgeType: "ATTENDANCE_BADGE",
      badgeName: "자주 보니 반가운 사이",
      badgeDescription: "출석 20회 달성",
      badgeImageUrl: require("@/assets/icon/badge/default-badge.png"),
      badgeCondition: 20,
    },
  ],
]);

export type BadgeKey =
  | "REVIEW_NOOB"
  | "REVIEW_APPRENTICE"
  | "REVIEW_PRO"
  | "REVIEW_EXPERT"
  | "FOLLOWER_NOOB"
  | "FOLLOWER_APPRENTICE"
  | "FOLLOWER_PRO"
  | "FOLLOWER_EXPERT"
  | "ATTENDANCE_NOOB"
  | "ATTENDANCE_APPRENTICE"
  | "ATTENDANCE_PRO"
  | "ATTENDANCE_EXPERT";

type BadgeType = "REVIEW_BADGE" | "FOLLOWER_BADGE" | "ATTENDANCE_BADGE";

export const convertToBadge = (badgeKeys: BadgeKey[]): Badge[] => {
  const badges: Badge[] = [];
  badgeKeys.forEach((badgeKey) => {
    const badge = BADGES.get(badgeKey);
    if (badge) {
      badges.push(badge);
    }
  });
  return badges;
};
