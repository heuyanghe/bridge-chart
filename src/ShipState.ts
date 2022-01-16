export type ShipData = [number, number, number]

class ShipState {
  running = false;
  enRoll = true;
  enPitch = true;
  enYaw = true;
  //enFin = 0;
  //enRudder = 0;
}
export default new ShipState()