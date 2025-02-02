import React from 'react';
import {Path, Svg, SvgProps} from 'react-native-svg';

export default function DifficultyIndicator({
  filled,
  ...props
}: SvgProps & {filled?: boolean}) {
  return (
    <Svg width={12} height={12} viewBox="0 0 12 12" fill="none" {...props}>
      <Path
        d="M1.62012 6.59993C1.1654 7.38752 0.938107 7.78171 0.972071 8.10485C1.0017 8.38671 1.14962 8.64253 1.37891 8.80911C1.64168 9.00003 2.09612 9.00003 3.00493 9.00003H7.8564C8.76521 9.00003 9.21958 9.00003 9.48235 8.80911C9.71163 8.64253 9.85963 8.38671 9.88926 8.10485C9.92322 7.78171 9.69599 7.38752 9.24128 6.59993L6.81641 2.39993C6.36169 1.61234 6.13423 1.21861 5.8374 1.08645C5.5785 0.971182 5.28267 0.971182 5.02376 1.08645C4.72706 1.21856 4.49973 1.61229 4.0454 2.39922L1.62012 6.59993Z"
        stroke="#003A9B"
        fill={filled ? '#003A9B' : 'none'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
