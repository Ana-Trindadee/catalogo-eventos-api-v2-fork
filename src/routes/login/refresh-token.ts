import { Router } from "express";
import adaptRoute from "@/core/adapters/express-route-adapter";
import RefreshTokenController from "@/modules/login/controller/login/refresh-token";

export default (router: Router): void => {
  router.post("/refresh-token", adaptRoute(new RefreshTokenController()));
};
