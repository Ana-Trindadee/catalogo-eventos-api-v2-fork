import { Router } from "express";
import adaptRoute from "@/core/adapters/express-route-adapter";
import CriarUsuarioController from "@/modules/usuario/controller/usuario/criar-usuario";
import { authMiddleware, authorizeRoles } from "@/core/middlewares";
import { validateBody } from "@/core/middlewares/validate-body";
import { createUserSchema } from "@/modules/usuario/schemas/user";

export default (router: Router): void => {
  router.post(
    "/usuarios",
    authMiddleware,
    validateBody(createUserSchema),
    adaptRoute(new CriarUsuarioController())
  );
};
