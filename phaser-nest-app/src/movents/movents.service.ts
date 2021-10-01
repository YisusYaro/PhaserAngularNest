import { Injectable } from '@nestjs/common';
import { CreateMoventDto } from './dto/create-movent.dto';
import { UpdateMoventDto } from './dto/update-movent.dto';

@Injectable()
export class MoventsService {
  create(createMoventDto: CreateMoventDto) {
    return 'This action adds a new movent';
  }

  findAll() {
    return `This action returns all movents`;
  }

  findOne(id: number) {
    return `This action returns a #${id} movent`;
  }

  update(id: number, updateMoventDto: UpdateMoventDto) {
    return `This action updates a #${id} movent`;
  }

  remove(id: number) {
    return `This action removes a #${id} movent`;
  }
}
