import React, {useMemo, useState} from 'react';
import {ScrollView, View, Text, FlatList, RefreshControl} from 'react-native';
import {theme} from '../../constants';
import {components} from '../../components';
import useCustomersList from '../../hooks/forYou/usePartnersList';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import {Customer} from '../../types';
import {BodyL, H1} from '../../components/Typography';
import {ForYouStackParamList} from '../../types/navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {spaces} from '../../constants/spaces';

type Props = {
  navigation: NativeStackNavigationProp<ForYouStackParamList, 'Partners'>;
};
export default function Social({navigation}: Props) {
  const currentDomain = useSelector(
    (state: RootState) => state.tabSlice.currentDomain,
  );
  const filters = useMemo(
    () => [
      'Tout',
      'Restaurant',
      'Repos',
      'Loisirs',
      'Bar',
      'Hôtel',
      'Résidence',
    ],
    [],
  );
  const [selectedFilter, setSelectedFilter] = useState(filters[0]);
  const {loadingCustomersList, customersList} = useCustomersList({
    domainId: currentDomain?.id,
  });

  const displayedItems = useMemo(() => {
    return customersList?.filter(
      customer => selectedFilter === 'Tout' || customer.Tag === selectedFilter,
    );
  }, [customersList, selectedFilter]);

  const renderCustomer = ({item}: {item: Customer}) => {
    return (
      <components.CardPartner
        partner={item}
        onPress={() => {
          navigation.navigate('PartnerDetails', {
            customerId: item.ID,
          });
        }}
      />
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.background}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <components.HeaderLocation
          containerStyle={{
            height: 300,
            overflow: 'hidden',
          }}>
          {/* Greeting and Route Info */}
          <View style={{marginTop: spaces.xxl}}>
            <H1
              style={{
                color: theme.colors.onPrimary,
              }}>
              Pour toi
            </H1>
          </View>
          <View style={{marginTop: spaces.xxl}}>
            <BodyL
              style={{
                color: theme.colors.onPrimary,
              }}>
              Découvrez tous les bons plans de la station, sélectionnés
              spécialement pour vous.
            </BodyL>
          </View>
        </components.HeaderLocation>
        <View
          style={{
            backgroundColor: theme.colors.background,
            paddingTop: 20,
            paddingBottom: 120,
          }}>
          <components.FilterButtons
            filters={filters}
            selectedFilter={selectedFilter}
            selectFilter={setSelectedFilter}
            containerStyle={{
              paddingHorizontal: spaces.md,
              paddingTop: spaces.xxl,
              marginBottom: spaces.lg,
            }}
          />
          <FlatList
            scrollEnabled={false}
            renderItem={renderCustomer}
            data={displayedItems ?? []}
            keyExtractor={(_, index) => index.toString()}
            refreshControl={
              <RefreshControl refreshing={loadingCustomersList} />
            }
            ListEmptyComponent={() => (
              <Text style={{textAlign: 'center'}}>
                Aucun partnenaire disponible
              </Text>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
}
