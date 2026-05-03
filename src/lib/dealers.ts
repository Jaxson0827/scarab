export interface Dealer {
  id: string
  name: string
  country: string
  state: string
  city: string
  address: string
  lat: number
  lng: number
  phone: string
  email: string
  website?: string
  isDistributor: boolean
  isService: boolean
  isRental: boolean
  products: string[] // product slugs
}

export const DEALERS: Dealer[] = [
  // United States
  {
    id: 'traxon-houston',
    name: 'Gulf Coast Industrial Equipment',
    country: 'USA',
    state: 'TX',
    city: 'Houston',
    address: '4801 Navigation Blvd, Houston, TX 77011',
    lat: 29.737,
    lng: -95.329,
    phone: '+1 (713) 555-0182',
    email: 'sales@gulfcoastie.com',
    website: 'https://gulfcoastie.com',
    isDistributor: true,
    isService: true,
    isRental: true,
    products: ['scarab-x5'],
  },
  {
    id: 'traxon-chicago',
    name: 'Midwest Heavy Move Solutions',
    country: 'USA',
    state: 'IL',
    city: 'Chicago',
    address: '2200 W 21st St, Chicago, IL 60608',
    lat: 41.853,
    lng: -87.676,
    phone: '+1 (312) 555-0247',
    email: 'info@midwestheavymove.com',
    isDistributor: true,
    isService: true,
    isRental: false,
    products: ['scarab-x5'],
  },
  {
    id: 'traxon-losangeles',
    name: 'Pacific Industrial Carriers',
    country: 'USA',
    state: 'CA',
    city: 'Los Angeles',
    address: '15200 S Figueroa St, Gardena, CA 90248',
    lat: 33.873,
    lng: -118.303,
    phone: '+1 (310) 555-0319',
    email: 'sales@pacificindustrial.com',
    website: 'https://pacificindustrial.com',
    isDistributor: true,
    isService: false,
    isRental: true,
    products: ['scarab-x5'],
  },
  {
    id: 'traxon-newyork',
    name: 'Northeast Rigging & Logistics',
    country: 'USA',
    state: 'NY',
    city: 'Newark',
    address: '500 Port Newark Rd, Newark, NJ 07114',
    lat: 40.694,
    lng: -74.152,
    phone: '+1 (973) 555-0438',
    email: 'contact@northeastrigging.com',
    isDistributor: false,
    isService: true,
    isRental: true,
    products: ['scarab-x5'],
  },
  {
    id: 'traxon-seattle',
    name: 'Northwest Industrial Systems',
    country: 'USA',
    state: 'WA',
    city: 'Seattle',
    address: '3201 Airport Way S, Seattle, WA 98134',
    lat: 47.565,
    lng: -122.326,
    phone: '+1 (206) 555-0571',
    email: 'sales@nwindustrialsystems.com',
    isDistributor: true,
    isService: true,
    isRental: false,
    products: ['scarab-x5'],
  },

  // Canada
  {
    id: 'traxon-toronto',
    name: 'Great Lakes Heavy Equipment',
    country: 'Canada',
    state: 'ON',
    city: 'Toronto',
    address: '25 Cawthra Ave, Toronto, ON M6N 3C2',
    lat: 43.658,
    lng: -79.463,
    phone: '+1 (416) 555-0622',
    email: 'info@greatlakesheavy.ca',
    website: 'https://greatlakesheavy.ca',
    isDistributor: true,
    isService: true,
    isRental: true,
    products: ['scarab-x5'],
  },
  {
    id: 'traxon-calgary',
    name: 'Alberta Industrial Movers',
    country: 'Canada',
    state: 'AB',
    city: 'Calgary',
    address: '5000 72 Ave SE, Calgary, AB T2C 4K7',
    lat: 51.021,
    lng: -114.001,
    phone: '+1 (403) 555-0713',
    email: 'sales@albertamovers.ca',
    isDistributor: true,
    isService: true,
    isRental: false,
    products: ['scarab-x5'],
  },

  // Australia
  {
    id: 'traxon-sydney',
    name: 'Pacific Tracked Carriers',
    country: 'Australia',
    state: 'NSW',
    city: 'Sydney',
    address: '42 Garden St, Kilsyth Industrial Estate, Sydney NSW 2164',
    lat: -33.866,
    lng: 150.948,
    phone: '+61 2 9555 0182',
    email: 'info@pacifictrackedcarriers.com.au',
    website: 'https://pacifictrackedcarriers.com.au',
    isDistributor: true,
    isService: true,
    isRental: true,
    products: ['scarab-x5'],
  },
  {
    id: 'traxon-perth',
    name: 'Western Mining Equipment',
    country: 'Australia',
    state: 'WA',
    city: 'Perth',
    address: '180 Kwinana Freeway, Henderson WA 6166',
    lat: -32.147,
    lng: 115.757,
    phone: '+61 8 9555 0247',
    email: 'sales@westernminingequipment.com.au',
    isDistributor: true,
    isService: true,
    isRental: true,
    products: ['scarab-x5'],
  },

  // United Kingdom
  {
    id: 'traxon-birmingham',
    name: 'Midlands Industrial Carriers',
    country: 'UK',
    state: 'England',
    city: 'Birmingham',
    address: '55 Aston Church Rd, Birmingham B6 5RQ',
    lat: 52.502,
    lng: -1.882,
    phone: '+44 121 555 0313',
    email: 'info@midlandscarriers.co.uk',
    website: 'https://midlandscarriers.co.uk',
    isDistributor: true,
    isService: true,
    isRental: true,
    products: ['scarab-x5'],
  },

  // Germany
  {
    id: 'traxon-hamburg',
    name: 'Norddeutsche Schwerlasttechnik',
    country: 'Germany',
    state: 'Hamburg',
    city: 'Hamburg',
    address: 'Altenwerder Chaussee 2, 21129 Hamburg',
    lat: 53.509,
    lng: 9.882,
    phone: '+49 40 555 0419',
    email: 'vertrieb@nd-schwerlast.de',
    isDistributor: true,
    isService: false,
    isRental: false,
    products: ['scarab-x5'],
  },
]

export function getDealersByCountry(country: string): Dealer[] {
  return DEALERS.filter((d) => d.country === country)
}
