const states = ['stopped', 'moving', 'maintance']

var elevatorNumber = 1

class Elevator {
  constructor(maxFloors) {
    this.state = 'stopped'
    this.trips = 0
    this.maxFloors = maxFloors
    this.currentFloor = 1
    this.destinationFloor = undefined
    this.number = elevatorNumber
    elevatorNumber += 1
  }

  moveTo(floorNumber) {

  }

  moveOneFloorUp() {
    this.state = 'moving'
    this.currentFloor += 1
    console.log(`Elevator Number ${this.number} is now at floor ${this.currentFloor}.`)
  }
}
