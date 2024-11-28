const express = require('express');
const cors = require('cors')
const path = require('path');

require('dotenv').config();
const app = express();
app.use(express.json())
app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));
const PORT = process.env.PORT || 3000;
const dbConnect = require('./config/dbConnect');
dbConnect();

const {Router} = require('./routes/route')
app.use(Router);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`);
})

