import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MoventsModule } from './movents/movents.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), MoventsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
