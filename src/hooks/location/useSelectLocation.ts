import {TextInput} from 'react-native';
import {useEffect, useRef, useState} from 'react';
import {Domain, SkiPass} from '../../types';

import useDomainList from '../forYou/useDomainList';
import {RootState} from '../../store';
import useSkiPassesList from '../forYou/useSkiPasses';
import {useSelector} from 'react-redux';

export default function useSelectLocation() {
  const currentDomain = useSelector(
    (state: RootState) => state.tabSlice.currentDomain,
  );
  const currentSkiPassName = useSelector(
    (state: RootState) => state.authSlice.user?.skiPass?.name,
  );
  const [domain, setDomain] = useState<Domain | undefined>(
    currentDomain ?? undefined,
  );
  const [domainName, setDomainName] = useState<string>(
    currentDomain?.name ?? '',
  );
  const [subscription, setSubscription] = useState<SkiPass | undefined>();
  const [skiPassName, setSkiPassName] = useState<string>(
    currentSkiPassName ?? '',
  );
  const [locationsDisplayed, setLocationsDisplayed] = useState(false);
  const [subscriptionDisplayed, setSubscriptionDisplayed] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const domainListData = useDomainList();
  const skiPassesListData = useSkiPassesList({
    domainId: domain?.id,
  });
  const [displayedDomains, setDisplayedDomains] = useState<Domain[]>(
    domainListData.domainList ?? [],
  );

  const [displayedSkiPasses, setDisplayedSkiPasses] = useState<SkiPass[]>(
    skiPassesListData.skiPassesList ?? [],
  );
  const formInvalid = !domain?.name.length || !subscription?.name.length;

  useEffect(() => {
    setDisplayedDomains(domainListData.domainList ?? []);
  }, [domainListData.domainList]);

  useEffect(() => {
    setDisplayedSkiPasses(skiPassesListData.skiPassesList ?? []);
  }, [skiPassesListData.skiPassesList]);

  return {
    domain,
    setDomain,
    subscription,
    setSubscription,
    skiPassName,
    setSkiPassName,
    locationsDisplayed,
    setLocationsDisplayed,
    subscriptionDisplayed,
    setSubscriptionDisplayed,
    formInvalid,
    inputRef,
    domainName,
    setDomainName,
    displayedDomains,
    displayedSkiPasses,
    setDisplayedDomains,
    setDisplayedSkiPasses,
    ...domainListData,
    ...skiPassesListData,
  };
}
