import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {SocialCardProps} from '../../types/social-card.types';
import FastImage from '@d11/react-native-fast-image';
import {theme} from '../../constants';
import {shadowStyle} from '../../constants/shadow';
import {spaces} from '../../constants/spaces';
import Row from '../../custom/Row';
import Icons from '../../assets/svg/Icons';
import {BodyL, BodyM, BodyS, CTAM, CTAS} from '../Typography';
import Send from '../../assets/svg/Send';
import Flag from '../../assets/svg/Flag';
import Button from '../Button';
import Comment from '../../assets/svg/Comment';

export const SocialCard: React.FC<SocialCardProps> = ({
  user,
  publishedAt,
  title,
  description,
  mainImage,
  likesCount,
  commentsCount,
  onShare,
  onLike,
  onComment,
  onImagePress,
  onTitlePress,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <Row style={styles.header}>
          <FastImage
            source={{uri: user.profileImage}}
            style={styles.profileImage}
          />
          <View style={styles.headerText}>
            <BodyL>{`${user.firstName} ${user.lastName}`}</BodyL>
            <BodyS style={styles.date}>{publishedAt}</BodyS>
          </View>
        </Row>

        <Row style={styles.statusContainer}>
          <TouchableOpacity onPress={onShare} style={[styles.iconText]}>
            <Flag />
            <BodyM style={styles.statusTitle}>Trajet RÉALISÉ</BodyM>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onShare}
            style={[styles.iconText, {alignItems: 'flex-end'}]}>
            <Send />
            <CTAM style={{color: theme.colors.grayDark}}>Partager</CTAM>
          </TouchableOpacity>
        </Row>

        <Button
          title={title}
          onPress={onTitlePress}
          variant="secondary"
          flat={true}
          containerStyle={{marginVertical: spaces.md}}
          touchableOpacityStyle={styles.titleButton}
          iconForward
        />

        <BodyM>{description}</BodyM>
      </View>
      <TouchableOpacity onPress={onImagePress}>
        <FastImage
          source={{uri: mainImage}}
          style={styles.mainImage}
          resizeMode={FastImage.resizeMode.cover}
        />
      </TouchableOpacity>

      <Row style={styles.footer}>
        <TouchableOpacity
          onPress={onLike}
          style={[styles.iconText, {alignItems: 'center'}]}>
          <Icons iconName="interface_heart_02" stroke={theme.colors.grayDark} />
          <CTAS style={styles.iconLabel}>{`${likesCount} j'aime${
            likesCount > 0 ? 's' : ''
          }`}</CTAS>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onComment}
          style={[styles.iconText, {alignItems: 'center'}]}>
          <Comment />
          <CTAS style={styles.iconLabel}>{`${commentsCount} commentaire${
            commentsCount > 0 ? 's' : ''
          }`}</CTAS>
        </TouchableOpacity>
      </Row>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.grayLite,
    borderRadius: 16,
    width: '100%',
    marginHorizontal: 16,
    marginVertical: 8,
    ...shadowStyle.shadowContainer,
  },
  content: {
    padding: spaces.md,
  },
  header: {
    marginBottom: 12,
  },
  profileImage: {
    width: 46,
    height: 46,
    borderRadius: 1000,
  },
  headerText: {
    flex: 1,
    marginLeft: spaces.md,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  date: {
    fontSize: 12,
    color: theme.colors.grayDark,
    marginTop: 2,
  },
  shareButton: {
    padding: 8,
  },
  statusContainer: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  statusTitle: {
    textTransform: 'uppercase',
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  badge: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  badgeText: {
    color: '#1976D2',
    fontSize: 12,
    fontWeight: '600',
  },
  titleButton: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  mainImage: {
    width: '100%',
    height: 200,
    marginBottom: 12,
  },
  footer: {
    marginTop: 4,
    gap: spaces.lg,
    alignItems: 'flex-end',
    paddingHorizontal: spaces.md,
    marginBottom: spaces.md,
  },
  iconText: {
    flexDirection: 'row',
    gap: spaces.sm,
    alignItems: 'flex-end',
  },
  icon: {
    marginRight: 6,
  },
  iconLabel: {
    color: theme.colors.grayDark,
  },
});
