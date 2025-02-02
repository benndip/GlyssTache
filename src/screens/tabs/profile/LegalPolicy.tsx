import React from 'react';
import ProfileLayout from '../../../components/profile/ProfileLayout';
import {Linking, Pressable, StyleSheet, View} from 'react-native';
import {BodyM, H3} from '../../../components/Typography';
import {theme} from '../../../constants';
import {spaces} from '../../../constants/spaces';

export default function LegalPolicy() {
  return (
    <ProfileLayout
      title="Mentions légales"
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

export const legalPolicyStyles = StyleSheet.create({
  link: {
    color: theme.colors.primary,
    textDecorationLine: 'underline',
  },
  title: {
    marginLeft: spaces.md,
  },
  subtitle: {
    marginBottom: spaces.md,
  },
  container: {
    paddingHorizontal: spaces.md,
    paddingTop: spaces.xxl,
    backgroundColor: theme.colors.grayLite,
  },
  separator: {
    height: 100,
  },
});
