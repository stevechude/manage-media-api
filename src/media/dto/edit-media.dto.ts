import { IsString } from 'class-validator';

export class EditMediaDto {
  @IsString()
  status: string;
}
