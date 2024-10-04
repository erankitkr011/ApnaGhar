const express = require('express');
const cors = require('cors')

require('dotenv').config();
const app = express();
app.use(express.json())
app.use(cors());
const PORT = process.env.PORT || 3000;
const dbConnect = require('./config/dbConnect');
dbConnect();

const {Router} = require('./routes/route')
app.use(Router)

app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`);
})

