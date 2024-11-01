import { User } from '../../persistencia/models/User'
import { UserRepository } from "../../persistencia/repositorios/UserRepository";

export class UserService {
  
    constructor(readonly userRepositorio: UserRepository){}

    async getAllUsers(): Promise<User[] | null> {
        return this.userRepositorio.getAllUsers()
    }

    async getId(idUsers:number):Promise<User | null> {
        return this.userRepositorio.getId(idUsers);
    }

    async createNewUser(data:any): Promise<User | null> {
        return this.userRepositorio.createNewUser(data);
    }
    async updateUser(idUsers:number, data:any): Promise<User | null> {
        return this.userRepositorio.updateUser(idUsers,data);
    }

    async updateUserPartial(idUsers:number,data:any): Promise<User | null> {
        return this.userRepositorio.updateUserPartial(idUsers,data);    
    }
    async deleteUser(idUsers:number): Promise<User | null> {
        return this.userRepositorio.deleteUser(idUsers);
    }
}