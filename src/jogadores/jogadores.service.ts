import { Injectable, Logger } from '@nestjs/common';
import { CriarJogadorDTO } from './dtos/criar-jogador.dto';
import { JogadorInterface } from './interfaces/jogador.interface';
import { v1 as uuid } from 'uuid';

@Injectable()
export class JogadoresService {
  private readonly logger = new Logger();

  private jogadores: JogadorInterface[] = [];

  criarAtualizarJogador(jogadorDto: CriarJogadorDTO): void {
    const { email } = jogadorDto;

    const indiceJogadorExistente = this.jogadores.findIndex(
      (jogador) => jogador.email === email,
    );

    if (indiceJogadorExistente >= 0) {
      this.atualizar(jogadorDto, indiceJogadorExistente);
    } else {
      this.criar(jogadorDto);
    }
  }

  consultarTodosJogadores(): JogadorInterface[] {
    return this.jogadores;
  }

  private criar(criaJogadorDto: CriarJogadorDTO): void {
    const { nome, email, telefoneCelular } = criaJogadorDto;

    const jogador: JogadorInterface = {
      _id: uuid(),
      email,
      nome,
      telefoneCelular,
      ranking: 'A',
      posicaoRanking: 1,
      urlFotoJogador: 'www.google.com.br/foto123.jpg',
    };

    this.jogadores.push(jogador);

    this.logger.log(`jogador: ${JSON.stringify(jogador)}`);
  }

  private atualizar(criarJogadorDto: CriarJogadorDTO, index: number): void {
    const {
      _id,
      email,
      telefoneCelular,
      posicaoRanking,
      ranking,
      urlFotoJogador,
    } = this.jogadores[index];

    ///Só vai atualizar o nome
    const { nome } = criarJogadorDto;

    this.jogadores[index] = {
      _id,
      email,
      nome,
      posicaoRanking,
      ranking,
      telefoneCelular,
      urlFotoJogador,
    };
  }
}
