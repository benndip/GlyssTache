import {View, FlatList, StyleSheet} from 'react-native';
import React from 'react';
import {BodyM, H2} from '../Typography';
import {spaces} from '../../constants/spaces';
import {svg} from '../../assets/svg';
import {theme} from '../../constants/colors';
import Row from '../../custom/Row';
import JourneySuggestion from '../JourneySuggestion';
import Button from '../Button';
import PrimaryToDarkBlueGradient from './PrimaryToDarkBlueGradient';
import usePartnerJourneys from '../../hooks/forYou/useJourneys';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import {Journey} from '../../types/ForYou';

type Props = {
  onSeeAllPress: () => void;
  onPress: (journey: Journey & {domain_id: number; id: number}) => void;
};
export default function SuggestedJourneys({onSeeAllPress, onPress}: Props) {
  const currentDomain = useSelector(
    (state: RootState) => state.tabSlice.currentDomain,
  );

  const customer = useSelector((state: RootState) => state.authSlice.user);
  const {journeys, loadingJourneys} = usePartnerJourneys({
    customerId: customer?.id,
    domainId: currentDomain?.id,
  });

  if (!journeys?.length) {
    return null;
  }
  return (
    <PrimaryToDarkBlueGradient>
      <Row
        style={{
          gap: spaces.sm2,
        }}>
        <svg.JourneySvg />
        <H2
          style={{
            color: theme.colors.onPrimary,
          }}>
          Trajets recommandés
        </H2>
      </Row>
      <FlatList
        data={journeys.slice(0, 3)}
        renderItem={({item: {id, ...rest}}) => (
          <JourneySuggestion
            {...rest}
            onPress={() => onPress({id, ...rest})}
            style={suggestedJourneysStyles.listItem}
          />
        )}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        style={suggestedJourneysStyles.journeysHistoryList}
        contentContainerStyle={{
          gap: spaces.sm,
        }}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={
          loadingJourneys ? (
            <BodyM
              style={{
                color: theme.colors.onPrimary,
                fontStyle: 'italic',
              }}>
              Chargement de vos trajets ...
            </BodyM>
          ) : (
            <Row
              style={{
                gap: spaces.xs,
              }}>
              <View>
                <svg.InfoSvg />
              </View>
              <BodyM
                style={{
                  color: theme.colors.onPrimary,
                }}>
                Aucun trajet trouvé
              </BodyM>
            </Row>
          )
        }
      />
      <Button
        title="Voir tous les trajets"
        iconForward
        variant="secondary"
        onPress={onSeeAllPress}
      />
    </PrimaryToDarkBlueGradient>
  );
}
export const suggestedJourneysStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  journeysHistoryList: {
    marginTop: spaces.md,
    marginBottom: spaces.xxl,
    alignSelf: 'center',
  },
  listItem: {
    width: 350,
  },
});
