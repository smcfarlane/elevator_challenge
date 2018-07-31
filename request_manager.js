

class RequestManager {
  constructor(elevator) {
    this.requestedFloors = []
    this.elevator = elevator
  }

  addFloorRequest(floor, callback) {
    this.requestedFloors.push({ floor: floor, callback: callback })
  }

  checkHasReachedRequestedFloor() {
    var result = false
    this.requestedFloors.forEach((request, index, arr) => {
      if (request.floor === this.elevator.currentFloor) {
        this.elevator.stopForPassengers(request.floor)
        cb()
        result = true
        arr.splice(index, 1)
      }
    })
  }
}
