const express = require('express');
const router = express.Router();

const contact = require('../models/contact');

router.get('/', async (req,res) => {
    const contacts = await  contact.find();

    res.json(contacts);
     
  });
router.post('/', async (req, res) =>{
  const Contact = new contact(req.body);
  await Contact.save();
  res.json({
    status: 'Contacto guardado'
  });


});

module.exports = router;
