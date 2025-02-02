import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Svg, {G, Path} from 'react-native-svg';
import {components} from '../components';
import {colors} from '../constants/colors';
import {spaces} from '../constants/spaces';
type Props = {focused: boolean};

export function TabFocusWrapper({
  children,
  focused,
  title,
}: React.PropsWithChildren<{focused: boolean; title: string}>) {
  return (
    <View style={styles.container}>
      {children}
      <Text
        style={[
          components.Typography.LabelBottomBar,
          styles.label,
          {color: focused ? colors.primary : colors.secondary},
        ]}>
        {title}
      </Text>
      {focused && <View style={styles.indicator} />}
    </View>
  );
}
export const HomeTabSvg: React.FC<Props> = ({focused}) => {
  return (
    <TabFocusWrapper focused={focused} title="Accueil">
      <Svg width={25} height={25} viewBox="0 0 25 25" fill="none">
        <Path
          d="M20.5 17.436v-5.548c0-.534 0-.801-.065-1.05a1.997 1.997 0 00-.28-.617c-.145-.213-.345-.39-.748-.741l-4.8-4.2c-.746-.653-1.12-.98-1.54-1.104-.37-.11-.764-.11-1.135 0-.42.124-.792.45-1.538 1.102L5.593 9.48c-.402.352-.603.528-.747.74a1.998 1.998 0 00-.281.618c-.065.249-.065.516-.065 1.05v5.548c0 .932 0 1.398.152 1.765a2 2 0 001.082 1.083c.368.152.834.152 1.766.152s1.398 0 1.766-.152a2 2 0 001.082-1.082c.152-.368.152-.834.152-1.766v-1a2 2 0 114 0v1c0 .932 0 1.398.152 1.765a2 2 0 001.082 1.083c.368.152.834.152 1.766.152s1.398 0 1.766-.152a2 2 0 001.082-1.083c.152-.367.152-.833.152-1.765z"
          stroke={focused ? colors.primary : colors.secondary}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </TabFocusWrapper>
  );
};
export const JourneysTabSvg: React.FC<Props> = ({focused}) => {
  return (
    <TabFocusWrapper focused={focused} title="Trajets">
      <Svg width={25} height={25} viewBox="0 0 25 25" fill="none">
        <Path
          d="M5.5 10.36c0 4.852 4.244 8.864 6.123 10.403.27.22.405.331.606.388.156.044.386.044.542 0 .201-.057.336-.167.606-.388 1.879-1.538 6.123-5.55 6.123-10.402a6.885 6.885 0 00-2.05-4.896 7.04 7.04 0 00-4.95-2.027 7.04 7.04 0 00-4.95 2.027A6.884 6.884 0 005.5 10.36z"
          stroke={focused ? colors.primary : colors.secondary}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M10.5 9.438a2 2 0 104 0 2 2 0 00-4 0z"
          stroke={focused ? colors.primary : colors.secondary}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </TabFocusWrapper>
  );
};
export const ProfileTabSvg: React.FC<Props> = ({focused}) => {
  return (
    <TabFocusWrapper focused={focused} title="Profil">
      <Svg width={25} height={25} viewBox="0 0 25 25" fill="none">
        <Path
          d="M19.5 21.438a7 7 0 10-14 0m7-10a4 4 0 110-8 4 4 0 010 8z"
          stroke={focused ? colors.primary : colors.secondary}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </TabFocusWrapper>
  );
};
export const SocialTabSvg: React.FC<Props> = ({focused}) => {
  return (
    <TabFocusWrapper focused={focused} title="Social">
      <Svg width={25} height={25} viewBox="0 0 25 25" fill="none">
        <G clipPath="url(#clip0_774_14505)">
          <Path
            d="M7.5 18.438v-1a5 5 0 015-5m0 0a5 5 0 015 5v1m-5-6a3 3 0 100-6 3 3 0 000 6zm-11 6v-1a3 3 0 013-3m0 0a2 2 0 100-4 2 2 0 000 4zm19 4v-1a3 3 0 00-3-3m0 0a2 2 0 100-4 2 2 0 000 4z"
            stroke={focused ? colors.primary : colors.secondary}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </G>
      </Svg>
    </TabFocusWrapper>
  );
};
export const PartnerTabSvg: React.FC<Props> = ({focused}) => {
  return (
    <TabFocusWrapper focused={focused} title="Pour toi">
      <Svg width={25} height={25} viewBox="0 0 25 25" fill="none">
        <Path
          d="M19.42 17.596l.128-1.6A1.92 1.92 0 0120 14.905l1.04-1.222a1.92 1.92 0 000-2.49L20 9.97a1.921 1.921 0 01-.454-1.093l-.127-1.599a1.921 1.921 0 00-1.762-1.761l-1.599-.128a1.918 1.918 0 01-1.092-.452l-1.221-1.04a1.921 1.921 0 00-2.492 0l-1.221 1.04a1.92 1.92 0 01-1.093.452l-1.6.128m12.08 12.08a1.92 1.92 0 01-1.76 1.761m-.001 0l-1.6.127a1.92 1.92 0 00-1.092.452l-1.221 1.041a1.921 1.921 0 01-2.492 0l-1.22-1.04a1.92 1.92 0 00-1.094-.453l-1.6-.128m.002.001a1.92 1.92 0 01-1.762-1.762l-.128-1.6A1.92 1.92 0 005 14.905l-1.04-1.22a1.922 1.922 0 010-2.493l1.04-1.22c.263-.308.42-.69.452-1.093l.128-1.6m.001.001a1.92 1.92 0 011.762-1.762"
          stroke={focused ? colors.primary : colors.secondary}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.998 10.807a1.5 1.5 0 11-2.121-2.122 1.5 1.5 0 012.121 2.122zm3.674-1.76l.887.887L9.75 15.74l-.887-.887 5.808-5.807zm-.819 6.736a1.5 1.5 0 102.122-2.12 1.5 1.5 0 00-2.122 2.12z"
          fill={focused ? colors.primary : colors.secondary}
        />
      </Svg>
    </TabFocusWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spaces.sm,
  },
  label: {
    marginVertical: spaces.xs,
  },
  indicator: {
    backgroundColor: colors.primary,
    height: 4,
    width: 70,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
});
