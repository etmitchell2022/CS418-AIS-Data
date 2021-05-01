var assert = require('chai').assert;
const qr = require('../DAO');
const fixtures = require('./fixtures');

qr.stub = true;

const {
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
  it('Tests insertion of a batch of AIS messages', async () => {
    if (qr.stub) {
      assert.isArray(fixtures.batch);
      assert.equal(fixtures.batch.length, 4);
    }
    const res = await insertAISBatch(fixtures.batch);
    assert.equal(fixtures.batch.length, res);
  });
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
  it('Tests insertion of single AIS message', async () => {
    if (qr.stub) {
      assert.isObject(fixtures.singleMessage);
      assert.isNotEmpty(fixtures.singleMessage);
    }
    const res = await insertSingleAIS(fixtures.singleMessage);
    assert.isString(res);
    assert.equal('1', res);
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
  it('Test deleting AIS messages older than 5 minutes', async () => {
    const res = await deleteAIS();
  });
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
  it('Test reading of all recent ship positions', async () => {
    if (qr.stub) {
      assert.isArray(fixtures.allRecentShipPositions);
    }
    const res = await readAllPositions();
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
  it('Test read of most recent ship position', async () => {
    if (qr.stub) {
      assert.isObject(fixtures.mostRecentPosition);
    }
    const res = await readSinglePosition(219022256);
    assert.deepEqual(res, fixtures.mostRecentPosition);
    assert.isObject(res);
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
  it('Test read vessel information', async () => {
    const res = await readVesselInfo(265011000, 8616087, 'SOFIA', 'SBEN');
    assert.isArray(res);
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
  it('Test reading of ship positions in given tile', async () => {
    const res = await readRecentPosition();
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
  it('Test read of ports matching given name and country', async () => {
    if (qr.stubs) {
      assert.isArray(fixtures.readPorts);
    }
    const res = await readAllPorts('Frederikshavn', 'Denmark');
    assert.isArray(res);
    assert.deepEqual(res, fixtures.readPorts);
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
  it('Test read of all ship positions in tile of scale 3 containing a given port', async () => {
    if (qr.stub) {
      assert.isArray(fixtures.tilePositions);
      assert.equal(3, fixtures.tilePositions.length);
    }
    const res = await tileShipPositions('Sweden', 'Halmstad');
    assert.isArray(res);
    assert.equal(res.length, 814);
    //Test for invalid parameters
    const error = await tileShipPositions(321321, 321321);
    assert.equal(error, 'Parameters must be strings');
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
  it('Read last 5 positions of given MMSI', async () => {
    if (qr.stub) {
      assert.isObject(fixtures.fivePositions);
      assert.isNotEmpty(fixtures.fivePositions);
    }
    const res = await readFivePositions(304858000);
    assert.isObject(res);
    assert.deepEqual(res, fixtures.fivePositions);

    const error = await readFivePositions('123456');
    assert.equal(error, 'Parameter must be an integer');
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
  it('Read most recents positions of ships headed to port with given Id', async () => {
    const res = await recentPositionsToPort();
  });
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
  it('Read most recent positions of ships headed to given port (as read from static data, or user input)', async () => {
    const res = await readPositionToPortFromStatic();
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
  it('Given a background map tile for zoom level 1 (2), find the 4 tiles of zoom level 2 (3) that are contained in it', async () => {
    const res = await backgroundMapTile();
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
  it('Given a tile Id, get the actual tile (a PNG file)', async () => {
    const res = await getTilePNG(1);
    assert.isNotEmpty(res);
    assert.equal(res.toString(), fixtures.binary);

    const error = await getTilePNG('1');
    assert.equal(error, 'Parameter must be an integer');

    const noTile = await getTilePNG(4380420489032);
    assert.equal(noTile, 'No tile found');
  });
});
