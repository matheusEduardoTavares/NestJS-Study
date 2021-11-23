import { Body, Controller, Get, Post } from '@nestjs/common';
import { CriarJogadorDTO } from './dtos/criar-jogador.dto';
import { JogadorInterface } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';

@Controller('/api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  criarAtualizarJogador(@Body() criarJogadorDTO: CriarJogadorDTO) {
    this.jogadoresService.criarAtualizarJogador(criarJogadorDTO);
  }

  @Get()
  consultarJogadores(): JogadorInterface[] {
    return this.jogadoresService.consultarTodosJogadores();
  }
}
