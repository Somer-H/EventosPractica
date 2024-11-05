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
            return ({
                idEvento:rows[0].idEvento,
                description:rows[0].description,
                max:rows[0].max,
                location:rows[0].location, 
                fecha:rows[0].fecha, 
                hora:rows[0].hora,
                userId:rows[0].userId
            }
        );
        } catch (error) {
              return null;
        }       
    }
    
    async createNewEvent(data:any): Promise<Event | null> {
        let event = null        
        try {
            const [result]:any = await this.connection.execute('INSERT INTO Evento (description, max, location, fecha, hora, userId) VALUES (?, ?, ?, ?, ?, ?)',[data.description,data.max, data.location, data.fecha, data.hora,data.userId]);
            return ({idEvento:result.insertId, description:data.description, max:data.max, location:data.location, fecha:data.fecha, hora:data.hora, userId:data.userId}
            ) 
        }
        catch(error){
            return null
        }

    }
    async createNewUserEvent(data:any): Promise<UserEvent | null> {
        let event = null        
        try {
            const [result]:any = await this.connection.execute('INSERT INTO UserEvent (eventId, userId) VALUES (?, ?)',[data.eventId,data.userId]);
            return new UserEvent(data.userId, data.eventId) 
        }
        catch(error){
            return null
        }

    }
    async updateEvent(idEvento:number, data:any): Promise<Event | null> {        
        try {
            const [result] = await this.connection.execute('UPDATE Evento SET description=?, max=?, location=?, fecha=?, hora=?, userId=? WHERE idEvento=?',[data.description,data.max,data.location, data.fecha, data.hora, data.userId, idEvento]);
            let event : Event= {
                idEvento: idEvento, 
                description: data.description, 
                max: data.max, 
                location: data.location, 
                fecha:data.fecha, 
                hora: data.hora,
                userId: data.userId
            }
            return event; 
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
            const [result] = await this.connection.execute('DELETE FROM Evento WHERE idEvento=?', [idEvento]);
            return {status: true} 
        }
        catch(error){     
            console.log(error)       
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
    async getEventWithUserId(): Promise <any | null>{
        try {
            const [rows]: any = await this.connection.execute("SELECT * from Evento JOIN Users ON idUsers=userId")
            console.log("Consulta ejecutada, resultado:", rows);
            return rows;
        } catch (error) {
            return null;
        }
    }
    async getEventWithParticipants(idEvento: number): Promise<any | null> {
        try {
            const [rows]: any = await this.connection.execute(`
                SELECT Evento.*, Users.*
                FROM Evento
                JOIN UserEvent ON Evento.idEvento = UserEvent.eventId
                JOIN Users ON UserEvent.userId = Users.idUsers
                WHERE Evento.idEvento = ?
            `, [idEvento]);
            
            return rows;
        } catch (error) {
            console.error("Error in database query:", error);
            return null;
        }
    }
    async getEventWithUserIdByUserId(userId: number): Promise <any | null>{
        try {
            const [rows]: any = await this.connection.execute("SELECT * from Evento JOIN Users ON idUsers=userId WHERE userId=?", [userId]);
            return rows;
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