const port = 3000

const TELLO_CMD_PORT = 8889
const TELLO_HOST = '192.168.10.1'
const express = require('express')
var cors = require('cors')
const { commands } = require('./command')
const { createSocket} = require('dgram')
const CommandParser = require('./CommandParser')
const Commander = require('./Commander')
const app = express()
app.use(cors())
const getSocket = ()=>{
    const socket = createSocket('udp4')
    socket.bind(TELLO_CMD_PORT)
    return socket
}
const socket = getSocket()
const cmder = new Commander(socket, TELLO_HOST, TELLO_CMD_PORT)

const getParser = ()=> {
    const cmdp = new CommandParser({
        onTakeoff: async () => {await cmder.sendTakeoff()},
        onLand: async () => {await cmder.sendLand()},
        onForward: async (dist) => {await cmder.sendForward(dist)},
        onBack: async (dist) => {await cmder.sendBack(dist)},
        onRight: async (dist) => {await cmder.sendRight(dist)},
        onLeft: async (dist) => {await cmder.sendLeft(dist)},
        onCw: async (dist) => {await cmder.sendCw(dist)},
        onCcw: async (dist) => {await cmder.sendCcw(dist)},
        onFlip: async () => {await cmder.sendFlip()},
        onBattery: async () => {await cmder.getBattery()}
    })
return cmdp;

}

(async function start(){
   
    await cmder.sendInitCommand()
    
    console.log(`Iniciando!`)
    socket.on('message', (msg)=>{
        console.log(`Dji tello: ${msg.toString()}`)
    })
    socket.on('error', (err)=>{
        console.log(`Dji tello ERROR: ${err}`)
    })
    socket.on('listening', ()=>{
        console.log(`Socket is listening!`)
    })    
    
})()

app.use(express.json())
app.get('/commands', (req, res) => {
    res.json(commands)
})

app.post('/action', (req, res) => {    
    if (req.body && req.body.command) {
        let command = req.body.command.toString()      
        if(!getParser().parseCommand(command)){
            if(command == 'exit'){
                console.log('Bye')
                process.exit(0)
            }
            console.log('Not a valid command')
        }
        console.log(req)
        res.json(command)
    }        
})

app.listen(port, () => {
    console.log(`Api tello app listening at http://localhost:${port}`)
})