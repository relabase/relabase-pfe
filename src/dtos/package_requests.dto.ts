import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength, isNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreatePackage_requestDto {

  @IsString()
  @IsNotEmpty()
  public name_package:string;

  @IsString()
  @IsNotEmpty()
  public reason:string;

  @IsNotEmpty()
  @IsNumber()
  public id_user:number;

}

export class UpdatePackage_requestDto {

}
