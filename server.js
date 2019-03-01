const express = require('express');

const HubsRouter = require('./hubs/hubs-router.js');

const server = express();

server.use('/api/hubs', HubsRouter)


server.get('/', (req, res) => {
  console.log('query', req.query);
  res.send(`
    <h2>Lambda Hubs API</h>
    <p>Welcome to the Lambda Hubs API</p>
  `);
});





// const  asyncAwaitEx = async (req, res) => {
//   Hubs.find({})
//   .then (hub => {

//   }).catch(err => {

//   })
//   //will nor work wirh an async method
//   const hubs=Hubs.find({})

//   //async await style
//   try{
//   const hubs = await Hubs.find({})
//   res.json(hubs);
//   }catch (e){
//   res.status(500).json(e);
//   }
// }






// add an endpoint that returns all the messages for a hub
// add an endpoint for adding new message to a hub


module.exports = server;