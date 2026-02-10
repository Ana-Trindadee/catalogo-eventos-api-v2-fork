import { Tokenizer } from "@/core/adapters/token-adapter";
import { Encrypter } from "@/core/interfaces";
import User from "../model/user-model";
import { LoginDTO } from "../types/login/index";

export class LoginService {
  private readonly encrypter;
  private readonly tokenizer;
  public constructor(encrypter: Encrypter, tokenizer: Tokenizer) {
    this.encrypter = encrypter;
    this.tokenizer = tokenizer;
  }
  async login({ email, senha }: LoginDTO): Promise<null | number> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return null;
    }

    // Comparar a senha recebida com a senha criptografada
    const senhaEhValida = await this.encrypter.compare(senha, user.senha);
    if (!senhaEhValida) {
      return null;
    }
    return user.id;
  }

  async buscarUsuarioPorId(id: number): Promise<User | null> {
    const user = await User.findByPk(id);
    return user;
  }

  

  gerarTokens(user: User) {
    const token = this.tokenizer.generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });
    const refreshToken = this.tokenizer.generateRefreshToken({ id: user.id });
    return { token, refreshToken };
  }
}
