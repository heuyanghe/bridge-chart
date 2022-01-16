import SerialPort from "serialport";

export default class Serial {
  constructor(com: string, baudRate: number) {
    this.serialPort = new SerialPort(com, {
      autoOpen: false,
      baudRate: baudRate
    })
    this.serialPort.open((err) => {
      if (err)
        console.log(err)
      console.log(`SerialPort ${com} isOpen: ${this.serialPort.isOpen}`)
    })
    this.serialPort.on("data", (data) => {
      console.log(data)
    })
  }

  serialPort: SerialPort

  Send(data: number[]) {
    this.serialPort.write(Buffer.from(data))
  }
}
