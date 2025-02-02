import * as React from 'react';
import Svg, {Path, G, Defs, ClipPath, SvgProps} from 'react-native-svg';
function SvgComponent(props: SvgProps) {
  return (
    <Svg width={48} height={48} viewBox="0 0 48 48" fill="none" {...props}>
      <Path
        d="M.5 24C.5 11.021 11.021.5 24 .5S47.5 11.021 47.5 24 36.979 47.5 24 47.5.5 36.979.5 24z"
        fill="#fff"
      />
      <Path
        d="M.5 24C.5 11.021 11.021.5 24 .5S47.5 11.021 47.5 24 36.979 47.5 24 47.5.5 36.979.5 24z"
        stroke="#fff"
      />
      <G
        clipPath="url(#clip0_357_16555)"
        stroke="#003A9B"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round">
        <Path d="M18 34a3 3 0 100-6 3 3 0 000 6z" />
        <Path d="M21 31h8.5a3.5 3.5 0 100-7h-11a3.5 3.5 0 110-7H27" />
        <Path d="M30 20a3 3 0 100-6 3 3 0 000 6z" />
      </G>
      <Defs>
        <ClipPath id="clip0_357_16555">
          <Path fill="#fff" transform="translate(12 12)" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
export default SvgComponent;
