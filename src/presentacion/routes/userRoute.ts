import express, { Router } from 'express'
import { UserController } from '../controllers/usersController';
import { UserService } from '../../negocio/services/usersService';
import { UserRepository } from '../../persistencia/repositorios/UserRepository';

export const userRoutes: Router = express.Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

//Endpoints del recurso users
userRoutes.get("/", userController.getAll.bind(userController));
userRoutes.get("/:idUsers", userController.getId.bind(userController));
userRoutes.post("/", userController.createNewUser.bind(userController));
userRoutes.put("/:idUsers",userController.updateUser.bind(userController));
userRoutes.delete("/:idUsers",userController.deleteUser.bind(userController));
userRoutes.post(":/login", userController.login.bind(userController));