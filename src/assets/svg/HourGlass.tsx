import React from 'react';
import Svg, {Path} from 'react-native-svg';

export default function HourglassSvg() {
  return (
    <Svg width={80} height={80} viewBox="0 0 80 80" fill="none">
      <Path
        d="M23.332 9.99609H56.6654V23.9961L39.9987 39.9961L23.332 23.9961V9.99609Z"
        fill="white"
        fillOpacity="0.9"
      />
      <Path
        d="M20 6.66406V26.6641H20.0333L20 26.6974L33.3333 39.9974L20 53.3307L20.0333 53.3641H20V73.3307H60V53.3641H59.9667L60 53.3307L46.6667 39.9974L60 26.6974L59.9667 26.6641H60V6.66406H20ZM53.3333 54.9974V66.6641H26.6667V54.9974L40 41.6641L53.3333 54.9974ZM40 38.3307L26.6667 24.9974V13.3307H53.3333V24.9974L40 38.3307Z"
        fill="white"
      />
    </Svg>
  );
}
