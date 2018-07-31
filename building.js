import Elevator from './elevator'
import ElevatorRequest from './elevator_request'

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
    var request = new ElevatorRequest(atFloor, this.elevators)
    var elevator = request.fetchNearestElevator()
    elevator.moveTo()
  }
}
