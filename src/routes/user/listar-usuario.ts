import { Router } from "express";
import adaptRoute from "@/core/adapters/express-route-adapter";
import ListarUsuarioController from "@/modules/usuario/controller/usuario/listar-usuario";
import { authMiddleware } from "@/core/middlewares";

export default (router: Router): void => {
  router.get(
    "/usuarios{/:id}",
    authMiddleware,
    adaptRoute(new ListarUsuarioController())
  );
};
