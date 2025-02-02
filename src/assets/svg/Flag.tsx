import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {theme} from '../../constants';

export default function Flag() {
  return (
    <Svg width="24" height="25" viewBox="0 0 24 25" fill="none">
      <Path
        d="M4 21.9375V16.6246M4 16.6246C9.81818 12.0752 14.1818 21.1738 20 16.6244V5.25097C14.1818 9.80034 9.81818 0.701397 4 5.25077V16.6246Z"
        stroke={theme.colors.primary}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
