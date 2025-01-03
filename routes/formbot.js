// backend/routes/formBotRoutes.js
const express = require('express');
const router = express.Router();
const { Formbot } = require('../schema/formbot.schema');
const authMiddleware = require('../middleware/auth');

//create a form
router.post('/create', authMiddleware, async (req, res) => {
    try {
      const { title } = req.body;
      const userId = req.user;
  
      const newForm = new Formbot({
        userId,
        title,
        components: [],
      });
  
      await newForm.save();
      res.status(201).json({ message: 'Form created successfully', form: newForm });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });
  
  //add component to form
  // router.post('/:formId/add-component', authMiddleware, async (req, res) => {
  //   try {
  //     const { formId } = req.params;
  //     const componentData = req.body;
  
  //     const form = await Formbot.findById(formId);
  //     if (!form) return res.status(404).json({ message: 'Form not found' });
  
  //     form.components.push(componentData);
  //     await form.save();
  
  //     res.status(200).json({ message: 'Component added successfully', form });
  //   } catch (error) {
  //     res.status(500).json({ message: 'Server error', error });
  //   }
  // });
  router.post('/:formId/component', async (req, res) => {
    const { formId } = req.params;
    const { type, category, content, placeholder, required, order } = req.body;
  
    const form = await Form.findById(formId);
    if (!form) return res.status(404).send({ success: false, message: 'Form not found' });
  
    const component = { type, category, content, placeholder, required, order };
    form.components.push(component);
  
    const updatedForm = await form.save();
    res.status(200).send({ success: true, form: updatedForm });
  });
  
   
  //fetch form
  router.get('/:formId', async (req, res) => {
    try {
      const { formId } = req.params;
  
      const form = await Formbot.findById(formId);
      if (!form) return res.status(404).json({ message: 'Form not found' });
  
      res.status(200).json({ form });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });

  //delete component
  router.delete('/:formId/component/:componentId', authMiddleware, async (req, res) => {
    try {
      const { formId, componentId } = req.params;
  
      const form = await Formbot.findById(formId);
      if (!form) return res.status(404).json({ message: 'Form not found' });
  
      form.components = form.components.filter((comp) => comp._id.toString() !== componentId);
      await form.save();
  
      res.status(200).json({ message: 'Component deleted successfully', form });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });

  //generate formbot link
  router.post('/:formId/generate-link', authMiddleware, async (req, res) => {
    try {
      const { formId } = req.params;
      const form = await Formbot.findById(formId);
      if (!form) return res.status(404).json({ message: 'Form not found' });
  
      const link = `${process.env.FRONTEND_URL}/form/${formId}`;
      form.link = link;
      await form.save();
  
      res.status(200).json({ message: 'Link generated successfully', link });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });
  module.exports = router;
  


  
  
  