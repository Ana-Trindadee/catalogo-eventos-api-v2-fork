import { unAuthorizedError } from "@/core/errors/unauthorized-error";
import {
  notFound,
  ok,
  serverError,
  unAuthorized,
} from "@/core/helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "@/core/protocols";
import { LoginService } from "../../service/login-service";
import { LoginDTO } from "../../types/login/index";
import User from "../../model/user-model";

export class LoginController implements Controller {
  private readonly loginService: LoginService;

  public constructor(loginService: LoginService) {
    this.loginService = loginService;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, senha }: LoginDTO = httpRequest.body;
      const response = await this.loginService.login({ email, senha });
      if (!response) {
        return unAuthorized(new unAuthorizedError());
      }
      const user = await this.loginService.buscarUsuarioPorId(response);
      if (typeof user !==  "object" || user === null) {
        return unAuthorized(new unAuthorizedError());
      }
      const { token, refreshToken } = this.loginService.gerarTokens(user as User);
      return ok({
        message: "Login realizado com sucesso",
        token,
        refreshToken,
      });
    } catch (error) {
      return serverError(error);
    }
  }
}

export default LoginController;
