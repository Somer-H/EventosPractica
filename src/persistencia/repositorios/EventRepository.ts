import dotenv from 'dotenv'
import mysql from 'mysql2/promise';
import { Event } from '../models/Event';
import { UserEvent } from '../models/UserEvent';
dotenv.config();

export class EventRepository {
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

    async getAllEvents(): Promise<Event[] | null> {
        const [rows] = await this.connection.execute('SELECT * FROM Evento');   
        return rows as Event[];
    }

    async getId(idEvento:number): Promise<Event | null> {      
        try {
            const [rows]:any = await this.connection.execute('SELECT * FROM Evento WHERE idEvento=?',[idEvento]);
            return new Event(
                rows[0].idEvento,
                rows[0].description,
                rows[0].max,
                rows[0].location, 
                rows[0].fecha, 
                rows[0].hora,
                rows[0].userId
              );
        } catch (error) {
              return null;
        }       
    }
    
    async createNewEvent(data:any): Promise<Event | null> {
        let event = null        
        try {
            const [result]:any = await this.connection.execute('INSERT INTO Evento (description, max, location, fecha, hora, userId) VALUES (?, ?, ?, ?, ?, ?)',[data.description,data.max, data.location, data.fecha, data.hora,data.userId]);
            return new Event(result.insertId, data.description, data.max, data.location, data.fecha, data.hora, data.userId) 
        }
        catch(error){
            return null
        }

    }
    async createNewUserEvent(data:any): Promise<UserEvent | null> {
        let event = null        
        try {
            const [result]:any = await this.connection.execute('INSERT INTO UserEvent (userId, eventId) VALUES (?, ?)',[data.userId,data.eventId]);
            return new UserEvent(data.userId, data.eventId) 
        }
        catch(error){
            return null
        }

    }
    async updateEvent(idEvento:number, data:any): Promise<Event | null> {        
        try {
            const [result] = await this.connection.execute('UPDATE Evento SET description=?, max=?, location=?, fecha=?, hora=?, userId=? WHERE idEvento=?',[data.description,data.max,data.location, data.fecha, data.hora, data.userId, idEvento]);
            return new Event(idEvento, data.description, data.max, data.location,data.fecha, data.hora, data.userId ) 
        }
        catch(error){        
            console.log(error)    
            return null
        }   
    }

    async updateEventPartial(idEvento:number,data:any): Promise<Event | null> {
        const [rows] = await this.connection.execute('UPDATE INTO Evento (description, max, location, fecha, hora, userId) VALUES (?, ?, ?, ?, ?, ? )',[data.description,data.max, data.location, data.fecha, data.hora, data.userId]);
        return null;
    }
    async deleteEvent(idEvento:number): Promise<any | null> {
        try {
            const [result] = await this.connection.execute('DELETE FROM Evento WHERE idEvento=?',[idEvento]);
            return {status: true} 
        }
        catch(error){            
            return null
        }  
    }
    async getUserEvent(): Promise<any | null> {
        try {
            const [rows] = await this.connection.execute(`
                SELECT * 
                FROM Evento AS e
                JOIN UserEvent AS ue ON e.idEvento = ue.eventId 
                JOIN Users AS u ON u.idUsers = ue.userId 
            `);
            return rows as Event[];
        } catch (error) {
            return null;
        }
    }
    async getUserEventById(eventId: number): Promise<any | null> {
        try {
            const [rows] = await this.connection.execute(`
                SELECT * 
                FROM Evento AS e
                JOIN UserEvent AS ue ON e.idEvento = ue.eventId 
                JOIN Users AS u ON u.idUsers = ue.userId 
                WHERE ue.eventId = ?
            `, [eventId]);
            return rows as Event[];
        } catch (error) {
            console.error("Error en getUserEventById:", error);
            return null;
        }
    }
}  