// server/utils/mssql.ts
import sql from 'mssql';
import { drizzle } from 'drizzle-orm/node-mssql';
const runtimeConfig = useRuntimeConfig();
let pool: sql.ConnectionPool | null = null;

const config: sql.config = {
  user: runtimeConfig.dbUser,
  password: runtimeConfig.dbPassword,
  database: runtimeConfig.dbName,
  server: runtimeConfig.dbHost,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true, // For Azure/Modern SQL Server
    //trustServerCertificate: true 
  }
};

export const getDB = async () => {
  if (!pool) {
    console.log('Creating new MSSQL connection pool...');
    pool = await new sql.ConnectionPool(config).connect();
  }
  
  // Drizzle expects the pool under the 'client' property
  return drizzle({ client: pool });
};

// Export the raw pool for direct teardown
export const closePool = async () => {
  if (pool) {
    await pool.close();
    pool = null;
  }
};