module.exports = class UserDto {
  user_id;
  username;

  constructor(model) {
    this.user_id = model.user_id;
    this.username = model.username;
  }
}