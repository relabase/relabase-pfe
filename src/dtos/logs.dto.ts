import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateLogDto {
  @IsString()
  @IsNotEmpty()
  public text: string;
}

export class UpdateLogDto {
  @IsString()
  @IsNotEmpty()
  public text: string;
}
