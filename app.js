const express = require('express');
const mongoose = require('mongoose');
const app = express();

const port = process.env.PORT || 3500;
app.listen(port,()=>{
    console.log(`Server started on port ${port}`);
});