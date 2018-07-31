

class ElevatorRequest {
  constructor(floor, elevators) {
    this.floor = floor
    this.elevators = elevators
  }

  fetchNearestElevator() {
    var elevators
    this.availableElevators = this.elevators.filter(elevator => elevator.state !== 'maintance')
    elevators = this._elevatorsAtFloor()
    if (elevators.length > 0) { return elevators[0] }
    elevators = this._elevatorMovingPastFloor()
    if (elevators.length > 0) { return elevators[0] }
    elevators = this._closestStoppedElevator()
    if (elevators.length > 0) { return elevators[0] }
    return
  }

  _elevatorsAtFloor() {
    return this.availableElevators.filter(elevator => this.floor === elevator.currentFloor)
  }

  _elevatorMovingPastFloor() {
    return this.availableElevators.filter(elevator => {
      if (elevator.state !== 'moving') { return false }
      if (elevator.direction === 'up' && this.floor <= elevator.destinationFloor) { return true }
      if (elevator.direction === 'down' && this.floor >= elevator.destinationFloor) { return true }
      return false
    })
  }

  _closestStoppedElevator() {
    var elevatorsStoppedAtFloors = this.availableElevators.filter(elevator => elevator.state === 'stopped')
    var floorWithClosestElevator = this._closestNumber(this.floor, elevatorsStoppedAtFloors.map(elevator => elevator.currentFloor))
    return elevatorsStoppedAtFloors.filter(elevator => elevator.currentFloor === floorWithClosestElevator)
  }

  _closestNumber(number, array) {
    return counts.reduce((prev, curr) => Math.abs(curr - number) < Math.abs(prev - number) ? curr : prev)
  }
}
