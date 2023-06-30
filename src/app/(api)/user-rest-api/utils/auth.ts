import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export const comparePassword = (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
}

export const generateToken = (userId: string): string => {
  return jwt.sign({ id: userId }, process.env.JWS_SECRET_KEY!, { expiresIn: '1d' });
}

export const verifyToken = (token: string): jwt.JwtPayload => {
  return jwt.verify(token, process.env.JWS_SECRET_KEY!) as jwt.JwtPayload;
}
