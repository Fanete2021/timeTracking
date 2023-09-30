module.exports = class UserDto {
  trackingId;
  startTime;
  allPausedTime;
  lastPausedTime;
  endTime;
  status;

  constructor(model) {
    this.trackingId = model.tracking_id;
    this.startTime = model.start_time;
    this.allPausedTime = model.all_paused_time;
    this.lastPausedTime = model.last_paused_time;
    this.endTime = model.end_time;
    this.status = model.status;
  }
}