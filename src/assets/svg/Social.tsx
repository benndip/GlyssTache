import React from 'react';
import {Path, G} from 'react-native-svg';
import Svg from 'react-native-svg';

import {colors} from '../../constants/colors';

export default function Social() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <G clipPath="url(#clip0_774_14505)">
        <Path
          d="M7.5 18.438v-1a5 5 0 015-5m0 0a5 5 0 015 5v1m-5-6a3 3 0 100-6 3 3 0 000 6zm-11 6v-1a3 3 0 013-3m0 0a2 2 0 100-4 2 2 0 000 4zm19 4v-1a3 3 0 00-3-3m0 0a2 2 0 100-4 2 2 0 000 4z"
          stroke={colors.primary}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
}
