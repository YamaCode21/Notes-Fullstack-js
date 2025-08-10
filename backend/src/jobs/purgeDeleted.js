const cron = require('node-cron');
const db = require("../db");

cron.schedule('*/10 * * * *', async () => {
  await db('notes')
    .whereNotNull('deleted_at')
    .andWhere('deleted_at', '<', new Date(Date.now() - 24 * 60 * 60 * 1000))
    .del();
    console.log('Notas viejas purgadas:', new Date());
})