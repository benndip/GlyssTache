export interface User {
  id: string;
  firstName: string;
  lastName: string;
  profileImage: string;
}

export interface SocialCardProps {
  user: User;
  publishedAt: string;
  title: string;
  description: string;
  mainImage: string;
  likesCount: number;
  commentsCount: number;
  onShare: () => void;
  onLike: () => void;
  onComment: () => void;
  onImagePress: () => void;
  onTitlePress: () => void;
}
