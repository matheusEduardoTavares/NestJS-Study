import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jogadores.module';
import { ConfigModule } from '@nestjs/config';
import { CategoriasModule } from './categorias/categorias.module';

///npm install @nestjs/mongoose mongoose
///npm install -D @types/mongoose
///npm i --save @nestjs/config
///npm install class-validator class-transformer
@Module({
  imports: [
    ConfigModule.forRoot(),
    JogadoresModule,
    MongooseModule.forRoot(process.env.url_connection, {
      // useNewUrlParser: true,
      // useCreateIndex: true,
      // useUnifiedTopology: true,
      // useFindAndModify: false,
    }),
    CategoriasModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
