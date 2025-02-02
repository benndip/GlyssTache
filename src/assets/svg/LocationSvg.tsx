import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
function SvgComponent(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M5 9.923c0 4.852 4.244 8.864 6.123 10.402.27.22.405.332.606.388.156.044.386.044.542 0 .201-.056.336-.167.606-.388C14.756 18.787 19 14.775 19 9.923a6.885 6.885 0 00-2.05-4.895A7.04 7.04 0 0012 3a7.04 7.04 0 00-4.95 2.028A6.884 6.884 0 005 9.923z"
        stroke="#003A9B"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10 9a2 2 0 104 0 2 2 0 00-4 0z"
        stroke="#003A9B"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
export default SvgComponent;
