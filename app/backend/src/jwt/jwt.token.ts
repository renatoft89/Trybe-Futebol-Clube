import * as jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

const generateToken = (payload: unknown) => {
  const token = jwt.sign({ data: payload }, JWT_SECRET as string, {
    expiresIn: '10h',
    algorithm: 'HS256',
  });

  return token;
};

export default generateToken;
