import * as jwt from 'jsonwebtoken';
import IUser from '../interfaces/IUser';

const { JWT_SECRET } = process.env;

const generateToken = (payload: unknown) => {
  const token = jwt.sign({ data: payload }, JWT_SECRET as string, {
    expiresIn: '10h',
    algorithm: 'HS256',
  });

  return token;
};

const validateToken = (authorization: string) => {
  const { data } = jwt.verify(authorization, JWT_SECRET as string) as IUser;
  return data;
};

export { generateToken, validateToken };
