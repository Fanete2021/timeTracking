require('dotenv').config();
require('dotenv').config();
const UserService = require('./user.service');
const TokenService = require('../token/token.service');
const User = require('../../model/User');
const UserDto = require('../../dtos/user.dto');
const jwt = require('jsonwebtoken');
const TimeTracker = require('../../model/TimeTracker');
const TimeTrackerService = require('../timeTracker/timeTracker.service');
const {Op} = require('sequelize');
const status = require('../../enums/status');
const bcrypt = require('bcrypt');

const mockUser = {
  user_id: 1,
  username: 'shrek',
  password: '34324fdafsdmk'
};

jest.mock('../../model/User', () => ({
  findOne: jest.fn(),
  create: jest.fn(),
}));

jest.mock('../../model/Token', () => ({
  findOne: jest.fn(),
  create: jest.fn(),
}));

describe('Token', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('createUserDtoAndTokens', async () => {
    TokenService.saveToken = jest.fn();
    const userDto = new UserDto(mockUser);

    const accessToken = jwt.sign({...userDto}, process.env.JWT_ACCESS_SECRET, { expiresIn: '2h' });
    const refreshToken = jwt.sign({...userDto}, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });

    const result = await UserService.createUserDtoAndTokens(mockUser);

    expect(result.accessToken).toEqual(accessToken);
    expect(result.refreshToken).toEqual(refreshToken);
    expect(result.user.user_id).toEqual(mockUser.user_id);
  });

  it('registration should throw error', async () => {
    User.findOne.mockResolvedValue(mockUser);

    try {
      await TimeTrackerService.registration(mockUser.username, mockUser.password);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });

  it('login with non-existent user', async () => {
    User.findOne.mockResolvedValue();

    try {
      await TimeTrackerService.login(mockUser.username, mockUser.password);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });

  it('login with incorrect password', async () => {
    User.findOne.mockResolvedValue(mockUser);

    try {
      await TimeTrackerService.login(mockUser.username, 'incorrect');
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
});