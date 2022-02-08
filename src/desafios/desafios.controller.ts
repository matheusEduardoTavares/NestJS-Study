import {
  Body,
  Controller,
  Logger,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DesafiosService } from './desafios.service';
import { CriarDesafioDTO } from './dtos/criar-desafio.dto';
import { Desafio } from './interfaces/desafio.interface';

@Controller('api/v1/desafios')
export class DesafiosController {
  constructor(private readonly desafiosService: DesafiosService) {}

  private readonly logger = new Logger(DesafiosController.name);

  @Post()
  @UsePipes(ValidationPipe)
  async criarDesafio(
    @Body() criarDesafioDTO: CriarDesafioDTO,
  ): Promise<Desafio> {
    this.logger.log(`criarDesafioDTO: ${JSON.stringify(criarDesafioDTO)}`);
    return await this.desafiosService.criarDesafio(criarDesafioDTO);
  }
}
