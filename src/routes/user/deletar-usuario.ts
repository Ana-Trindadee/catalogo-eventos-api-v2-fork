import { Router } from "express";
import adaptRoute from "@/core/adapters/express-route-adapter";
import DeletarUsuarioController from "@/modules/usuario/controller/usuario/deletar-usuario";
import { authMiddleware } from "@/core/middlewares";
export default (router: Router): void => {
  router.delete(
    "/usuarios/:id",
    authMiddleware,
    adaptRoute(new DeletarUsuarioController())
  );
};
