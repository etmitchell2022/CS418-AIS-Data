var assert = require('chai').assert;
const qr = require('../DAO');
const fixures = require('./fixtures');

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
      assert.isArray(fixures.batch);
      assert.equal(fixures.batch.length, 3);
    }
    const res = await insertAISBatch(fixures.batch);
    assert.equal(fixures.batch.length, res);
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
      assert.isObject(fixures.singleMessage);
      assert.isNotEmpty(fixures.singleMessage);
    }
    const res = await insertSingleAIS(fixures.singleMessage);
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
    const res = await readAllPositions();
  });
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
    const res = await readSinglePosition();
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
    console.log(res);
  });
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
  });
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
    const res = await readAllPorts();
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
    const res = await tileShipPositions();
  });
});
