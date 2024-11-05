import { User } from '../../persistencia/models/User'
import { UserRepository } from "../../persistencia/repositorios/UserRepository";
import bcrypt from 'bcrypt';
export class UserService {
  
    constructor(readonly userRepositorio: UserRepository){}

    async getAllUsers(): Promise<User[] | null> {
        return this.userRepositorio.getAllUsers()
    }

    async getId(idUsers:number):Promise<User | null> {
        return this.userRepositorio.getId(idUsers);
    }

    async createNewUser(data:any): Promise<User | null> {
        data.password = await bcrypt.hash(data.password, 15);
        return this.userRepositorio.createNewUser(data);
    }
    async updateUser(idUsers:number, data:any): Promise<User | null> {
        let existData = await this.getId(idUsers);
        if(existData != null){
            if(data.name){
                existData.name = data.name;
            }
            if(data.e_mail){
                existData.e_mail= data.e_mail
            }
            if(data.password){
                data.password =  await bcrypt.hash(data.password, 15);
                existData = data.password
            }
        }
        return this.userRepositorio.updateUser(idUsers,existData);
    }
  
    async updateUserPartial(idUsers:number,data:any): Promise<User | null> {
        return this.userRepositorio.updateUserPartial(idUsers,data);    
    }
    async deleteUser(idUsers:number): Promise<User | null> {
        return this.userRepositorio.deleteUser(idUsers);
    }
    async login(e_mail: string, password: string){
        let log = await this.userRepositorio.getByEmail(e_mail);
        if(log != null){
            const passwordMatch = await bcrypt.compare(password, log.password);
            if(passwordMatch){
                return log;
            }else{
                return null;
            }
        }else{
            return null; 
        }
    }
}