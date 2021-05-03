var assert = require('chai').assert;
const qr = require('../DAO');
const fixtures = require('../fixtures');
const insertData = require('../Data/sample_input.json');

const {
  insertTestData,
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
} = qr;

qr.stub = true;

describe('insertData', () => {
  before(() => {
    it('Insert all data', async () => {
      const test = await insertTestData();
    }).timeout(8000);
  });
});

/**
 * Insert a batch of AIS messages (Static Data and/or Position Reports) (1)
 *
 * @params - none
 *
 * Data - Array of (0,n) message documents
 *
 * @returns Number of insertions
 */
describe('insertAISBatch', () => {
  it('Tests insertion of a batch of AIS messages (Integration Test)', async () => {
    // Test json file insertion
    const testInsertions = await insertAISBatch(insertData);
    assert.equal(testInsertions, insertData.length);

    const res = await insertAISBatch(fixtures.batch);
    assert.equal(fixtures.batch.length, res);
  }).timeout(8000);
});
describe('insertAISBatch', () => {
  it('Tests insertion of a batch of AIS messages (Unit Test)', async () => {
    const testInsertions = await insertAISBatch(insertData);
    assert.isArray(insertData);
    assert.equal(testInsertions, 500);
  }).timeout(8000);
});

/**
 * Insert an AIS message (Position Report or Static Data) (2)
 *
 * @params - none
 *
 * Data - Message Document
 *
 * @returns 1/0 for Success/Failure
 */
describe('insertSingleAIS', () => {
  it('Tests insertion of single AIS message (Integration Test)', async () => {
    if (!qr.stub) {
      const res = await insertSingleAIS();
      assert.isString(res);
      assert.equal('1', res);
    }
  });
});
describe('insertSingleAIS', () => {
  it('Tests insertion of single AIS message (Unit Test)', async () => {
    if (qr.stub) {
      const unit = await insertSingleAIS();
      assert.isNotEmpty(unit);
    }
  });
});

/**
 * Delete all AIS messages whose timestamp is more than 5 minutes older than current time (1)
 *
 * @params - Current time, Timestamp
 *
 * Data - N/A
 *
 * @returns Number of Deletions
 */
describe('deleteAIS', () => {
  it('Test deleting AIS messages older than 5 minutes (Integration Test)', async () => {
    if (!qr.stub) {
      const res = await deleteAIS('1900-11-18T04:10:00.000+0000');
      assert.equal(1, res);
    }
  }).timeout(10000);
});

describe('deleteAIS', () => {
  it('Test deleting AIS messages older than 5 minutes (Unit Test)', async () => {
    if (qr.stub) {
      const res = await deleteAIS(358923);
      assert.equal(res, 'Parameter must be a date string');
    }
  }).timeout(10000);
});

/**
 * Read all most recent ship positions (1)
 *
 * @params - None
 *
 * Data - N/A
 *
 * @returns Array of ship documents
 */
describe('readAllPositions', () => {
  it('Test reading of all recent ship positions (Integration Test)', async () => {
    if (!qr.stub) {
      const res = await readAllPositions();
      assert.deepEqual(res[0], fixtures.allRecentShipPositions);
    }
  }).timeout(15000);
});
describe('readAllPositions', () => {
  it('Test reading of all recent ship positions (Unit Test)', async () => {
    if (qr.stub) {
      const res = await readAllPositions();
      assert.isNotEmpty(res);
    }
  }).timeout(15000);
});

/**
 * Read most recent position of given MMSI (1)
 *
 * @params - MMSI
 *
 * Data - N/A
 *
 * @returns Position document of the form {"MMSI": ..., "lat": ..., "long": ..., "IMO": ... }
 */
describe('readSinglePosition', () => {
  it('Test read of most recent ship position (Integration Test)', async () => {
    if (!qr.stub) {
      assert.isObject(fixtures.mostRecentPosition);
      const res = await readSinglePosition(219022256);
      assert.deepEqual(res, fixtures.mostRecentPosition);
      assert.isObject(res);
      const error = await readSinglePosition('1234455');
      assert.equal(error, 'MMSI must be an integer');
    }
  });
});

describe('readSinglePosition', () => {
  it('Test read of most recent ship position (Unit Test)', async () => {
    if (qr.stub) {
      const res = await readSinglePosition(219022256);
      assert.isNotNull(res);
    }
  });
});

