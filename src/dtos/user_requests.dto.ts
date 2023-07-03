import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength, isNotEmpty } from 'class-validator';

export class CreateUser_requestDto {
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public access_reason:string;

  @IsString()
  @IsNotEmpty()
  public first_name: string;

  @IsString()
  @IsNotEmpty()
  public last_name: string;

  @IsString()
  @IsNotEmpty()
  public filepath:string;

}

export class UpdateUser_requestDto {

}
