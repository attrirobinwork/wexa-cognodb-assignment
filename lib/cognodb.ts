import neo4j from 'neo4j-driver';

const URI = process.env.COGNODB_URI;
const USERNAME = process.env.COGNODB_USERNAME;
const PASSWORD = process.env.COGNODB_PASSWORD;

if (!URI || !USERNAME || !PASSWORD) {
    throw new Error('CognoDB environment variables are missing');
  }

  const driver = neo4j.driver(URI,neo4j.auth.basic(USERNAME,PASSWORD));

  export default driver;