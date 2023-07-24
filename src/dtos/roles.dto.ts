import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength, Max } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  public name_role: string;
}

export class UpdateRoleDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  public name_role: string;
}
