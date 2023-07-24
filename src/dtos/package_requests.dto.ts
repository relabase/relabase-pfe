import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength, isNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreatePackage_requestDto {

  @IsString()
  @IsNotEmpty()
  public name_package:string;

  @IsString()
  @IsNotEmpty()
  public message:string;

  @IsNotEmpty()
  @IsNumber()
  public id_user:number;
  
  @IsString()
  @IsNotEmpty()
  public link:string;

}

export class UpdatePackage_requestDto {

}
