

class RequestManager {
  constructor(elevator) {
    this.requestedFloors = []
    this.elevator = elevator
  }

  addFloorRequest(floor, callback) {
    this.requestedFloors.push({ floor: floor, callback: callback })
  }

  hasReachedRequestedFloor() {
    var result = false
    this.requestedFloors.forEach((request, index, arr) => {
      if (request.floor === this.elevator.currentFloor) {
        cb()
        result = true
        arr.splice(index, 1)
      }
    })
  }
}
