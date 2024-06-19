const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Users Router')
})

module.exports = router;