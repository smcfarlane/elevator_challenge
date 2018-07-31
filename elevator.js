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
    this.state = 'moving'
    this.destinationFloor = floorNumber
    if (this.destinationFloor === this.currentFloor) {
      this.state = 'stopped'
      return this
    } else if (this.destinationFloor > this.currentFloor) {
      return this._moveUpToDestination()
    } else if (this.destinationFloor < this.currentFloor) {
      return this._moveDownToDestination()
    }
  }

  async _moveOneFloorUp() {
    this.state = 'moving'
    await sleep(2000)
    this.currentFloor += 1
    console.log(`Elevator Number ${this.number} is now at floor ${this.currentFloor}.`)
  }

  async _moveUpToDestination() {
    while(this.destinationFloor > this.currentFloor) {
      await this._moveOneFloorUp()
    }
  }

  async _moveOneFloorDown() {
    this.state = 'moving'
    await sleep(2000)
    this.currentFloor -= 1
    console.log(`Elevator Number ${this.number} is now at floor ${this.currentFloor}.`)
  }

  async _moveDownToDestination() {
    while(this.destinationFloor > this.currentFloor) {
      await this._moveOneFloorDown()
    }
  }
}
