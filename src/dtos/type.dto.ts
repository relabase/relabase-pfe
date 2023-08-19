import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength, Max } from 'class-validator';

export class CreateTypeDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  public name_type: string;
}

export class UpdateTypeDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  public name_type: string;
}
