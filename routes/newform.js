// backend/routes/newfolder.js
const express = require("express");
const router = express.Router();
const { Forms } = require("../schema/newform.schema");
const authMiddleware = require("../middleware/auth");
router.post("/", authMiddleware, async (req, res) => {
    try {
        const userId = req.user; // Extract user ID from token middleware
        const newForm = new Forms({
            name: "Untitled Form", // Default name
            userId,
            fields: [],
            background: "default", // Default background
        });
        await newForm.save();
        res.status(200).json({ message: "newForm created successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: "NewForm not created" });
    }
})

// backend/routes/formRoutes.js
router.delete('/:id',authMiddleware , async (req, res) => {
    const { id } = req.params;
    try {
        const form = await Forms.findByIdAndDelete(id);
        if (!form) return res.status(404).json({ success: false, message: "Form not found" });
        res.status(200).json({ success: true, message: "Form deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});

router.get("/userId", authMiddleware, async (req, res) => {
    try {
        const userId = req.user; // Extract user ID from token middleware
        const forms = await Forms.find({ userId }); // Find all forms for the user
        res.status(200).json({ success: true, forms });
    } catch (error) {
        console.error("Error retrieving forms:", error);
        res.status(500).json({ success: false, message: "Failed to retrieve forms" });
    }
});



module.exports = router;