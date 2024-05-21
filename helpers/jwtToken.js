import jwt from 'jsonwebtoken';
import 'dotenv/config';

const { JWT_SECRET } = process.env;
  
// export const createToken = (payload) => jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' })

export const createToken = (payload) => jwt.sign(payload, JWT_SECRET)

export const verifyToken = (token) => jwt.verify(token, JWT_SECRET)

export const decodeToken = (token) => jwt.decode(token)
