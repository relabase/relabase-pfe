import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength, IsNumber } from 'class-validator';

export class CreateLogDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  public text: string;


  @IsNotEmpty()
  @IsNumber()
  public id_user: number;

  @IsNotEmpty()
  @IsNumber()
  public id_type: number;
}

export class UpdateLogDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  public text: string;
}
