const MongoClient = require('mongodb').MongoClient;
const fixtures = require('./fixtures');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'projectData';

stub = false;

/**
 * Insert a batch of AIS messages (Static Data and/or Position Reports) (1)
 *
 * @params - none
 *
 * Data - Array of (0,n) message documents
 *
 * @returns Number of insertions
 */
const insertAISBatch = async (vesselBatch) => {
  const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });
  try {
    if (this.stub) {
      return vesselBatch.length;
    }
  } catch (e) {
    return -1;
  }

  if (!this.stub) {
    try {
      await client.connect();
      const ais = client.db(dbName).collection('ais');
      await vesselBatch.map((batch) => ais.insertOne(batch));
      return vesselBatch.length;
    } finally {
      client.close();
    }
  }
};

/**
 * Insert an AIS message (Position Report or Static Data) (2)
 *
 * @params - none
 *
 * Data - Message Document
 *
 * @returns 1/0 for Success/Failure
 */
const insertSingleAIS = async () => {
  const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });
  try {
    if (this.stub) {
      return fixtures.singleMessage;
    }
  } catch (error) {
    console.log(error);
  }
  if (!this.stub) {
    try {
      await client.connect();
      try {
        const ais = client.db(dbName).collection('ais');
        await ais.insertOne(fixtures.singleMessage);
        return '1';
      } catch (error) {
        console.log(error);
        return '0';
      }
    } finally {
      client.close();
    }
  }
};

/**
 * Delete all AIS messages whose timestamp is more than 5 minutes older than current time (1)
 *
 * @params - Current time, Timestamp
 *
 * Data - N/A
 *
 * @returns Number of Deletions
 *
 */
const deleteAIS = async (currentTime, timestamp) => {
  const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });
  try {
    if (this.stub) {
      return fixtures.singleMessage;
    }
  } catch (error) {
    console.log(error);
  }
  if (!this.stub) {
    try {
      currentTime = Date.now();
      await client.connect();
      const ais = client.db(dbName).collection('ais');
      const data = await ais
        .find({
          Timestamp: {
            $gt: new Date(currentTime - 5 * 60 * 1000),
          },
        })
        .count();
      console.log(data);
      return data;
    } finally {
      client.close();
    }
  }
};

/**
 * Read all most recent ship positions (1)
 *
 * @params - None
 *
 * Data - N/A
 *
 * @returns Array of ship documents
 */
const readAllPositions = async () => {
  const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });
  try {
    if (this.stub) {
      return fixtures.allRecentShipPositions;
    }
  } catch (error) {
    console.log(error);
  }
  if (!this.stub) {
    try {
      client.connect();
      const ais = client.db(dbName).collection('ais');
      const ships = await ais
        .aggregate([{ $sort: { Timestamp: -1 } }], { allowDiskUse: true })
        .project({
          _id: 0,
          MMSI: 1,
          Position: {
            lat: { $arrayElemAt: ['$Position.coordinates', 0] },
            long: { $arrayElemAt: ['$Position.coordinates', 1] },
          },
          IMO: 1,
        })
        .toArray();
      return ships;
    } finally {
      client.close();
    }
  }
};

/**
 * Read most recent position of given MMSI (1)
 *
 * @params - MMSI
 *
 * Data - N/A
 *
 * @returns Position document of the form {"MMSI": ..., "lat": ..., "long": ..., "IMO": ... }
 */
const readSinglePosition = async (mmsi) => {
  const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });
  try {
    if (this.stub) {
      return mmsi;
    }
  } catch (error) {
    console.log(error);
  }
  if (!this.stub) {
    try {
      client.connect();
      if (Number.isInteger(mmsi) && mmsi !== null) {
        const ais = client.db(dbName).collection('ais');
        const ships = await ais
          .aggregate(
            [{ $match: { MMSI: mmsi } }, { $sort: { Timestamp: -1 } }],
            {
              allowDiskUse: true,
            }
          )
          .project({ _id: 0 })
          .limit(1)
          .toArray();
        if (ships[0]['IMO']) {
          shipDocument = {
            MMSI: ships[0]['MMSI'],
            lat: ships[0]['Position']['coordinates'][0],
            long: ships[0]['Position']['coordinates'][1],
            IMO: ships[0]['IMO'],
          };
        }
        shipDocument = {
          MMSI: ships[0]['MMSI'],
          lat: ships[0]['Position']['coordinates'][0],
          long: ships[0]['Position']['coordinates'][1],
        };
        return shipDocument;
      }
      return 'MMSI must be an integer';
    } finally {
      client.close();
    }
  }
};

