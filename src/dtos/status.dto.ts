import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength, Max } from 'class-validator';

export class CreateStatusDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  public name_status: string;
}

export class UpdateStatusDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  public name_status: string;
}
