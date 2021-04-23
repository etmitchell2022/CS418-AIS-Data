var assert = require('chai').assert;
const qr = require('../DAO');

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

describe('insertAISBatch', () => {
  it('Tests insertion of a batch of AIS messages', async () => {
    const res = await insertAISBatch();
  });
});

describe('insertSingleAIS', () => {
  it('Tests insertion of single AIS message', async () => {
    const res = await insertSingleAIS();
  });
});

describe('deleteAIS', () => {
  it('Test deleting AIS messages older than 5 minutes', async () => {
    const res = await deleteAIS();
  });
});

describe('readAllPositions', () => {
  it('Test reading of all recent ship positions', async () => {
    const res = await readAllPositions();
  });
});

describe('readSinglePosition', () => {
  it('Test read of most recent ship position', async () => {
    const res = await readSinglePosition();
  });
});

describe('readVesselInfo', () => {
  it('Test read vessel information', async () => {
    const res = await readVesselInfo();
  });
});

describe('readRecentPosition', () => {
  it('Test reading of ship positions in given tile', async () => {
    const res = await readRecentPosition();
  });
});

describe('readAllPorts', () => {
  it('Test read of ports matching given name and country', async () => {
    const res = await readAllPorts();
  });
});

describe('tileShipPosition', () => {
  it('Test read of all ship positions in tile of scale 3 containing a given port', async () => {
    const res = await tileShipPositions();
  });
});
