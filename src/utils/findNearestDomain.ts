import {Domain} from '../types';

export function findNearestDomain(
  lat: number,
  lon: number,
  domains: Domain[],
): Domain | undefined {
  const MAX_DISTANCE = 5; // 5km radius

  // Calculate distance between two coordinates using Haversine formula
  const getDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Find nearest domain within MAX_DISTANCE
  const nearest = domains
    .map(domain => ({
      domain,
      distance: getDistance(
        lat,
        lon,
        domain.coordinates.lat,
        domain.coordinates.lon,
      ),
    }))
    .sort((a, b) => a.distance - b.distance)
    .find(item => item.distance <= MAX_DISTANCE);

  return nearest?.domain || domains[0];
}
