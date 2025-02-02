import React from 'react';
import {ScrollView, View} from 'react-native';

import {theme} from '../../constants';
import {components} from '../../components';
import {BodyL, CTAM, H1} from '../../components/Typography';
import {spaces} from '../../constants/spaces';

const Social: React.FC = () => {
  const renderContent = (): JSX.Element => {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <components.HeaderLocation>
          {/* Greeting and Route Info */}
          <View style={{marginTop: 40}}>
            <H1
              style={{
                color: theme.colors.onPrimary,
              }}>
              Social
            </H1>
          </View>
          <View style={{marginTop: 40}}>
            <BodyL
              style={{
                color: theme.colors.onPrimary,
              }}>
              Retrouvez ici tous les trajets de vos amis.
            </BodyL>
          </View>
          <View style={{marginTop: spaces.xxl}}>
            {/* <components.Button
              iconForward={true}
              touchableOpacityStyle={{
                paddingHorizontal: spaces.md,
                width: '100%',
              }}
              title={'En savoir plus'}
              onPress={() => {}}
            /> */}
          </View>
        </components.HeaderLocation>
        <CTAM
          style={{
            fontStyle: 'italic',
            textAlign: 'center',
            marginTop: spaces.lg,
            textAlignVertical: 'center',
            color: theme.colors.outline,
          }}>
          Bientôt disponible
        </CTAM>
      </ScrollView>
    );
  };
  return renderContent();
};
export default Social;
