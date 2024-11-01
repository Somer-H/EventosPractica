import express, { Router } from 'express'
import { EventController } from '../controllers/eventController';
import { EventService } from '../../negocio/services/eventService';
import { EventRepository } from '../../persistencia/repositorios/EventRepository';

export const eventRoutes: Router = express.Router();
const eventRepository = new EventRepository();
const eventService = new EventService(eventRepository);
const eventController = new EventController(eventService);

//Endpoints del recurso users
eventRoutes.get("/", eventController.getAll.bind(eventController));
eventRoutes.get("/userEvent", eventController.getUserEvent.bind(eventController));
eventRoutes.get("/:idEvento", eventController.getId.bind(eventController));
eventRoutes.post("/userEvent",eventController.createNewUserEvent.bind(eventController));
eventRoutes.post("/", eventController.createNewEvent.bind(eventController));
eventRoutes.put("/:idEvento",eventController.updateEvent.bind(eventController));
eventRoutes.patch("/:idEvento",eventController.updateEventPartial.bind(eventController));
eventRoutes.delete("/:idEvento",eventController.deleteEvent.bind(eventController));
eventRoutes.get("/userEvent/:eventId", eventController.getUserEventById.bind(eventController));