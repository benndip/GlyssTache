import React from 'react';
import {Path, PathProps, SvgProps} from 'react-native-svg';
import Svg from 'react-native-svg';

export default function ChairLift({
  color,
  svgProps,
  pathProps,
}: {
  color: string;
  svgProps: SvgProps;
  pathProps: PathProps;
}) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...svgProps}>
      <Path
        d="M4.2 2.6C4.2 1.8 4.9 1 5.8 1C6.7 1 7.4 1.7 7.4 2.6C7.4 3.5 6.6 4.1 5.8 4.1C5 4.1 4.2 3.4 4.2 2.6ZM22 3L21.5 2.1L13.5 6.2L14 7.1L22 3ZM20.8 19.4L21.7 20.3C21.1 20.9 20.5 21.3 19.8 21.6C19.1 21.9 18.3 22.1 17.5 22.1H2V20.8H4.7L6.8 17.3L4.5 14.1L3.7 6.3C3.7 5.4 4.5 4.6 5.4 4.6C5.7 4.6 6 4.7 6.2 4.8L9.7 7.4L12 6.6L12.8 8.2L9.3 9.7C9.2 9.6 7.7 8.5 6.6 7.6L7 11.1L12.3 15.6L14 20.8H17.5C18.1 20.8 18.7 20.7 19.3 20.4C19.9 20.2 20.4 19.8 20.8 19.4ZM7 20.8H12L10.4 16.9L8.1 15L9.3 17.5L7 20.8Z"
        fill={color}
        {...pathProps}
      />
    </Svg>
  );
}
