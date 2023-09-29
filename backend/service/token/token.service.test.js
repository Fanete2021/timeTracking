require('dotenv').config();
const TokenService = require('./token.service');
const Token = require('../../model/Token');
const jwt = require('jsonwebtoken');

const mockUser = {
  user_id: 1,
  username: 'shrek',
  password: '34324fdafsdmk'
};

jest.mock('../../model/Token', () => ({
  findOne: jest.fn(),
  create: jest.fn(),
}));

describe('Token', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('generateTokens', async () => {
    const accessToken = jwt.sign(mockUser, process.env.JWT_ACCESS_SECRET, { expiresIn: '2h' });
    const refreshToken = jwt.sign(mockUser, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });

    const tokens = await TokenService.generateTokens(mockUser);

    expect(tokens.accessToken).toEqual(accessToken);
    expect(tokens.refreshToken).toEqual(refreshToken);
  });

  it('validateAccessToken', async () => {
    const token = jwt.sign(mockUser, process.env.JWT_ACCESS_SECRET, { expiresIn: '2h' });

    const userData = await TokenService.validateAccessToken(token);

    expect(userData.password).toEqual(mockUser.password);
    expect(userData.username).toEqual(mockUser.username);
  });

  it('validateRefreshToken', async () => {
    const token = jwt.sign(mockUser, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });

    const userData = await TokenService.validateRefreshToken(token);

    expect(userData.password).toEqual(mockUser.password);
    expect(userData.username).toEqual(mockUser.username);
  });

  it('saveToken should create', async () => {
    Token.findOne.mockResolvedValue(null);
    const token = jwt.sign(mockUser, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });

    await TokenService.saveToken(2, token);

    expect(Token.create).toHaveBeenCalledWith({
      user_id: 2,
      refresh_token: token
    });
  });
});