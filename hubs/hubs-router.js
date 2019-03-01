const express = require('express');

const Hubs = require('./hubs-model.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const hubs = await Hubs.find(req.query);
    res.status(200).json(hubs);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the hubs',
    });
  }
});

router.get('/api/hubs', async (req, res) => {
  try {
    const hubs = await Hubs.find(req.query);
    res.status(200).json(hubs);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the hubs',
    });
  }
});

router.get(':id', async (req, res) => {
  try {
    const hub = await Hubs.findById(req.params.id);

    if (hub) {
      res.status(200).json(hub);
    } else {
      res.status(404).json({ message: 'Hub not found' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the hub',
    });
  }
});


router.delete(':id', async (req, res) => {
  try {
    const count = await Hubs.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: 'The hub has been nuked' });
    } else {
      res.status(404).json({ message: 'The hub could not be found' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error removing the hub',
    });
  }
});

router.put(':id', async (req, res) => {
  try {
    const hub = await Hubs.update(req.params.id, req.body);
    if (hub) {
      res.status(200).json(hub);
    } else {
      res.status(404).json({ message: 'The hub could not be found' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error updating the hub',
    });
  }
});

//add endpoint get all messages

router.get('/:id/messages', async (req, res) =>{
const { id } = req.params;

  try{
    const hub = await Hubs.findById(id);

    if(hub){

    const messages = await 
    Hubs.findHubMessages(id)
    res.json(messages);
    }else{
      res.status(400).json({err: 'invalid hub id'});
    }
  }catch (e) {
    res.status(500).json({err: e});
  }

})


//add endpoint for adding new messages to a hub

router.post('/:id/messages', async (req, res) =>{
  const newMessage = req.body;
  newMessage.param_id = req.params.id;
  
    try{
      const message = await Hubs.addMessage(newMessage);
        res.status(201).json(message)     
    }catch (e) {
      res.status(500).json({err: e});
    }
  
  })
  


module.exports = router;