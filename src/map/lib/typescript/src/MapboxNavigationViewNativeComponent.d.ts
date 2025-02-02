import type { HostComponent, ViewProps } from 'react-native';
import type { Double } from 'react-native/Libraries/Types/CodegenTypes';
import type { NativeEventsProps } from './types';
type NativeCoordinate = number[];
interface NativeProps extends ViewProps {
    mute?: boolean;
    separateLegs?: boolean;
    distanceUnit?: string;
    kind?: string;
    startOrigin: NativeCoordinate;
    waypoints?: {
        latitude: Double;
        longitude: Double;
        name?: string;
        separatesLegs?: boolean;
    }[];
    id?: string;
    token?: string;
    destinationTitle?: string;
    destination: NativeCoordinate;
    language?: string;
    showCancelButton?: boolean;
    shouldSimulateRoute?: boolean;
    showsEndOfRouteFeedback?: boolean;
    hideStatusView?: boolean;
}
declare const _default: HostComponent<NativeProps & NativeEventsProps>;
export default _default;
//# sourceMappingURL=MapboxNavigationViewNativeComponent.d.ts.map