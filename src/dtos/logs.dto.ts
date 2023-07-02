import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateLogDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  public text: string;
}

export class UpdateLogDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  public text: string;
}
