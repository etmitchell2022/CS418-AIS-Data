const MongoClient = require('mongodb').MongoClient;

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
    await client.connect();
    const ais = client.db(dbName).collection('ais');
    await vesselBatch.map((batch) => ais.insertOne(batch));
    return vesselBatch.length;
  } finally {
    client.close();
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
    return new Promise((resolve) => {
      resolve('NOT IMPLEMENTED');
    });
  } finally {
    client.close();
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
 */
const deleteAIS = async () => {
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
    return new Promise((resolve) => {
      resolve('NOT IMPLEMENTED');
    });
  } finally {
    client.close();
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
const readSinglePosition = async () => {
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
 * Read permanent or transient vessel information matching the given MMSI, and 0 or more additional criteria: IMO, Name, CallSign (1)
 *
 * @params - MMSI (optional: IMO, Name)
 *
 * Data - N/A
 *
 * @returns a Vessel document, with available and/or relevant properties.
 */
const readVesselInfo = async () => {
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
 * Read all most recent ship positions in the given tile (2)
 *
 * @params - Tile ID
 *
 * Data - N/A
 *
 * @returns Array of ship documents
 */
const readRecentPosition = async () => {
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
 * Read all ports matching the given name and (optional) country (2)
 *
 * @params - Port name, Country (optional)
 *
 * Data - N/A
 *
 * @returns Array of port documents
 */
const readAllPorts = async () => {
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
 * Read all ship positions in the tile of scale 3 containing the given port (2)
 *
 * @params - Port Name, Country
 *
 * Data - N/A
 *
 * @returns If unique matching port: Array of Position documents (see above). Otherwise: an Array of Port documents.
 */
const tileShipPositions = async () => {
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
  stub,
};
