import { ApiResponse, User } from "@elsa-test/common/src";
import { Request, Response } from 'express';
import { LoginDto } from "../dto/login-dto";
import { SignupDto } from "../dto/signup-dto";
import { comparePasswords, generateToken } from "../service/auth-service";
import { createUser, getUser } from '../service/user-service';

const login = async (req: Request<LoginDto>, res: Response<ApiResponse<{token: string}>>): Promise<void> => {
    const { username, password } = req.body;
    const user: User | null = await getUser(username)

    if(user === null){
        res.status(400).json({success: false, error: "username does not exist."})
        return;
    }

    const passwordMatch = await comparePasswords(password, user!.passwordHash);
    if (!passwordMatch) {
        res.status(401).json({ success: false,  error: 'Invalid credentials' });
        return;
    }

    const token = generateToken(user!);
    res.status(200).json({ success: true, data: {token} });
};

const signup = async (req: Request<SignupDto>, res: Response<ApiResponse>): Promise<void> =>{
    try {
        const {username, password} = req.body
        await createUser(username, password)
         res.status(200).json({
            success: true,
            message: "User has been created."
        })
    } catch (error) {
        res.status(200).json({
            success: true,
            message: "Couldn't create user."
        })
    }
}

export { login, signup };
