export interface ServiceAreaLocation {
  city: string;
  state: string;
  region: string;
  zips: string[];
  leadTimeHours: number;
}

export const SUPPORTED_AREAS: ServiceAreaLocation[] = [
  {
    city: 'Denver',
    state: 'CO',
    region: 'Central Metro',
    leadTimeHours: 24,
    zips: ['80202', '80203', '80204', '80205', '80206', '80209', '80210', '80211', '80212', '80218', '80220', '80222', '80230', '80238', '80246']
  },
  {
    city: 'Boulder',
    state: 'CO',
    region: 'Northwest Metro',
    leadTimeHours: 24,
    zips: ['80301', '80302', '80303', '80304', '80305']
  },
  {
    city: 'Littleton & Highlands Ranch',
    state: 'CO',
    region: 'South Metro',
    leadTimeHours: 24,
    zips: ['80120', '80121', '80122', '80123', '80126', '80128', '80129', '80130']
  },
  {
    city: 'Lakewood & Golden',
    state: 'CO',
    region: 'West Metro',
    leadTimeHours: 24,
    zips: ['80214', '80215', '80226', '80227', '80228', '80401']
  },
  {
    city: 'Centennial & Greenwood Village',
    state: 'CO',
    region: 'Southeast Corridor',
    leadTimeHours: 24,
    zips: ['80111', '80112', '80121', '80122']
  },
  {
    city: 'Aurora & Cherry Creek Basin',
    state: 'CO',
    region: 'East Metro',
    leadTimeHours: 24,
    zips: ['80012', '80013', '80014', '80015', '80016']
  },
  {
    city: 'Arvada & Westminster',
    state: 'CO',
    region: 'North Metro',
    leadTimeHours: 24,
    zips: ['80002', '80003', '80004', '80005', '80020', '80021', '80030', '80031']
  }
];

export function checkCoverage(zipInput: string): {
  covered: boolean;
  city?: string;
  state?: string;
  region?: string;
  message: string;
} {
  const cleanZip = (zipInput || '').trim().slice(0, 5);
  if (!cleanZip || cleanZip.length < 5) {
    return {
      covered: false,
      message: 'Please enter a valid 5-digit US postal code.'
    };
  }

  for (const area of SUPPORTED_AREAS) {
    if (area.zips.includes(cleanZip)) {
      return {
        covered: true,
        city: area.city,
        state: area.state,
        region: area.region,
        message: `Great news! Full HouseHero crew dispatch is active in ${area.city} (${area.region}).`
      };
    }
  }

  return {
    covered: false,
    message: `We currently do not have a dedicated daily dispatch hub in ZIP code ${cleanZip}. Contact our dispatch desk directly to check nearby route availability.`
  };
}
