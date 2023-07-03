import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength, isNotEmpty, IsOptional } from 'class-validator';

export class CreatePackage_requestDto {

  @IsString()
  @IsNotEmpty()
  public name_package:string;

  @IsString()
  @IsNotEmpty()
  public reason:string;

  @IsOptional()
  public id_user:number;

}

export class UpdatePackage_requestDto {

}
