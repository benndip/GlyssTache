import React from 'react';
import {ImageStyle} from 'react-native';
import FastImage from '@d11/react-native-fast-image';
import {createImageProgress} from 'react-native-image-progress';
import {colors} from '../constants/colors';
const ImageProgress = createImageProgress(FastImage);
type Props = {
  source?: object;
  style?: object;
  imageStyle?: ImageStyle;
  resizeMode?: 'cover' | 'contain' | 'stretch';
  children?: React.ReactNode;
};
const ImageBackground: React.FC<Props> = ({
  children,
  source,
  resizeMode,
  style,
  imageStyle,
}): JSX.Element => {
  return (
    <ImageProgress
      source={source}
      style={style}
      imageStyle={{
        // backgroundColor: colors.primaryContainer,
        ...imageStyle,
      }}
      resizeMode={
        resizeMode === 'cover'
          ? FastImage.resizeMode.cover
          : resizeMode === 'contain'
          ? FastImage.resizeMode.contain
          : FastImage.resizeMode.stretch
      }
      indicatorProps={{
        color: colors.onPrimaryContainer,
      }}>
      {children}
    </ImageProgress>
  );
};
export default ImageBackground;
