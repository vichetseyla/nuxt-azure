// server/plugins/mssql.ts
export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('close', async () => {
    console.log('Closing MSSQL Connection Pool...');
    await closePool();
  });
});