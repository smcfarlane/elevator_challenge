

class ElevatorRequest {
  constructor(floor, elevators) {
    this.floor = floor
    this.elevators = elevators
  }

  fetchNearestElevator() {
    var availableElevators
    availableElevators = this._elevatorsAtFloor()
    if (availableElevators.length > 0) { return availableElevators[0] }
    availableElevators = this._elevatorMovingPastFloor()
    if (availableElevators.length > 0) { return availableElevators[0] }
    availableElevators = this._closestStoppedElevator()
    if (availableElevators.length > 0) { return availableElevators[0] }
    return
  }

  _elevatorsAtFloor() {
    return this.elevators.filter(elevator => this.floor === elevator.currentFloor)
  }

  _elevatorMovingPastFloor() {
    return this.elevators.filter(elevator => {
      if (elevator.state !== 'moving') { return false }
      if (elevator.direction === 'up' && this.floor <= elevator.destinationFloor) { return true }
      if (elevator.direction === 'down' && this.floor >= elevator.destinationFloor) { return true }
      return false
    })
  }

  _closestStoppedElevator() {
    var elevatorsStoppedAtFloors = this.elevators.filter(elevator => elevator.state === 'stopped')
    var floorWithClosestElevator = this._closestNumber(this.floor, elevatorsStoppedAtFloors.map(elevator => elevator.currentFloor))
    return elevatorsStoppedAtFloors.filter(elevator => elevator.currentFloor === floorWithClosestElevator)
  }

  _closestNumber(number, array) {
    return counts.reduce((prev, curr) => Math.abs(curr - number) < Math.abs(prev - number) ? curr : prev)
  }
}
