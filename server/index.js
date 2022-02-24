const express = require('express')
const path = require('path')

const app = express()

app.get('/', (req, res) => {
    res.sendFiles(path.join(__dirname, '../public/index.html'))
})

const port = process.env.PORT || 4545

// include and initialize the rollbar library with your access token
const Rollbar = require("rollbar");
const rollbar = new Rollbar({
  accessToken: '2df36aea9d6c476f8b96334bacb661ec',
  captureUncaught: true,
  captureUnhandledRejections: true
});

// record a generic message and send it to Rollbar
rollbar.log("Hello world!");

app.listen(port , () => console.log(`Running on ${port}, for the glory of the Klingon Empire`))