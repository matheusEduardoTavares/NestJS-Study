import { Jogador } from 'src/jogadores/interfaces/jogador.interface';
import { Partida } from 'src/partidas/interfaces/partida.interface';

export interface Desafio extends Document {
  readonly dataHoraDesafio: Date;
  readonly status: string;
  readonly dataHoraSolicitacao: Date;
  readonly dataHoraResposta: Date;
  readonly solicitante: string;
  readonly categoria: string;
  readonly jogadores: Array<Jogador>;
  readonly partida: Partida;
}