/**
 * Read permanent or transient vessel information matching the given MMSI, and 0 or more additional criteria: IMO, Name, CallSign (1)
 *
 * @params - MMSI (optional: IMO, Name, callsign)
 *
 * Data - N/A
 *
 * @returns a Vessel document, with available and/or relevant properties.
 */
const readVesselInfo = async (mmsi, imo, name, callsign) => {
  const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });
  if (Number.isInteger(mmsi)) {
    if (this.stub) {
      const searchBy = {
        mmsi,
        imo: imo ? imo : null,
        name: name ? name : '',
        callsign: callsign ? callsign : '',
      };
      return searchBy;
    }

    try {
      await client.connect();
      const ais = client.db(dbName).collection('ais');
      const res = await ais
        .find({
          $and: [
            {
              $or: [{ IMO: imo }, { Name: name }, { Callsign: callsign }],
            },
            { MMSI: mmsi },
          ],
        })
        .project({
          _id: 0,
          MMSI: 1,
          Position: {
            lat: { $arrayElemAt: ['$Position.coordinates', 0] },
            long: { $arrayElemAt: ['$Position.coordinates', 1] },
          },
          IMO: 1,
        })
        .toArray();
      return res;
    } finally {
      client.close();
    }
  }
  return 'Parameter must be an integer';
};

/**
 * Read all most recent ship positions in the given tile (2)
 *
 * @params - Tile ID
 *
 * Data - N/A
 *
 * @returns Array of ship documents
 */
const readRecentPosition = async (tileId) => {
  const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });
  try {
    if (this.stub) {
      return tileId;
    }
  } catch (e) {
    return -1;
  }
  if (!this.stub) {
    try {
      await client.connect();
      const tiles = client.db(dbName).collection('mapviews');
      const res = await tiles
        .aggregate([
          { $match: { id: tileId } },
          {
            $project: {
              _id: 0,
              north: 1,
              east: 1,
              south: 1,
              west: 1,
            },
          },
        ])
        .toArray();
      const north = res[0].north;
      const east = res[0].east;
      const south = res[0].south;
      const west = res[0].west;

      const ais = client.db(dbName).collection('ais');
      const positionReport = await ais
        .find(
          {
            $and: [
              {
                'Position.coordinates.1': {
                  $lte: east,
                },
              },
              {
                'Position.coordinates.1': {
                  $gte: west,
                },
              },
              {
                'Position.coordinates.0': {
                  $lte: north,
                },
              },
              {
                'Position.coordinates.0': {
                  $gte: south,
                },
              },
            ],
          },
          {
            allowDiskUse: true,
          }
        )
        .project({
          _id: 0,
          MMSI: 1,
          Position: {
            lat: { $arrayElemAt: ['$Position.coordinates', 0] },
            long: { $arrayElemAt: ['$Position.coordinates', 1] },
          },
          IMO: 1,
        })
        .sort({ Timestamp: -1 })
        .toArray();
      return positionReport;
    } finally {
      client.close();
    }
  }
};

/**
 * Read all ports matching the given name and (optional) country (2)
 *
 * @params - Port name, Country (optional)
 *
 * Data - N/A
 *
 * @returns Array of port documents
 */
const readAllPorts = async (portName, portCountry) => {
  const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });
  if (typeof portName == 'string' && typeof portCountry == 'string') {
    try {
      if (this.stub) {
        return portName;
      }
    } catch (e) {
      return -1;
    }
    if (!this.stub) {
      try {
        await client.connect();
        const ports = client.db(dbName).collection('ports');
        const res = await ports
          .find({
            $and: [
              {
                $or: [{ country: portCountry }],
              },
              { port_location: portName },
            ],
          })
          .project({ _id: 0 })
          .toArray();
        return res;
      } finally {
        client.close();
      }
    }
  }
  return 'Parameters must be strings';
};

/**
 * Read all ship positions in the tile of scale 3 containing the given port (2)
 *
 * @params - Port Name, Country
 *
 * Data - N/A
 *
 * @returns If unique matching port: Array of Position documents (see above). Otherwise: an Array of Port documents.
 */
