import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
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
  consultarJogadores(
    @Query('email') email: string,
  ): JogadorInterface[] | JogadorInterface {
    if (email) {
      return this.jogadoresService.consultarJogadorPorEmail(email);
    } else {
      return this.jogadoresService.consultarTodosJogadores();
    }
  }

  @Delete()
  deletarJogador(@Query('email') email: string): JogadorInterface {
    return this.jogadoresService.deletarJogadorPorEmail(email);
  }
}
