import { ShipData } from "./ShipState"

class Protocol {
  serialStart = [170, 21, 187, 0, 0, 0, 0, 247, 212]
  //"AA 15 BB 00 00 00 00 F7 D4"
  serialStop = [170, 21, 186, 0, 0, 0, 0, 202, 20]
  //'AA 15 BA 00 00 00 00 CA 14'
  tcpReset = [151, 121, 0, 0, 9, 4, 16, 0, 0, 0, 1, 2, 0, 2]
  tcpStart = [151, 121, 0, 0, 9, 4, 16, 0, 0, 0, 1, 2, 0, 1]
  tcpStop = [151, 121, 0, 0, 9, 4, 16, 0, 0, 0, 1, 2, 0, 0]
  tcpHeader = [151, 121, 0, 0, 0, 19, 4, 16, 0, 3, 0, 6, 12]
  GetMotorData(data: ShipData) {
    return this.tcpHeader
      .concat(this.GetRollData(data[0]))
      .concat(this.GetPitchData(data[1]))
      .concat(this.GetYawData(data[2]))
  }
  GetRollData(data: number) {
    let direction = [0, 1]
    if (data < 0) {
      data = -data
      direction = [0, 2]
    }
    const motorData = Math.round(data)
    return direction.concat([0, data])
  }
  GetPitchData(data: number) {
    let direction = [0, 1]
    if (data < 0) {
      data = -data
      direction = [0, 2]
    }
    const motorData = Math.round(data)
    return direction.concat([0, data])
  }
  GetYawData(data: number) {
    let direction = [0, 1]
    if (data < 0) {
      data = -data
      direction = [0, 2]
    }
    const motorData = Math.round(data)
    return direction.concat([0, data])
  }
}
export default new Protocol()