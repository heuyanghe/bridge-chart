import io, { Socket } from "socket.io-client"

export default class SocketClient {
  constructor(server: string) {
    this.client = io(server)
    this.client.on('connect', () => {
      this.client.emit("ship")
      console.log("SocketServer Connected")
    })
    this.client.on('disconnect', () =>
      console.log('Server Disconnected!'))
  }
  client: Socket
  on(event: string, callback: (data?: any | undefined) => void) {
    this.client.on(event, callback)
  }
}