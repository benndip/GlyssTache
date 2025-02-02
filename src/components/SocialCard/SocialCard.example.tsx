import React from 'react';
import {SocialCard} from './SocialCard';

export const SocialCardExample: React.FC = () => {
  const mockData = {
    user: {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      profileImage:
        'https://hardloop-community-production.s3.eu-west-1.amazonaws.com/media/files/18636/original/data',
    },
    publishedAt: '2 heures',
    status: 'TRAJET RÉALISÉ',
    title: 'Les pistes de la folie douce',
    description:
      'Une superbe journée de ski avec des amis sur les pistes de la Folie Douce. Le soleil était au rendez-vous et la neige parfaite !',
    mainImage:
      'https://hardloop-community-production.s3.eu-west-1.amazonaws.com/media/files/18636/original/data',
    likesCount: 34,
    commentsCount: 2,
  };

  const handleShare = () => {};

  const handleLike = () => {};

  const handleComment = () => {};

  const handleImagePress = () => {};

  const handleTitlePress = () => {};

  return (
    <SocialCard
      {...mockData}
      onShare={handleShare}
      onLike={handleLike}
      onComment={handleComment}
      onImagePress={handleImagePress}
      onTitlePress={handleTitlePress}
    />
  );
};
