import config from "./config"
import SocketClient from "./socket"
import { ShipData } from "./ShipState"
import shipState from "./ShipState"
import TcpSocket from "./TcpSocket"
import protocol from "./protocol"
import Serial from "./serial"

const ioClient = new SocketClient(config.socketServer)
const tcpClient = new TcpSocket(config.tcp.server, config.tcp.port)
const serialPort = new Serial(config.serial.com, config.serial.baudRate)

ioClient.on("start", (data: any) => {
  //start
  shipState.running = data
  if (data) {
    serialPort.Send(protocol.serialStart)
    tcpClient.Send(protocol.tcpStart)
  } else {
    serialPort.Send(protocol.serialStop)
    tcpClient.Send(protocol.tcpStop)
  }
})
ioClient.on("control", (data: any) => {
  //control
  console.log(data)
  const { roll, pitch, yaw } = data
  shipState.enRoll = roll
  shipState.enPitch = pitch
  shipState.enYaw = yaw
})
ioClient.on("reset", () => {
  //reset
  console.log("reset")
  tcpClient.Send(protocol.tcpReset)
})
ioClient.on("sim", (data: ShipData) => {
  if (!shipState.enRoll) data[0] = 0
  if (!shipState.enPitch) data[1] = 0
  if (!shipState.enYaw) data[2] = 0
  console.log(data)
  tcpClient.Send(protocol.GetMotorData(data))
})
