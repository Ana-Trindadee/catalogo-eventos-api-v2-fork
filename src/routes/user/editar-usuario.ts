import { Router } from "express";
import adaptRoute from "@/core/adapters/express-route-adapter";
import EditarUsuarioController from "@/modules/usuario/controller/usuario/editar-usuario";
import { authMiddleware } from "@/core/middlewares";

export default (router: Router): void => {
  router.put(
    "/usuarios/:id",
    authMiddleware,
    adaptRoute(new EditarUsuarioController())
  );
};
