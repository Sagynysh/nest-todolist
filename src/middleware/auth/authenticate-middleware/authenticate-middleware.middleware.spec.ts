import { AuthenticateMiddlewareMiddleware } from './authenticate-middleware.middleware';

describe('AuthenticateMiddlewareMiddleware', () => {
  it('should be defined', () => {
    expect(new AuthenticateMiddlewareMiddleware()).toBeDefined();
  });
});
