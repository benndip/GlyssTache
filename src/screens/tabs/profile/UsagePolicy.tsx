import React from 'react';
import ProfileLayout from '../../../components/profile/ProfileLayout';
import {legalPolicyStyles} from './LegalPolicy';
import {Linking, Pressable, View} from 'react-native';
import {BodyM, H3} from '../../../components/Typography';
import {spaces} from '../../../constants/spaces';

export default function UsagePolicy() {
  return (
    <ProfileLayout
      title="Conditions d'utilisation de Glyss"
      titleStyle={legalPolicyStyles.title}
      contentContainerStyle={{paddingHorizontal: 0}}>
      <View style={legalPolicyStyles.container}>
        <H3 style={legalPolicyStyles.subtitle}>Sous titre 1</H3>
        <BodyM>
          Lorem ipsum dolor sit amet consectetur. Ipsum id ultrices massa morbi
          dui tellus risus suspendisse nec. Leo sit mi auctor tincidunt
          venenatis ultricies vel aliquam. Integer hac ornare ultricies
          pellentesque. Pellentesque ultrices pellentesque ornare hac sed diam
          blandit sollicitudin tortor. Blandit nunc sit amet aliquam egestas
          dapibus. LIENinciduntametquam
        </BodyM>
        <Pressable
          onPress={() =>
            Linking.openURL('https://www.google.com').catch(console.log)
          }>
          <BodyM style={legalPolicyStyles.link}>Lien 1</BodyM>
        </Pressable>
        <H3 style={[legalPolicyStyles.subtitle, {marginTop: spaces.xxl}]}>
          Sous titre 2
        </H3>
        <BodyM>
          Lorem ipsum dolor sit amet consectetur. Ipsum id ultrices massa morbi
          dui tellus risus suspendisse nec. Lorem ipsum dolor sit amet
          consectetur. Ipsum id ultrices massa morbi dui tellus risus
          suspendisse nec. Leo sit mi auctor tincidunt venenatis ultricies vel
          aliquam. Integer hac ornare ultricies pellentesque. Pellentesque
          ultrices pellentesque ornare hac sed diam blandit sollicitudin tortor.
          Lorem ipsum dolor sit amet consectetur. Ipsum id ultrices massa morbi
          dui tellus risus suspendisse nec. Lorem ipsum dolor sit amet
          consectetur. Ipsum id ultrices massa morbi dui tellus risus
          suspendisse nec. Leo sit mi auctor tincidunt venenatis ultricies vel
          aliquam. Integer hac ornare ultricies pellentesque. Pellentesque
          ultrices pellentesque ornare hac sed diam blandit sollicitudin tortor.
        </BodyM>
        <View style={legalPolicyStyles.separator} />
      </View>
    </ProfileLayout>
  );
}
