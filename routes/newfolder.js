// backend/routes/newfolder.js
const express = require('express');
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const {Folder} = require("../schema/newfolder.schema");
const {Forms}= require("../schema/newform.schema");

// Create a new folder
router.post('/userId', authMiddleware, async (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ success: false, message: "Folder name is required" });

    try {
        const userId = req.user;
        const newFolder = new Folder({ name, userId });
        await newFolder.save();
        res.status(201).json({ success: true, folder: newFolder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// Get all folders for a user
router.get('/userId', authMiddleware, async (req, res) => {
    try {
        const userId = req.user;
        const folders = await Folder.find({ userId }).populate('forms');
        res.status(200).json({ success: true, folders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// Add a form to a folder
router.post('/:folderId/add-form', authMiddleware, async (req, res) => {
    const { folderId } = req.folderId;
    const { formId } = req.body;

    try {
        const folder = await Folder.findById(folderId);
        if (!folder) return res.status(404).json({ success: false, message: "Folder not found" });

        const form = await Forms.findById(formId);
        if (!form) return res.status(404).json({ success: false, message: "Form not found" });

        folder.forms.push(formId);
        await folder.save();
        res.status(200).json({ success: true, folder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});
// backend/routes/folderRoutes.js
router.delete('/:folderId', authMiddleware, async (req, res) => {
    const {folderId}  = req.user;

    try {
        const folder = await Folder.findById(folderId);
        if (!folder) return res.status(404).json({ success: false, message: "Folder not found" });
        return folderId;

        // Optional: Delete associated forms
            //await Forms.deleteMany({ _id: { $in: folder.forms } });

        await folder.delete();
        res.status(200).json({ success: true, message: "Folder deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});



module.exports = router;
