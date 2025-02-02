export type Journey = {
  id: string | number;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'EXPERIENCED';
  name: string;
  duration: number;
  distance: number; //kilometers
  slope_list: Array<{
    difficulty: 'novice' | 'easy' | 'intermediate' | 'expert';
    name: string;
  }>;
};

export type JourneyDetails = Journey & {
  direction_list: Array<{
    name: string;
    difficulty: 'novice' | 'easy' | 'intermediate' | 'expert';
  }>;
};

export type OpenHours = {
  day: string;
  openAt: string;
  closeAt: string;
};

export type Partner = {
  Name: string;
  Tag: string;
  Phone: string;
  IsPremium: boolean;
  MapNode: string;
  OpenHours: OpenHours[];
  Address: string;
  DomainId: number;
  Id: number;
  Lat: number;
  Lon: number;
  ShortDescription: string;
  ClosingTimeInMinutesFromMidnight: number;
  OpeningTimeInMinutesFromMidnight: number;
  Coordinates: {
    Latitude: number;
    Longitude: number;
  };
  UpdatedAt: string;
  CoverURL: string;
  LongDescription: string;
  StrengthPointList: string[];
  EquipmentAndServiceList: string[];
};
