import RequestManager from './request_manager'

const states = ['stopped', 'moving', 'maintance']
const doorStates = ['open', 'closed']

var elevatorNumber = 1

class Elevator {
  constructor(maxFloors) {
    this.state = 'stopped'
    this.doorState = 'doors-closed'
    this.trips = 0
    this.maxFloors = maxFloors
    this.currentFloor = 1
    this.destinationFloor = undefined
    this.nextDestinations = []
    this.number = elevatorNumber
    this.occupied = false
    this.direction = undefined
    this.requestManager = new RequestManager()
    elevatorNumber += 1
  }



  request(floor, cb) {
    this.requestManager.addFloorRequest(floor, cb)
    if (self.state === 'stopped') {
      this.move(floor)
    }
  }

  async stopForPassengers(nextFloor) {
    this.state = 'stopped'
    this._openDoors()
    await sleep(2000)
    this._closeDoors()
    this.resumeOperation(nextFloor)
  }

    move(nextFloor) {
    this.state = 'moving'
    this.destinationFloor = nextFloor
    if (this.destinationFloor === this.currentFloor) {
      this.state = 'stopped'
      return this
    } else if (this.destinationFloor > this.currentFloor) {
      return this._moveUpToDestination()
    } else if (this.destinationFloor < this.currentFloor) {
      return this._moveDownToDestination()
    }
  }

  _resumeOpperation(nextFloor) {
    if (!nextFloor && !this.destinationFloor && this.nextDestinations.length === 0) {
      this.state = 'stopped'
    } if else (this.destinationFloor) {
      this.move(this.destinationFloor)
    } if else (!nextFloor && this.nextDestinations.length !== 0) {
      this.nextDestinations.shift()
      this.move(this.nextDestinations.shift())
    } if else (!this.destinationFloor) {
      this.move(nextFloor)
    } else {
      this.nextDestinations.push(nextFloor)
    }
  }

  _openDoors() {
    this.doorState = 'open'
    console.log(`Elevator Number ${this.number} has opened its doors.`)
  }

  _closeDoors() {
    this.doorState = 'close'
    console.log(`Elevator Number ${this.number} has closed its doors.`)
  }

  async _moveOneFloor() {
    if (this.state === 'stopped') { return }
    await sleep(2000)
    if (this.direction === 'up') {
      this.currentFloor += 1
    } else if (this.direction == 'down') {
      this.currentFloor -= 1
    }
    this.requestManager.checkHasReachedRequestedFloor()
    console.log(`Elevator Number ${this.number} is now at floor ${this.currentFloor}.`)
  }

  async _moveUpToDestination() {
    this.direction = 'up'
    this.state = 'moving'
    while (this.destinationFloor > this.currentFloor) {
      await this._moveOneFloor()
      if (this.destinationFloor > this.currentFloor) {
        this.state = 'stopped'
        this.direction = undefined
        this.trips += 1
        this._checkForMaintainance()
        return
      }
    }
  }

  async _moveDownToDestination() {
    this.direction = 'down'
    this.state = 'moving'
    while(this.destinationFloor < this.currentFloor) {
      await this._moveOneFloor()
      if (this.destinationFloor < this.currentFloor) {
        this.state = 'stopped'
        this.direction = undefined
        this.trips += 1
        this._checkForMaintainance()
        return
      }
    }
  }

  _checkForMaintainance() {
    if (this.trips > 100) {
      this.state = 'maintance'
    })
  }
}
