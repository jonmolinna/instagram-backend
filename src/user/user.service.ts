import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { encodedPassword } from 'src/utils/bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser';
import { UpdateUserDto } from './dto/updateUser';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  findOneUserById(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  findOneUserByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ email });
  }

  findAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    const isEmail = await this.findOneUserByEmail(
      dto.email.trim().toLocaleLowerCase(),
    );

    if (isEmail) throw new BadRequestException('El correo ya esta en uso');

    const hashPassword = encodedPassword(dto.password);

    const newUser = new User();
    newUser.name = dto.name.trim().toLocaleLowerCase();
    newUser.email = dto.email.trim().toLocaleLowerCase();
    newUser.password = hashPassword;

    return await this.usersRepository.save(newUser);
  }

  async deleteUser(id: number): Promise<boolean> {
    const user = await this.usersRepository.delete(id);
    if (user.affected === 1) {
      return true;
    }
    return false;
  }

  async updateUser(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.findOneUserById(id);
    if (!user) throw new NotFoundException('No se encontro el usuario');

    const editUser = Object.assign(user, {
      name: dto.name.trim().toLocaleLowerCase(),
    });

    return this.usersRepository.save(editUser);
  }
}
