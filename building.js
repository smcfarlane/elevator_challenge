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
}
