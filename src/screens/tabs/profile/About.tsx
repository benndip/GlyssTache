import React from 'react';
import {View, Linking, Pressable} from 'react-native';

import ProfileLayout from '../../../components/profile/ProfileLayout';
import {spaces} from '../../../constants/spaces';
import {H3} from '../../../components/Typography';
import {legalPolicyStyles} from './LegalPolicy';
import {BodyM} from '../../../components/Typography';

export default function About() {
  return (
    <ProfileLayout
      title="À propos"
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
