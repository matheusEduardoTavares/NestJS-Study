import { Document } from 'mongoose';

///O document traz várias facilidades do modelo do
///MongoDB, como alguns métodos para persistência e consulta no banco
export interface JogadorInterface extends Document {
  readonly _id: string;
  readonly telefoneCelular: string;
  readonly email: string;
  nome: string;
  ranking: string;
  posicaoRanking: number;
  urlFotoJogador: string;
}
