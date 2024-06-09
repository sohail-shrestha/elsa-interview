import { AppDataSource, User } from "@elsa-test/common/src";
import { hashPassword } from "./auth-service";

const getUser = async (username: string): Promise<User | null> => {
    const user = await AppDataSource.getRepository(User).findOne({where: {username}})
    return user;
 }

 const createUser = async (username: string, password: string) => {
    const passwordHash = await hashPassword(password)
    await AppDataSource.getRepository(User).insert({username, passwordHash})
 }

 export {getUser, createUser}