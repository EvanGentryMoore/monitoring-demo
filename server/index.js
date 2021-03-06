const express = require('express')
const path = require('path')

const Rollbar = require("rollbar");
const rollbar = new Rollbar({
  accessToken: '2df36aea9d6c476f8b96334bacb661ec',
  captureUncaught: true,
  captureUnhandledRejections: true
});

const app = express()

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})
let students = []

app.post('/api/student', (req, res)=>{
    let {name} = req.body
    name = name.trim()

    students.push(name)

    rollbar.log('Student was added successfully', {author: 'Scott', type:'manual', student: name})

    res.status(200).send(students)
})
app.use(rollbar.errorHandler())

const port = process.env.PORT || 4545


// include and initialize the rollbar library with your access token

// record a generic message and send it to Rollbar
rollbar.log("Hello world!");

app.listen(port , () => console.log(`Running like a refrigerator on ${port}.`))