/**
 * Read permanent or transient vessel information matching the given MMSI, and 0 or more additional criteria: IMO, Name, CallSign (1)
 *
 * @params - MMSI (optional: IMO, Name, callsign)
 *
 * Data - N/A
 *
 * @returns a Vessel document, with available and/or relevant properties.
 */
describe('readVesselInfo', () => {
  it('Test read vessel information (Integration Test)', async () => {
    if (!qr.stub) {
      //Test all specific parameters
      const res = await readVesselInfo(265011000, 8616087, 'SOFIA', 'SBEN');
      assert.isArray(res);

      //Test minimal parameters
      const mmsi = await readVesselInfo(219022323);
      assert.isArray(mmsi);
      assert.deepEqual(mmsi, fixtures.vessleInfoMMSI);
    }
  }).timeout(5000);
});

describe('readVesselInfo', () => {
  it('Test read vessel information (Unit Test)', async () => {
    //Test minimal parameters
    const mmsiCheck = await readVesselInfo('265011000');
    assert.equal(mmsiCheck, 'Parameter must be an integer');
  }).timeout(5000);
});

/**
 * Read all most recent ship positions in the given tile (2)
 *
 * @params - Tile ID
 *
 * Data - N/A
 *
 * @returns Array of ship documents
 */
describe('readRecentPosition', () => {
  it('Test reading of ship positions in given tile (Integration Test)', async () => {
    if (!qr.stub) {
      const res = await readRecentPosition(1);
      console.log(res);
      assert.equal(res.count, 628381);
      assert.isArray(res);
    }
  }).timeout(15000);
});

describe('readRecentPosition', () => {
  it('Test reading of ship positions in given tile (Unit Test)', async () => {
    const res = await readRecentPosition(1);
    assert.isNotNull(res);
  }).timeout(15000);
});

/**
 * Read all ports matching the given name and (optional) country (2)
 *
 * @params - Port name, Country (optional)
 *
 * Data - N/A
 *
 * @returns Array of port documents
 */
describe('readAllPorts', () => {
  it('Test read of ports matching given name and country (Integration Test)', async () => {
    if (!qr.stub) {
      const res = await readAllPorts('Frederikshavn', 'Denmark');
      assert.isArray(res);
      assert.deepEqual(res, fixtures.readPorts);
    }
  });
});

describe('readAllPorts', () => {
  it('Test read of ports matching given name and country (Unit Test)', async () => {
    if (qr.stub) {
      const res = await readAllPorts(1);
      assert.equal(res, 'Parameters must be strings');
    }
  });
});

/**
 * Read all ship positions in the tile of scale 3 containing the given port (2)
 *
 * @params - Port Name, Country
 *
 * Data - N/A
 *
 * @returns If unique matching port: Array of Position documents (see above). Otherwise: an Array of Port documents.
 */
describe('tileShipPosition', () => {
  it('Test read of all ship positions in tile of scale 3 containing a given port (Integration Test)', async () => {
    if (!qr.stub) {
      const res = await tileShipPositions('Sweden', 'Halmstad');
      assert.isArray(res);
      assert.equal(res.length, 814);
      //Test for invalid parameters
      const error = await tileShipPositions(321321, 321321);
      assert.equal(error, 'Parameters must be strings');
    }
  });
});

describe('tileShipPosition', () => {
  it('Test read of all ship positions in tile of scale 3 containing a given port (Unit Test)', async () => {
    if (qr.stub) {
      const res = await tileShipPositions(1, 1);
      assert.equal(res, 'Parameters must be strings');
    }
  });
});

/**
 * Read last 5 positions of given MMSI
 *
 * @params - MMSI
 *
 * Data - N/A
 *
 * @returns Document of the form {MMSI: ..., Positions: [{"lat": ..., "long": ...}, ...], "IMO": ... }
 */
describe('readFivePositions', () => {
  it('Read last 5 positions of given MMSI (Integration Test)', async () => {
    if (!qr.stub) {
      const res = await readFivePositions(304858000);
      assert.isObject(res);
      assert.deepEqual(res, fixtures.fivePositions);

      const error = await readFivePositions('123456');
      assert.equal(error, 'Parameter must be an integer');
    }
  });
});

describe('readFivePositions', () => {
  it('Read last 5 positions of given MMSI (Unit Test)', async () => {
    if (qr.stub) {
      const error = await readFivePositions('123456');
      assert.equal(error, 'Parameter must be an integer');
    }
  });
});

