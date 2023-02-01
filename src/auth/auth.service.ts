import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { comparePassword } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneUserByEmail(email);
    if (user) {
      const matched = comparePassword(password, user.password);
      if (matched) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    }
    return null;
  }

  async login(user: any) {
    const payload = { id: user.id, email: user.email, name: user.name };
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
