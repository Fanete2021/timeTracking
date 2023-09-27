const User = require('../model/User');
const bcrypt = require('bcrypt');
const tokenService = require('./token.service');
const UserDto = require('../dtos/user.dto');
const ApiError = require('../exceptions/api.error');

class UserService {
  async createUserDtoAndTokens(user) {
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({...userDto});
    await tokenService.saveToken(userDto.user_id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto
    };
  }

  async registration(username, password) {
    const foundedUser = await User.findOne({ where: { username: username }});

    if (foundedUser) {
      throw ApiError.BadRequest(`Пользователь с таким username ${username} уже существует`);
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const user = await User.create({ username: username, password: hashPassword });

    return await this.createUserDtoAndTokens(user);
  }

  async login(username, password) {
    const user = await User.findOne({ where: { username: username }});
    if (!user) {
      throw ApiError.BadRequest(`Пользователь с таким username не существует`);
    }

    const isPasswordEquals = await bcrypt.compare(password, user.password);
    if (!isPasswordEquals) {
      throw ApiError.BadRequest(`Неверный пароль`);
    }

    return await this.createUserDtoAndTokens(user);
  }

  async logout(refreshToken) {
    await tokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = await tokenService.findToken(refreshToken);
    if(!userData || !tokenFromDB) {
      throw ApiError.UnauthorizedError();
    }

    const user = await User.findOne({ where: { user_id: userData.user_id }});

    return await this.createUserDtoAndTokens(user);
  }

  async delete(user) {
   await User.destroy({ where: { user_id: user.user_id }});
  }
}

module.exports = new UserService();