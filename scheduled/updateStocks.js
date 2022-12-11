const cron = require('node-cron');
// const { spawn } = require('child_process');
const rp = require('request-promise');

const job = cron.schedule('* 1 * * *', async () => {
  console.log('pyapi wake up:');
  let res= await rp.get("https://qwantapi.herokuapp.com/health")
  console.log(res)

  res= await rp.get("https://kareus.herokuapp.com/health")
  console.log(res)
});
module.exports = job;