const tileShipPositions = async (portName, portCountry) => {
  const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });
  try {
    if (typeof portName === 'string' && typeof portCountry === 'string') {
      try {
        if (this.stub) {
          return portName;
        }
      } catch (e) {
        return -1;
      }
      if (!this.stub) {
        await client.connect();
        const ports = client.db(dbName).collection('ports');
        const res = await ports
          .aggregate([
            { $match: { country: 'Sweden', port_location: 'Halmstad' } },
            {
              $lookup: {
                from: 'mapviews',
                localField: 'mapview_3',
                foreignField: 'id',
                as: 'mapview_id',
              },
            },
            {
              $project: {
                _id: 0,
                mapview_id: { north: 1, east: 1, south: 1, west: 1 },
              },
            },
          ])
          .toArray();
        let tileCoordinates = [];
        res.forEach((x) => {
          Object.values(x).forEach((y) => {
            Object.values(y[0]).forEach((d) => {
              tileCoordinates.push(d);
            });
          });
        });
        let north = tileCoordinates[3];
        let east = tileCoordinates[2];
        let south = tileCoordinates[1];
        let west = tileCoordinates[0];

        const ais = client.db(dbName).collection('ais');
        const positionReport = await ais
          .find({
            $and: [
              {
                'Position.coordinates.1': {
                  $lt: east,
                },
              },
              {
                'Position.coordinates.1': {
                  $gt: west,
                },
              },
              {
                'Position.coordinates.0': {
                  $lt: north,
                },
              },
              {
                'Position.coordinates.0': {
                  $gt: south,
                },
              },
            ],
          })
          .toArray();
        return positionReport;
      }
    }
    return 'Parameters must be strings';
  } finally {
    client.close();
  }
};

/**
 * Read last 5 positions of given MMSI
 *
 * @params - MMSI
 *
 * Data - N/A
 *
 * @returns Document of the form {MMSI: ..., Positions: [{"lat": ..., "long": ...}, ...], "IMO": ... }
 */
const readFivePositions = async (mmsi) => {
  const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });
  try {
    if (Number.isInteger(mmsi) && mmsi !== null) {
      try {
        if (this.stub) {
          return mmsi;
        }
      } catch (e) {
        return -1;
      }
      if (!this.stub) {
        await client.connect();
        const ais = client.db(dbName).collection('ais');
        const ships = await ais
          .aggregate(
            [{ $match: { MMSI: mmsi } }, { $sort: { Timestamp: -1 } }],
            {
              allowDiskUse: true,
            }
          )
          .project({
            _id: 0,
            MMSI: 1,
            Position: {
              lat: { $arrayElemAt: ['$Position.coordinates', 0] },
              long: { $arrayElemAt: ['$Position.coordinates', 1] },
            },
            IMO: 1,
          })
          .limit(5)
          .toArray();
        if (ships[0]['IMO']) {
          shipDocument = {
            MMSI: ships[0]['MMSI'],
            Positions: [
              {
                lat: ships[0]['Position']['lat'],
                long: ships[0]['Position']['long'],
              },
              {
                lat: ships[1]['Position']['lat'],
                long: ships[1]['Position']['long'],
              },
              {
                lat: ships[2]['Position']['lat'],
                long: ships[2]['Position']['long'],
              },
              {
                lat: ships[3]['Position']['lat'],
                long: ships[3]['Position']['long'],
              },
              {
                lat: ships[4]['Position']['lat'],
                long: ships[4]['Position']['long'],
              },
            ],
            IMO: ships[0]['IMO'],
          };
        }
        shipDocument = {
          MMSI: ships[0]['MMSI'],
          Positions: [
            {
              lat: ships[0]['Position']['lat'],
              long: ships[0]['Position']['long'],
            },
            {
              lat: ships[1]['Position']['lat'],
              long: ships[1]['Position']['long'],
            },
            {
              lat: ships[2]['Position']['lat'],
              long: ships[2]['Position']['long'],
            },
            {
              lat: ships[3]['Position']['lat'],
              long: ships[3]['Position']['long'],
            },
            {
              lat: ships[4]['Position']['lat'],
              long: ships[4]['Position']['long'],
            },
          ],
        };
        return shipDocument;
      }
    }
    return 'Parameter must be an integer';
  } finally {
    client.close();
  }
};

/**
 * Read most recents positions of ships headed to port with given Id (4)
 *
 * @params - Port ID
 *
 * Data N/A
 *
 * @returns - Array of of Position documents of the form {"MMSI": ..., "lat": ..., "long": ..., "IMO": ...}
 */
const recentPositionsToPort = async (portId) => {
  const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });
  try {
    if (typeof portId === 'string' && portId !== '') {
      try {
        if (this.stub) {
          return portId;
        }
      } catch (e) {
        return -1;
      }
      if (!this.stub) {
        client.connect();
        const ais = client.db(dbName).collection('ais');
        const ships = await ais
          .aggregate([{ $match: { Destination: portId } }])
          .project({ _id: 0, MMSI: 1 })
          .toArray();
        for (let i = 0; i < ships.length; i++) {
          const positions = await ais
            .aggregate([{ $match: { MMSI: ships[i].MMSI } }])
            .project({
              _id: 0,
              MMSI: 1,
              lat: { $arrayElemAt: ['$Position.coordinates', 0] },
              long: { $arrayElemAt: ['$Position.coordinates', 1] },
            })
            .sort({ Timestamp: -1 })
            .toArray();
          return positions;
        }
      }
    }
    return 'Parameter must be a string';
  } finally {
    client.close();
  }
};

