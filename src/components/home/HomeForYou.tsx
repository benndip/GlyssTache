import {Text, FlatList, RefreshControl} from 'react-native';
import React from 'react';
import PrimaryToDarkBlueGradient from './PrimaryToDarkBlueGradient';
import useCustomersList from '../../hooks/forYou/usePartnersList';
import {Customer} from '../../types';
import CardPartner from '../CardPartner';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import Button from '../Button';
import Row from '../../custom/Row';
import {spaces} from '../../constants/spaces';
import {BodyM, H2} from '../Typography';
import {theme} from '../../constants';
import {suggestedJourneysStyles} from './SuggestedJourneys';
import AppClip from '../../assets/svg/AppClip';

type Props = {
  onCardPress: (customerId: number) => void;
  onSeeAllPress: () => void;
};
export default function HomeForYou({onCardPress, onSeeAllPress}: Props) {
  const currentDomain = useSelector(
    (state: RootState) => state.tabSlice.currentDomain,
  );
  const {loadingCustomersList, customersList} = useCustomersList({
    domainId: currentDomain?.id,
  });

  const renderCustomer = ({item}: {item: Customer}) => {
    return (
      <CardPartner
        partner={item}
        onPress={() => onCardPress(item.ID)}
        containerStyle={{width: 350, flex: 1, marginHorizontal: 0}}
      />
    );
  };

  if (!customersList?.length) {
    return null;
  }
  return (
    <PrimaryToDarkBlueGradient>
      <Row
        style={{
          gap: spaces.sm2,
        }}>
        <AppClip />
        <H2
          style={{
            color: theme.colors.onPrimary,
          }}>
          Pour toi
        </H2>
      </Row>
      <FlatList
        renderItem={renderCustomer}
        horizontal
        data={customersList.slice(0, 3) ?? []}
        keyExtractor={(_, index) => index.toString()}
        style={[
          suggestedJourneysStyles.journeysHistoryList,
          {marginBottom: spaces.lg},
        ]}
        contentContainerStyle={{gap: spaces.sm}}
        ListEmptyComponent={
          loadingCustomersList ? (
            <BodyM style={{fontStyle: 'italic', color: theme.colors.onPrimary}}>
              Chargement de vos trajets ...
            </BodyM>
          ) : (
            <Text style={{textAlign: 'center'}}>
              Aucun partnenaire disponible
            </Text>
          )
        }
      />
      <Button
        title="Voir tous les bons plans"
        iconForward
        variant="secondary"
        onPress={onSeeAllPress}
      />
    </PrimaryToDarkBlueGradient>
  );
}
