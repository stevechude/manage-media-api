import { IsString } from 'class-validator';

export class CreateMediaDto {
  @IsString()
  type: string;

  @IsString()
  name: string;

  @IsString()
  description?: string;

  @IsString()
  url: string;
}
