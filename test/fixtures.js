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

module.exports = {
  batch,
};
