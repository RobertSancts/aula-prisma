import { Router } from "express";
import { AuthenticateClientController } from "./modules/account/authenticateClient/AuthenticateClientController";
import { CreateClientController } from "./modules/useCase/createClient/CreateClientController";

const routes = Router();

const createClientController = new CreateClientController();

const autenticateClienteController = new AuthenticateClientController();

routes.post("/client/", createClientController.handle);
routes.post("/authenticate", autenticateClienteController.handle);

export { routes }


