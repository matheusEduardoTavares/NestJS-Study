import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CriarJogadorDTO } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {
  private readonly logger = new Logger();

  constructor(
    @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>,
  ) {}

  /*
  async criarAtualizarJogador(criaJogadorDTO: CriarJogadorDTO): Promise<void> {
    const { email } = criaJogadorDTO;

    // const indiceJogadorExistente = this.jogadores.findIndex(
    //   (jogador) => jogador.email === email,
    // );

    const jogadorEncontrado = await this.jogadorModel
      .findOne({
        email,
      })
      .exec();

    if (jogadorEncontrado) {
      this.atualizar(criaJogadorDTO);
    } else {
      this.criar(criaJogadorDTO);
    }
  }
  */

  async criarJogador(criaJogadorDTO: CriarJogadorDTO): Promise<Jogador> {
    const { email } = criaJogadorDTO;

    const jogadorEncontrado = await this.jogadorModel
      .findOne({
        email,
      })
      .exec();

    if (jogadorEncontrado) {
      throw new BadRequestException(`Jogador com email ${email} já cadastrado`);
    }

    const jogadorCriado = new this.jogadorModel(criaJogadorDTO);
    return await jogadorCriado.save();
  }

  async atualizarJogador(
    _id: string,
    criarJogadorDTO: CriarJogadorDTO,
  ): Promise<void> {
    const jogadorEncontrado = await this.jogadorModel
      .findOne({
        _id,
      })
      .exec();

    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com ID ${_id} não encontrado`);
    }

    await this.jogadorModel
      .findOneAndUpdate(
        {
          _id,
        },
        {
          $set: criarJogadorDTO,
        },
      )
      .exec();
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    // return this.jogadores;

    return await this.jogadorModel.find().exec();
  }

  async consultarJogadorPorEmail(email: string): Promise<Jogador> {
    const jogadorEncontrado = await this.jogadorModel
      .findOne({
        email,
      })
      .exec();

    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com email ${email} não encontrado`);
    }

    return jogadorEncontrado;
    // const jogador = this.jogadores.find((jogador) => jogador.email === email);

    // if (!jogador) {
    //   throw new NotFoundException(`Jogador com email ${email} não encontrado`);
    // }

    // return jogador;
  }

  async deletarJogadorPorEmail(email: string): Promise<any> {
    // const indiceDoJogador = this.jogadores.findIndex(
    //   (jogador) => jogador.email === email,
    // );

    // if (indiceDoJogador < 0) {
    //   throw new NotFoundException(`Jogador com email ${email} não encontrado`);
    // }

    // const jogador = this.jogadores[indiceDoJogador];

    // this.jogadores.splice(indiceDoJogador, 1);

    // return jogador;

    return await this.jogadorModel.deleteOne({ email }).exec();
  }

  /*
  private async criar(criaJogadorDto: CriarJogadorDTO): Promise<Jogador> {
    const jogadorCriado = new this.jogadorModel(criaJogadorDto);
    return await jogadorCriado.save();

    // const { nome, email, telefoneCelular } = criaJogadorDto;
    // const jogador: Jogador = {
    //   email,
    //   nome,
    //   telefoneCelular,
    //   ranking: 'A',
    //   posicaoRanking: 1,
    //   urlFotoJogador: 'www.google.com.br/foto123.jpg',
    // };
    // this.jogadores.push(jogador);
    // this.logger.log(`jogador: ${JSON.stringify(jogador)}`);
  }
  */

  /*
  // private atualizar(criarJogadorDto: CriarJogadorDTO, index: number): void {
  private async atualizar(criarJogadorDto: CriarJogadorDTO): Promise<Jogador> {
    const { email } = criarJogadorDto;
    return await this.jogadorModel
      .findOneAndUpdate(
        {
          email,
        },
        {
          $set: criarJogadorDto,
        },
      )
      .exec();

    // const {
    //   _id,
    //   email,
    //   telefoneCelular,
    //   posicaoRanking,
    //   ranking,
    //   urlFotoJogador,
    // } = this.jogadores[index];
    // ///Só vai atualizar o nome
    // const { nome } = criarJogadorDto;
    // this.jogadores[index] = {
    //   _id,
    //   email,
    //   nome,
    //   posicaoRanking,
    //   ranking,
    //   telefoneCelular,
    //   urlFotoJogador,
    // };

    // atualizarJogadorDTO.nome = nome;
  }
  */
}
