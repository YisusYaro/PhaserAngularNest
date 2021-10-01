import { PartialType } from '@nestjs/mapped-types';
import { CreateMoventDto } from './create-movent.dto';

export class UpdateMoventDto extends PartialType(CreateMoventDto) {
  id: number;
}
