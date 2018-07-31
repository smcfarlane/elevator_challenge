import Elevator from './elevator'

class Building {
  constructor(elevatorsCount, topFloor) {
    this.elevatorsCount = elevatorsCount
    this.topFloor = topFloor
    this.elevators = []
    for (let i = 1; i < this.elevatorsCount; i++) {
      this.elevators.push(new Elevator())
    }
  }

  requestElevator(atFloor, toFloor) {
    if (atFloor && (atFloor > 1 || atFloor < this.topFloor)) {
      console.error('you cannot be on that floor it does not exist')
      return
    }
    if (toFloor && (toFloor > 1 || toFloor < this.topFloor)) {
      console.error('The floor you are requesting does not exist')
      return
    }
    var elevator = this._fetchNearestElevator(atFloor, toFloor)
  }

  _fetchNearestElevator(atFloor, toFloor) {
    var availableElevators
    availableElevators = this._elevatorsAtFloor(atFloor)
    if (availableElevators.length > 0) { return availableElevators[0] }
    availableElevators = this._elevatorMovingPastFloor(atFloor)
    if (availableElevators.length > 0) { return availableElevators[0] }
    availableElevators = this._closestStoppedElevator(floor)
    if (availableElevators.length > 0) { return availableElevators[0] }
  }

  _elevatorsAtFloor(floor) {
    return this.elevators.filter(elevator => floor === elevator.currentFloor)
  }

  _elevatorMovingPastFloor(floor) {
    return this.elevators.filter(elevator => {
      if (elevator.state !== 'moving') { return false }
      if (elevator.direction === 'up' && floor <= elevator.destinationFloor) { return true }
      if (elevator.direction === 'down' && floor >= elevator.destinationFloor) { return true }
      return false
    })
  }

  _closestStoppedElevator(floor) {
    var elevatorsStoppedAtFloors = this.elevators.filter(elevator => elevator.state === 'stopped')
    var floorWithClosestElevator = this._closestNumber(floor, elevatorsStoppedAtFloors.map(elevator => elevator.currentFloor))
    return elevatorsStoppedAtFloors.filter(elevator => elevator.currentFloor === floorWithClosestElevator)
  }

  _closestNumber(number, array) {
    return counts.reduce((prev, curr) => Math.abs(curr - number) < Math.abs(prev - number) ? curr : prev)
  }
}
