import io, { Socket } from "socket.io-client"
import net from "net"
import SerialPort from "serialport"
import dgram from "dgram"
import { Buffer } from "buffer"
import config from "./config"
import shipState, { ShipData } from "./ShipState"
import protocol from "./protocol"

type ControlState = {
  state: number
}


//init
// const ioClient = io(config.socketIoServer)
const tcpClient = new net.Socket()
const serialPort = new SerialPort(config.serial.com, {
  autoOpen: false,
  baudRate: config.serial.baudRate
})
// const udpClient = dgram.createSocket("udp4");

// function connect() {
//   ioClient.on('connect', () => {
//     ioClient.emit('ship')
//     console.log("Socket Server connected")
//   })
//   ioClient.on('disconnect', () => console.log('Server disconnected!'))

// tcpClient.connect(config.tcp.port, config.tcp.server, function () {
//   console.log("Tcp Server Connected")
// })

// serialPort.open(function (err) {
//   if (err)
//     console.log(err)
//   console.log(`SerialPort ${config.serial.com} isOpen: ${serialPort.isOpen}`)
// })
// }

// function Reset() {
//   shipState.state = 2
//   tcpClient.write("9669")
// }

// function Start() {
//   shipState.state = 1
// }

// function Stop() {
//   shipState.state = 0
// }

// function init() {
//   connect()
//   ioClient.on("start", (data: ControlState) => {
//     switch (data.state) {
//       case 0:
//         Reset()
//       case 1:
//         Start()
//       case 2:
//         Stop()
//     }
//     ioClient.on("shipData", (data: ShipData) => {
//       shipState.shipData = data
//       if (shipState.state === 0)
//         tcpClient.write(protocol.GetMotorData(data))
//     })
//   })
// }

// //test
// serialPort.open(function (err) {
//   if (err)
//     console.log(err)
//   console.log(`SerialPort ${config.serial.com} isOpen: ${serialPort.isOpen}`)
// })

// const ByteLength = require('@serialport/parser-byte-length')
// const parser = serialPort.pipe(new ByteLength({ length: 8 }))
// parser.on("data", console.log)
// serialPort.on("data", (data) => {
//   console.log(Object.getOwnPropertyDescriptors(data))
// })

// socket.io******************
let ioClient = io('http://127.0.0.1:3100')
ioClient.on('connect', () => {
  ioClient.emit('ship')
  console.log("Server connected")
})
ioClient.on('disconnect', () =>
  console.log('Server disconnected!'))
ioClient.on("start", (data: any) => {
  //start
})
ioClient.on("control", (data: any) => {
  //control
})
ioClient.on("reset", () => {
  //reset
})
ioClient.on("sim", (data: any) => {
  console.log(data)
})




// Tcp******************
// let tcpClient = new net.Socket()
// tcpClient.connect(21081, "127.0.0.1", function () {
//   console.log("connect the server")
//   tcpClient.write("message from tcpclient")
// })
// tcpClient.on("data", function (data) {
//   console.log("the data from tcpServer is" + data.toString())
// })
// tcpClient.on("end", function () {
//   console.log("data end")
// })

//Serial************************
// let serialPort = new SerialPort("COM3", {
//   autoOpen: false,
//   baudRate: 19200
// })
// serialPort.open(function (err) {
//   console.log("Isopen:" + serialPort.isOpen)
//   if (err)
//     console.log(err)
// })
serialPort.on("data", (data) => {
  console.log(data)
})
let buf = new Buffer("01050001f000D80A", "hex")
serialPort.write(buf, (err) => {
  console.log("write error:" + err)
})


//udp
// const client = dgram.createSocket("udp4");
// client.on("message", (msg, rinfo) => {
//   if (msg)
//     console.log(`receive message from ${rinfo.address}:${rinfo.port}:${msg}`)
//   else
//     console.log("no message")
// })
// client.send("1234", 21090, "127.0.0.1", (err) => {
//   console.log(err)
// })