import {  User } from '@elsa-test/common/src/index';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_secret_key';

 const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10);
};

 const comparePasswords = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(plainPassword, hashedPassword);
};

 const generateToken = (user: User): string => {
    return jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
};

 const verifyToken = (token: string)  => {
    return jwt.verify(token, JWT_SECRET);
};

const decodeJwt = (token: string) => jwt.verify(token, JWT_SECRET)


export { comparePasswords, generateToken, hashPassword, verifyToken, decodeJwt };

