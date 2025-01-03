const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello from Sourav");
});



module.exports = router;

// :3000/
// :3000/api/v1/ping