import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Ingrese nombre' })
  name: string;

  @IsNotEmpty({ message: 'Ingrese correo' })
  @IsEmail({}, { message: 'Ingrese un correo valido' })
  email: string;

  @IsNotEmpty({ message: 'Ingrese contraseña' })
  password: string;
}
