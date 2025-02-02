import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
function SvgComponent(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M12 8.45v4M12 21a9 9 0 110-18 9 9 0 010 18zm.05-5.55v.1h-.1v-.1h.1z"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
export default SvgComponent;
