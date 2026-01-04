export interface RankingUser {
  rank: number;
  name: string;
  points: number;
  avatar?: string; // Optional: url to avatar image
  isCurrentUser?: boolean;
  fullName?: string;
  referralCount?: number;
}

export interface GamificationState {
  userPoints: number;
  userRank: number;
  totalParticipants: number;
  nextRankThreshold?: number; // Optional: points needed for next rank/badge
}
