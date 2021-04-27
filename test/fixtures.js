//Test data fixtures

const batch = [
  {
    _id: { $oid: '607ce129dfc52641ea55ed84' },
    Timestamp: { $date: '2020-11-18T00:00:00.000+0000' },
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
    _id: { $oid: '607ce129dfc52641ea55ed83' },
    Timestamp: { $date: '2020-11-18T00:00:00.000+0000' },
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
    _id: { $oid: '607ce129dfc52641ea55edb2' },
    Timestamp: { $date: '2020-11-18T00:00:00.000+0000' },
    Class: 'Class A',
    MMSI: 220043000,
    MsgType: 'position_report',
    Position: { type: 'Point', coordinates: [57.120583, 8.599218] },
    Status: 'Under way using engine',
    RoT: 0.0,
    SoG: 0.0,
    Heading: 55,
  },
];

const singleMessage = {
  _id: Math.floor(Math.random() * 100).toString(),
  Timestamp: '2020-11-18T00:00:00.000+0000',
  Class: 'Class A',
  MMSI: 1111,
  MsgType: 'position_report',
  Position: { type: 'Point', coordinates: [57.120583, 8.599218] },
  Status: 'Under way using engine',
  RoT: 0.0,
  SoG: 0.0,
  Heading: 55,
};

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

module.exports = {
  batch,
  singleMessage,
  vesselInfo,
  readPorts,
};
