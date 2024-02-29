require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const port = process.env.SERVER_PORT

app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})