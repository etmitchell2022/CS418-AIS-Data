const http = require('http');
const dao = require('./DAO');

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
} = dao;

const host = 'localhost';
const port = 8000;

/**
 * To run server, enter npm run server into terminal
 */
const server = http.createServer(async (req, res) => {
  const test = await readAllPorts('Frederikshavn', 'Denmark');
  res.writeHead(200, { 'Content-Type': 'application/json' });
  console.log(test);
  res.write(JSON.stringify(test));
  res.end();
});

server.listen(port, (error) => {
  if (error) {
    console.log(error);
  }
  console.log(`Server is running on port ${port}`);
});
