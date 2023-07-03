import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(32)
  public password: string;

  @IsNotEmpty()
  public id_role: number;

  @IsString()
  @IsNotEmpty()
  public first_name: string;

  @IsString()
  @IsNotEmpty()
  public last_name: string;

}

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(32)
  public password: string;
}
