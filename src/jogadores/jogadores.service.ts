import { Injectable, Logger } from '@nestjs/common';
import { CriarJogadorDTO } from './dtos/criar-jogador.dto';
import { JogadorInterface } from './interfaces/jogador.interface';
import { v1 as uuid } from 'uuid';

@Injectable()
export class JogadoresService {
  private readonly logger = new Logger();

  private jogadores: JogadorInterface[] = [];

  criarAtualizarJogador(jogadorDto: CriarJogadorDTO): void {
    this.criar(jogadorDto);
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
}
