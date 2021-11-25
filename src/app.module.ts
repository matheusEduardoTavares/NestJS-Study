import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { env } from 'process';
import { JogadoresModule } from './jogadores/jogadores.module';

///npm install @nestjs/mongoose mongoose
///npm install -D @types/mongoose
@Module({
  imports: [
    JogadoresModule,
    MongooseModule.forRoot(env.url_connection, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
