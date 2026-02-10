import sequelize from "@/core/database";
import { Encrypter } from "@/core/interfaces";
import User from "@/modules/login/model/user-model";
import { CreateUserDTO, ResponseCreateUserDto } from "@/modules/usuario/types/usuarios";
import { Transaction } from "sequelize";

export class UsuarioService {
  private readonly encrypter: Encrypter;
  public constructor(encrypter: Encrypter) {
    this.encrypter = encrypter;
  }
  async deletarUsuario(id: number): Promise<boolean> {
    const result = sequelize.transaction(async (t: Transaction) => {
      
      const user = await User.findByPk(id);
      if (!user) {
        return false;
      }
      await user.destroy({ transaction: t });
      return true;
    });
    return result;
  }

  async buscarUsuarioPorId(id: number): Promise<User | null> {
    return await User.findByPk(id);
  }

  async buscarPorEmail(email: string): Promise<User | null> {
    return await User.findOne({ where: { email } });
  }

  async buscaTodosUsuarios(): Promise<User[]> {
    return (await User.findAll()).map((user: User) => user?.toJSON());
  }

  async atualizarUsuario(
    id: number,
    { nome, email, senha }: { nome?: string; email?: string; senha?: string }
  ): Promise<User | null> {
    const user = await User.findByPk(id);
    const newUser = { ...user?.toJSON() };
    if (!user) {
      return null;
    }
    const senhaCriptografada = senha
      ? await this.encrypter.hash(senha)
      : user.senha;
    newUser.nome = nome || newUser.nome;
    newUser.email = email || newUser.email;
    newUser.senha = senha ? senhaCriptografada : newUser.senha;
    const userAtualizado = await sequelize.transaction(async (t: Transaction) => {
      
      return await user.update(newUser, { transaction: t });
    });
    return userAtualizado.toJSON();
  }

  async criarUsuario(
    dadosUsuario: CreateUserDTO
  ): Promise<ResponseCreateUserDto> {
    const { nome, email, senha, role } = dadosUsuario;
    const senhaCriptografada = await this.encrypter.hash(senha);

    const usuario = await User.create({
      nome,
      email,
      senha: senhaCriptografada,
      role,
    });
    await User.sync();
    const usuarioCriado = await User.findByPk(usuario.id);
    if(!usuarioCriado) {
      throw new Error("Erro ao criar usuário");
    }
    return {
      id: usuarioCriado?.id,
      nome: usuarioCriado?.nome,
      email: usuarioCriado.email,
      role: usuarioCriado?.role,
      telefone: dadosUsuario.telefone,
    };

  }


  async validarUsuarioExistente(id: number): Promise<boolean> {
    const user = await User.findByPk(id);
    return !!user;
  }
}
