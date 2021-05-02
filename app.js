
const express = require('express')
const { commands } = require('./command')

const app = express()

const port = 3000
app.configure(function () {
    app.use(express.bodyParser());
    app.use(app.router);
});

app.use(express.json())
app.get('/commands', (req, res) => {
    res.json(JSON.stringify(commands))
})

app.post('/action', (req, res) => {
    console.log(req)
    res.json(req.body)
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})