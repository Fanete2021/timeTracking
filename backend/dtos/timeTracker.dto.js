module.exports = class UserDto {
  tracking_id;
  start_time;
  all_paused_time;
  end_time;
  status;

  constructor(model) {
    this.tracking_id = model.tracking_id;
    this.start_time = model.start_time;
    this.all_paused_time = model.all_paused_time;
    this.end_time = model.end_time;
    this.status = model.status;
  }
}