/**
 * Read most recents positions of ships headed to port with given Id (4)
 *
 * @params - Port ID
 *
 * Data N/A
 *
 * @returns - Array of of Position documents of the form {"MMSI": ..., "lat": ..., "long": ..., "IMO": ...}
 */
describe('recentPositionsToPort', () => {
  it('Read most recents positions of ships headed to port with given Id (Integration Test)', async () => {
    if (!qr.stub) {
      const res = await recentPositionsToPort('OXELOSUND');
      assert.isArray(fixtures.recentPositionsToPortFixture);
      assert.deepEqual(res[0], fixtures.recentPositionsToPortFixture[0]);

      const error = await recentPositionsToPort(1234);
      assert.equal(error, 'Parameter must be a string');
    }
  }).timeout(8000);
});

describe('recentPositionsToPort', () => {
  it('Read most recents positions of ships headed to port with given Id (Unit Test)', async () => {
    if (qr.stub) {
      assert.isArray(fixtures.recentPositionsToPortFixture);
      const error = await recentPositionsToPort(1234);
      assert.equal(error, 'Parameter must be a string');
    }
  }).timeout(8000);
});

/**
 * Read most recent positions of ships headed to given port (as read from static data, or user input) (4)
 *
 * @params - Port Name, Country
 *
 * Data - N/A
 *
 * @returns - If unique matching port: array of of Position documents of the form {"MMSI": ..., "lat": ..., "long": ..., "IMO": ...} Otherwise: an Array of Port documents.
 */
describe('readPositionToPortFromStatic', () => {
  it('Read most recent positions of ships headed to given port (as read from static data, or user input) (Integration Test)', async () => {
    if (!qr.stub) {
      const portName = await readPositionToPortFromStatic('OXELOSUND', '');
      assert.isArray(fixtures.recentPositionsToPortFixture);
      assert.deepEqual(portName[0], fixtures.recentPositionsToPortFixture[0]);

      const ports = await readPositionToPortFromStatic('', 'Denmark');
      assert.isArray(ports);

      const both = await readPositionToPortFromStatic('OXELOSUND', 'Denmark');
      assert.isArray(both);
    }
  });
});

describe('readPositionToPortFromStatic', () => {
  it('Read most recent positions of ships headed to given port (as read from static data, or user input) (Unit Test)', async () => {
    if (qr.stub) {
      const error = await readPositionToPortFromStatic(1, 2);
      assert.equal(error, 'Parameters must be strings');
    }
  });
});

/**
 * Given a background map tile for zoom level 1 (2), find the 4 tiles of zoom level 2 (3) that are contained in it;
 *
 * @params - Map Tile ID
 *
 * Data - N/A
 *
 * @returns - Array of map tile description documents
 */
describe('backgroundTileMap', () => {
  it('Given a background map tile for zoom level 1 (2), find the 4 tiles of zoom level 2 (3) that are contained in it (Integration Test)', async () => {
    if (!qr.stub) {
      const res = await backgroundMapTile(5237);
      assert.deepEqual(res, fixtures.backgroundMapTileData);

      const error = await backgroundMapTile('5237');
      assert.equal(error, 'Parameter must be an integer');
    }
  });
});

describe('backgroundTileMap', () => {
  it('Given a background map tile for zoom level 1 (2), find the 4 tiles of zoom level 2 (3) that are contained in it (Unit Test)', async () => {
    if (qr.stub) {
      const res = await backgroundMapTile('5237');
      assert.equal(res, 'Parameter must be an integer');
    }
  });
});

/**
 * Given a tile Id, get the actual tile (a PNG file) (4)
 *
 * @params - Map Tile ID
 *
 * Data - N/A
 *
 * @returns - Binary Data
 */
describe('getTilePNG', () => {
  it('Given a tile Id, get the actual tile (a PNG file) (Integration Test) ', async () => {
    if (!qr.stub) {
      const res = await getTilePNG(1);
      assert.isNotEmpty(res);
      assert.equal(res.toString(), fixtures.binary);

      const error = await getTilePNG('1');
      assert.equal(error, 'Parameter must be an integer');
    }
  });
});

describe('getTilePNG', () => {
  it('Given a tile Id, get the actual tile (a PNG file) (Unit Test) ', async () => {
    if (qr.stub) {
      const error = await getTilePNG('1');
      assert.equal(error, 'Parameter must be an integer');
    }
  });
});
