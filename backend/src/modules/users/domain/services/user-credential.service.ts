import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';

import { Injectable } from '@nestjs/common';
@Injectable()
export class UserCredentialService {
  private static readonly SALT_ROUNDS = 10;

  async encryptPassword(plainTextPassword: string): Promise<string> {
    return bcrypt.hash(plainTextPassword, UserCredentialService.SALT_ROUNDS);
  }

  async verifyPassword(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }

  async encryptEmail(email: string): Promise<string> {
    const token = crypto.createHash('sha256').update(email).digest('hex');
    return token
  }
}
