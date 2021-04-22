var assert = require('chai').assert;
const qr = require('../DAO');

qr.stub = true;

const { insertAISBatch } = qr;

describe('insertAISBatch', () => {
  it('Tests insertion of a batch of AIS messages', async () => {
      const res = await insertAISBatch()
  });
});
