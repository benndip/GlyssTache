import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
function SvgComponent(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M6 12l4.243 4.243 8.484-8.485"
        stroke="#006605"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
export default SvgComponent;
