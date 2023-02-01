import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty({ message: 'Ingrese correo' })
  @IsEmail({}, { message: 'Ingrese un correo valido' })
  email: string;

  @IsNotEmpty({ message: 'Ingrese contraseña' })
  password: string;
}
