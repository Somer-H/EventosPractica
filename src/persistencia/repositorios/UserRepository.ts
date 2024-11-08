import dotenv from 'dotenv'
import mysql from 'mysql2/promise';
import { User } from '../models/User';
dotenv.config();

export class UserRepository {
    private connection: mysql.Pool;

    constructor() {
        
        this.connection = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: process.env.DB_DATABASE,
            password: process.env.DB_PASSWORD,
            waitForConnections: true,
            connectionLimit: 10,
        });       
        
    }

    async getAllUsers(): Promise<User[] | null> {
        const [rows] = await this.connection.execute('SELECT * FROM Users');   
        return rows as User[];
    }

    async getId(idUsers:number): Promise<User | null> {      
        try {
            const [rows]:any = await this.connection.execute('SELECT * FROM Users WHERE idUsers=?',[idUsers]);
            let user : User ={
                idUsers:rows[0].idUsers,
                name:  rows[0].name,
                e_mail: rows[0].e_mail,
                password: rows[0].password
            }
            return user;
        } catch (error) {
              return null;
        }       
    }
   
    async createNewUser(data:any): Promise<User | null> {
        let user = null       
        try {
            const [result]:any = await this.connection.execute('INSERT INTO Users (name, e_mail, password) VALUES (?, ?, ?)',[data.name,data.e_mail, data.password]);
            let user : User= {
                idUsers: result.insertId, 
                name: data.name,
                e_mail: data.e_mail,
                password: data.password
            }
            return user
        }
        catch(error){
            return null;
        }

    }
    async getByEmail(e_mail: string): Promise<User | null>{
        try {
            const [result]: any = await this.connection.execute("SELECT * FROM Users WHERE e_mail=?", [e_mail]);
            if (result.length == 0){
            return null;
            }else{
                const log = result[0];
            return log;
            }
        } catch (error) {
            return null
        }
    }
    async updateUser(idUsers:number, data:any): Promise<User | null > {        
        try {
            const [result] = await this.connection.execute('UPDATE Users SET name=?, e_mail=?, password=? WHERE idUsers=?',[data.name,data.e_mail,data.password, idUsers]);
            let user : User = {
                idUsers: idUsers, 
                name: data.name,
                e_mail:data.e_mail, 
                password: data.password
            }
            return user;
        }
        catch(error){            
       console.log(error)
            return null;
        
        }   
    }

    async updateUserPartial(idUsers:number,data:any): Promise<User | null> {
        const [rows] = await this.connection.execute('UPDATE INTO Users (name, e_mail) VALUES (?, ?)',[data.name,data.e_mail, data.password]);
        return null;
    }
    async deleteUser(idUsers:number): Promise<any | null> {
        try {
            const [result] = await this.connection.execute('DELETE FROM Users WHERE idUsers=?',[idUsers]);
            return {status: true} 
        }
        catch(error){            
            return null
        }  
    }
}