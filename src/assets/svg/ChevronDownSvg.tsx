import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
function SvgComponent(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M19 9l-7 7-7-7"
        stroke="#003A9B"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
export default SvgComponent;
