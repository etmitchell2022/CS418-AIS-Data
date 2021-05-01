//Test data fixtures

const batch = [
  {
    Timestamp: '2020-11-18T00:00:00.000+0000',
    Class: 'AtoN',
    MMSI: 992111840,
    MsgType: 'static_data',
    IMO: 'Unknown',
    Name: 'WIND FARM BALTIC1NW',
    VesselType: 'Undefined',
    Length: 60,
    Breadth: 60,
    A: 30,
    B: 30,
    C: 30,
    D: 30,
  },
  {
    Timestamp: '2020-11-18T00:00:00.000+0000',
    Class: 'Class A',
    MMSI: 257961000,
    MsgType: 'position_report',
    Position: { type: 'Point', coordinates: [55.00316, 12.809015] },
    Status: 'Under way using engine',
    RoT: 0.0,
    SoG: 0.2,
    CoG: 225.6,
    Heading: 240,
  },
  {
    Timestamp: '2020-11-18T00:00:00.000+0000',
    Class: 'Class A',
    MMSI: 220043000,
    MsgType: 'position_report',
    Position: { type: 'Point', coordinates: [57.120583, 8.599218] },
    Status: 'Under way using engine',
    RoT: 0.0,
    SoG: 0.0,
    Heading: 55,
  },
  {
    Timestamp: '2020-11-18T00:00:00.000+0000',
    Class: 'AtoN',
    MMSI: 992111840,
    MsgType: 'static_data',
    IMO: 'Unknown',
    Name: 'WIND FARM BALTIC1NW',
    VesselType: 'Undefined',
    Length: 60,
    Breadth: 60,
    A: 30,
    B: 30,
    C: 30,
    D: 30,
  },
];

const singleMessage = {
  Timestamp: new Date(),
  Class: 'Class test',
  MMSI: 111122223333,
  MsgType: 'position_report',
  Position: { type: 'Point', coordinates: [57.120583, 8.599218] },
  Status: 'Under way using engine',
  RoT: 0.0,
  SoG: 0.0,
  Heading: 55,
};

const recentShipPositions = [
  {
    Timestamp: '2020-11-18T02:38:22.000+0000',
    Class: 'Class A',
    MMSI: 219022256,
    MsgType: 'position_report',
    Position: {
      type: 'Point',
      coordinates: [54.572058, 11.928778],
    },
    Status: 'Under way using engine',
    RoT: 0.0,
    SoG: 0.0,
    CoG: 264.6,
    Heading: 207,
  },
  {
    Timestamp: '2020-11-18T02:38:22.000+0000',
    Class: 'Class A',
    MMSI: 375203000,
    MsgType: 'position_report',
    Position: {
      type: 'Point',
      coordinates: [54.520033, 12.182773],
    },
    Status: 'Under way using engine',
    RoT: 0.0,
    SoG: 6.2,
    CoG: 193.3,
    Heading: 194,
  },
  {
    Timestamp: '2020-11-18T02:38:22.000+0000',
    Class: 'Class A',
    MMSI: 266343000,
    MsgType: 'position_report',
    Position: {
      type: 'Point',
      coordinates: [55.503335, 10.874448],
    },
    Status: 'Under way using engine',
    RoT: 0.0,
    SoG: 18.8,
    CoG: 146.6,
    Heading: 149,
  },
  {
    Timestamp: '2020-11-18T02:38:22.000+0000',
    Class: 'Class A',
    MMSI: 235090202,
    MsgType: 'position_report',
    Position: {
      type: 'Point',
      coordinates: [54.646827, 11.355255],
    },
    Status: 'Restricted maneuverability',
    SoG: 0.1,
    CoG: 64.9,
    Heading: 270,
  },
];

const mostRecentPosition = { MMSI: 219022256, lat: 54.572058, long: 11.928778 };

const vesselInfo = {
  _id: '607ce129dfc52641ea55eda6',
  Timestamp: '2020-11-18T00:00:00.000+0000',
  Class: 'Class A',
  MMSI: 265011000,
  MsgType: 'static_data',
  IMO: 8616087,
  CallSign: 'SBEN',
  Name: 'SOFIA',
  VesselType: 'Cargo',
  Length: 72,
  Breadth: 11,
  Draught: 3.7,
  Destination: 'DK VEJ',
  ETA: '2020-11-18T10:00:00.000+0000',
  A: 59,
  B: 13,
  C: 6,
  D: 5,
};

const readPorts = [
  {
    id: '1221',
    'un/locode': 'DKFDH',
    port_location: 'Frederikshavn',
    country: 'Denmark',
    longitude: '10.546111',
    latitude: '57.437778',
    website: 'www.frederikshavnhavn.dk',
    mapview_1: 1,
    mapview_2: 5335,
    mapview_3: 53352,
  },
];

const directions = [
  {
    mapview_id: [
      {
        west: 11.5,
        south: 55.75,
        east: 12,
        north: 56,
      },
    ],
  },
];

const tilePositions = [
  {
    Timestamp: '2020-11-18T00:23:14.000Z',
    Class: 'Class A',
    MMSI: 265608060,
    MsgType: 'position_report',
    Position: { type: 'Point', coordinates: [Array] },
    Status: 'Under way using engine',
    RoT: 0,
    SoG: 0,
    CoG: 48.7,
    Heading: 23,
  },
  {
    Timestamp: '2020-11-18T00:23:24.000Z',
    Class: 'Class A',
    MMSI: 265608060,
    MsgType: 'position_report',
    Position: { type: 'Point', coordinates: [Array] },
    Status: 'Under way using engine',
    RoT: 0,
    SoG: 0,
    CoG: 301.7,
    Heading: 23,
  },
  {
    Timestamp: '2020-11-18T00:23:43.000Z',
    Class: 'Class A',
    MMSI: 265608060,
    MsgType: 'position_report',
    Position: { type: 'Point', coordinates: [Array] },
    Status: 'Under way using engine',
    RoT: 0,
    SoG: 0,
    CoG: 29.2,
    Heading: 23,
  },
];

const fivePositions = {
  MMSI: 304858000,
  Positions: [
    { lat: 55.185158, long: 14.195187 },
    { lat: 55.185118, long: 14.194392 },
    { lat: 55.185087, long: 14.193783 },
    { lat: 55.185075, long: 14.193517 },
    { lat: 55.185048, long: 14.19317 },
  ],
};

module.exports = {
  batch,
  singleMessage,
  vesselInfo,
  readPorts,
  recentShipPositions,
  mostRecentPosition,
  directions,
  tilePositions,
  fivePositions
};
