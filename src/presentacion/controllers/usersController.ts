import { Request, Response } from "express";
import { UserService } from "../../negocio/services/usersService";

export class UserController {
    constructor(readonly userService: UserService) {}

    async getAll(req: Request, res: Response) {
        const users = await this.userService.getAllUsers();
        // users puede ser null o un arreglo de objetos
        //Este headers permite que el frontend pueda lear la cabecera Authorization
        res.header("Access-Control-Expose-Headers","Authorization")
       
        res.status(200).send({ status: true, data: users });
    }

    async getId(req: Request, res: Response) {
        let idUsers = parseInt(req.params.idUsers);
        const user = await this.userService.getId(idUsers);
        res.status(200).send({ status: "OK", data: user });
    }

    async createNewUser(req: Request, res: Response) {
        const data = req.body;
        const newUSer = await this.userService.createNewUser(data);
        res.status(200).send({ status: "OK", data: newUSer });
    }
    
    async updateUser(req: Request, res: Response) {
        const idUsers = parseInt(req.params.idUsers);
        const data = req.body;
        console.log(data)
        const updateUser = await this.userService.updateUser(idUsers, data);
        res.status(200).send({ status: "OK", data: updateUser });
    }

    async updateUserPartial(req: Request, res: Response) {
        const idUsers = parseInt(req.params.idUsers);
        const data = req.body;
        const updateUser = await this.userService.updateUserPartial(idUsers, data);
        res.status(200).send({ status: "OK", data: updateUser });
    }
    async deleteUser(req: Request, res: Response) {
        const idUsers = parseInt(req.params.idUsers);
        const deleteUser = await this.userService.deleteUser(idUsers);
        res.status(200).send({ status: "OK", data: deleteUser });
    }
    async login(req: Request, res: Response) {
        const data = req.body;
    
        try {
            const user = await this.userService.login(data.e_mail, data.password);
    
            if (user != null) {
                res.status(200).json({
                    status: "OK",
                    message: 'Inicio de sesión exitoso',
                    user: user 
                });
            } else {
                res.status(401).json({ error: 'Credenciales incorrectas', user: null });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error en el proceso de inicio de sesión', user: null});
        }
}
}