import { Event } from "../../persistencia/models/Event";
import { UserEvent } from "../../persistencia/models/UserEvent";
import { EventRepository } from "../../persistencia/repositorios/EventRepository";

export class EventService {
  
    constructor(readonly eventRepositorio: EventRepository) {}

    async getAllEvents(): Promise<Event[] | null> {
        return this.eventRepositorio.getAllEvents()
    }

    async getId(idEvento:number):Promise<Event | null> {
        return this.eventRepositorio.getId(idEvento);
    }

    async createNewEvent(data:any): Promise<Event | null> {
        return this.eventRepositorio.createNewEvent(data);
    }
    async createNewUserEvent(data: any): Promise<UserEvent| null>{
        return this.eventRepositorio.createNewUserEvent(data);
    }
    async updateEvent(idEvento:number, data:any): Promise<Event | null> {
        let eventSearch = await this.getId(idEvento);
        if(eventSearch !=null){
            if(data.description){
                eventSearch.description = data.description;
            }
            if(data.fecha){
                eventSearch.fecha = data.fecha
            }
            if(data.hora){
                eventSearch.hora = data.hora
            }
            if(data.location){
                eventSearch.location=data.location
            }
            if(data.max){
                eventSearch.max= data.max
            }
        }
        return this.eventRepositorio.updateEvent(idEvento,eventSearch);
    }

    async updateEventPartial(idEvento:number,data:any): Promise<Event | null> {
        return this.eventRepositorio.updateEvent(idEvento,data);    
    }
    async deleteEvent(idEvento:number): Promise<any | null> {
        return this.eventRepositorio.deleteEvent(idEvento);
    }
    async getUserEvent(): Promise <Event | null>{
        return this.eventRepositorio.getUserEvent();
    }
    async getUserEventById(idEvento: number): Promise <Event[] | null>{
        return this.eventRepositorio.getUserEventById(idEvento);
    }
}