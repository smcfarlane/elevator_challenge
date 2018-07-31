import RequestManager from './request_manager'

const states = ['stopped', 'moving', 'maintance']
const doorStates = ['doors-open', 'doors-closed']

var elevatorNumber = 1

class Elevator {
  constructor(maxFloors) {
    this.state = 'stopped'
    this.doorStates = 'doors-closed'
    this.trips = 0
    this.maxFloors = maxFloors
    this.currentFloor = 1
    this.destinationFloor = undefined
    this.number = elevatorNumber
    this.occupied = false
    this.direction = undefined
    this.requestManager = new RequestManager()
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

  request(floor, cb) {
    this.requestManager.addFloorRequest(floor, cb)
  }

  async stopForPassengers() {
    this.state = 'stopped'
    await sleep(2000)
  }

  async _moveOneFloor {
    if (this.state === 'stopped') { return }
    await sleep(2000)
    if (this.direction === 'up') {
      this.currentFloor += 1
    } else if (this.direction == 'down') {
      this.currentFloor -= 1
    }
    console.log(`Elevator Number ${this.number} is now at floor ${this.currentFloor}.`)
  }

  async _moveUpToDestination() {
    this.direction = 'up'
    this.state = 'moving'
    while (this.destinationFloor > this.currentFloor) {
      await this._moveOneFloorUp()
      if (this.destinationFloor > this.currentFloor) {
        this.state = 'stopped'
        this.direction = undefined
      }
    }
  }

  async _moveDownToDestination() {
    this.direction = 'down'
    this.state = 'moving'
    while(this.destinationFloor < this.currentFloor) {
      await this._moveOneFloorDown()
      if (this.destinationFloor < this.currentFloor) {
        this.state = 'stopped'
        this.direction = undefined
      }
    }
  }
}
