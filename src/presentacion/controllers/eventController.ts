import { Request, Response } from "express";
import { EventService } from "../../negocio/services/eventService";
export class EventController {
    constructor(readonly eventService: EventService) {}

    async getAll(req: Request, res: Response) {
        const events = await this.eventService.getAllEvents();
        // users puede ser null o un arreglo de objetos
        //Este headers permite que el frontend pueda lear la cabecera Authorization
        res.header("Access-Control-Expose-Headers","Authorization")
       
        res.status(200).send({ status: true, data: events});
    }

    async getId(req: Request, res: Response) {
        let idEvent = parseInt(req.params.idEvento);
        const user = await this.eventService.getId(idEvent);
        res.status(200).send({ status: "OK", data: user });
    }

    async createNewEvent(req: Request, res: Response) {
        const data = req.body;
        const newEvent = await this.eventService.createNewEvent(data);
        res.status(200).send({ status: "OK", data: newEvent });
    }
    async getEventWithUserByUserId(req: Request, res:Response){
        const userId = parseInt(req.params.userId);
        const event = await this.eventService.getEventWithUsersByUserId(userId);
        res.status(200).send({status: "OK", data: event})
    }
    async getEventWithUser(req: Request, res: Response){
       const event = await this.eventService.getEventWitUsers();
       res.status(200).send({status: "OK", data: event})
    }
    async createNewUserEvent(req: Request, res: Response){
        const data = req.body;
        const newUserEvent = await this.eventService.createNewUserEvent(data);
        res.status(200).send({status: "OK", data: newUserEvent})
    }
    async updateEvent(req: Request, res: Response) {
        const idEvent = parseInt(req.params.idEvento);
        const data = req.body;
        const updateEvent = await this.eventService.updateEvent(idEvent, data);
        res.status(200).send({ status: "OK", data: updateEvent });
    }

    async updateEventPartial(req: Request, res: Response) {
        const idEvent = parseInt(req.params.idEvento);
        const data = req.body;
        const updateEvent = await this.eventService.updateEventPartial(idEvent, data);
        res.status(200).send({ status: "OK", data: updateEvent });
    }
    async deleteEvent(req: Request, res: Response) {
        const idEvent = parseInt(req.params.idEvento);
        const deleteEvent = await this.eventService.deleteEvent(idEvent);
        res.status(200).send({ status: "OK", data: deleteEvent });
    }
    async getUserEvent(req: Request, res: Response){
        const events = await this.eventService.getUserEvent();

        res.header("Access-Control-Expose-Headers","Authorization")
       
        res.status(200).send({ status: true, data: events});
    }
    async getUserEventById(req: Request, res: Response){
        let idEvent = parseInt(req.params.eventId);
        const user = await this.eventService.getUserEventById(idEvent);
        res.status(200).send({ status: "OK", data: user });
    }
}
