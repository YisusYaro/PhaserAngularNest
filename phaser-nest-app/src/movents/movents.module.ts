import { Module } from '@nestjs/common';
import { MoventsService } from './movents.service';
import { MoventsGateway } from './movents.gateway';

@Module({
  providers: [MoventsGateway, MoventsService]
})
export class MoventsModule {}
