import { Router } from "express";
import adaptRoute from "@/core/adapters/express-route-adapter";
import EditarUsuarioController from "@/modules/usuario/controller/usuario/editar-usuario";
import { authMiddleware, authorizeRoles } from "@/core/middlewares";

export default (router: Router): void => {
  router.put(
    "/users/:id",
    authMiddleware,
    authorizeRoles(["Gerente", "Funcionario"]),
    adaptRoute(new EditarUsuarioController())
  );
};
