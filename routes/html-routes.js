const router = require("express").Router();
// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

router.get("/", (req, res) => {

res.sendFile(path.join(__dirname, "../public/index.html"));
});

router.get("/exercise", function(req, res) {
res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

module.exports = router;