/**
 * Read most recent positions of ships headed to given port (as read from static data, or user input) (4)
 *
 * @params - Port Name, Country
 *
 * Data - N/A
 *
 * @returns - If unique matching port: array of of Position documents of the form {"MMSI": ..., "lat": ..., "long": ..., "IMO": ...} Otherwise: an Array of Port documents.
 */
const readPositionToPortFromStatic = async (portName, country) => {
  const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });
  try {
    if (typeof portName == 'string' && typeof country == 'string') {
      try {
        if (this.stub) {
          return portName;
        }
      } catch (e) {
        return -1;
      }
      if (!this.stub) {
        client.connect();
        if (portName && country) {
          const ais = client.db(dbName).collection('ais');
          const ships = await ais
            .aggregate([{ $match: { Destination: portName } }])
            .project({ _id: 0, MMSI: 1 })
            .toArray();
          for (let i = 0; i < ships.length; i++) {
            const positions = await ais
              .aggregate([{ $match: { MMSI: ships[i].MMSI } }])
              .project({
                _id: 0,
                MMSI: 1,
                lat: { $arrayElemAt: ['$Position.coordinates', 0] },
                long: { $arrayElemAt: ['$Position.coordinates', 1] },
              })
              .sort({ Timestamp: -1 })
              .toArray();
            return positions;
          }
        }
        if (portName && country === '') {
          const ais = client.db(dbName).collection('ais');
          const ships = await ais
            .aggregate([{ $match: { Destination: portName } }])
            .project({ _id: 0, MMSI: 1 })
            .toArray();
          for (let i = 0; i < ships.length; i++) {
            const positions = await ais
              .aggregate([{ $match: { MMSI: ships[i].MMSI } }])
              .project({
                _id: 0,
                MMSI: 1,
                lat: { $arrayElemAt: ['$Position.coordinates', 0] },
                long: { $arrayElemAt: ['$Position.coordinates', 1] },
              })
              .sort({ Timestamp: -1 })
              .toArray();
            return positions;
          }
        }
        if (country && portName === '') {
          const ports = client.db(dbName).collection('ports');
          const portCountries = await ports
            .find({ country: country })
            .project({ _id: 0 })
            .toArray();
          return portCountries;
        }
      }
    }
    return 'Parameters must be strings';
  } finally {
    client.close();
  }
};

/**
 * Given a background map tile for zoom level 1 (2), find the 4 tiles of zoom level 2 (3) that are contained in it;
 *
 * @params - Map Tile ID
 *
 * Data - N/A
 *
 * @returns - Array of map tile description documents
 */
const backgroundMapTile = async () => {
  const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });
  try {
    return new Promise((resolve) => {
      resolve('NOT IMPLEMENTED');
    });
  } finally {
    client.close();
  }
};

/**
 * Given a tile Id, get the actual tile (a PNG file) (4)
 *
 * @params - Map Tile ID
 *
 * Data - N/A
 *
 * @returns - Binary Data
 */
const getTilePNG = async (tileId) => {
  const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });
  try {
    if (Number.isInteger(tileId)) {
      try {
        if (this.stub) {
          return tileId;
        }
      } catch (e) {
        return -1;
      }
      if (!this.stub) {
        await client.connect();
        const mapviews = client.db(dbName).collection('mapviews');
        const tile = await mapviews.findOne(
          { id: tileId },
          { projection: { _id: 0, filename: 1 } }
        );
        imageBinary = tile.filename
          .split('')
          .map((char) => {
            return char.charCodeAt(0).toString(2);
          })
          .join(' ');
        return imageBinary;
      }
    }
    return 'Parameter must be an integer';
  } finally {
    client.close();
  }
};

module.exports = {
  insertAISBatch,
  insertSingleAIS,
  deleteAIS,
  readAllPositions,
  readSinglePosition,
  readVesselInfo,
  readRecentPosition,
  readAllPorts,
  tileShipPositions,
  readFivePositions,
  recentPositionsToPort,
  readPositionToPortFromStatic,
  backgroundMapTile,
  getTilePNG,
};

exports.stub = stub;
