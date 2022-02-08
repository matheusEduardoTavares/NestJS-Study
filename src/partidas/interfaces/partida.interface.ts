import { Jogador } from 'src/jogadores/interfaces/jogador.interface';

export interface Partida {
  readonly def: string;
  readonly resultado: Array<Resultado>;
  readonly jogadores: Array<Jogador>;
}

export interface Resultado {
  readonly set: string;
}
