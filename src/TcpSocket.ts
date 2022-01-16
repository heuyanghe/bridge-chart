import net, { Socket } from "net"
import { Buffer } from "buffer"


export default class TcpSocket {
  constructor(server: string, port: number) {
    this.tcpClient = new Socket()
    this.tcpClient.connect(port, server, () => {
      console.log("TcpServer Connected")
    })
  }
  tcpClient: Socket
  Send(data: number[]) {
    this.tcpClient.write(Buffer.from(data))
  }
}