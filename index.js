global.sleep = function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


import Building from './building'

const building = new Building(5, 14)

building.requestElevator(1, 3)
building.requestElevator(4, 12)
building.requestElevator(5, 3)
building.requestElevator(9, 3)
