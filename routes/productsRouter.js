const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Products Router')
})

module.exports = router;