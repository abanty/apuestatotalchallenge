import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
@Injectable()
export class UserTokenService {

  private static readonly secretKey = 'clavesecretaparagenerartoken';

  async encode(id: number, email: string, status: boolean): Promise<string> {

    const jwtoken = await jwt.sign({
      id,
      email,
      status,
    },
      UserTokenService.secretKey, {
      expiresIn: '1d'
    });
    
    return jwtoken;

  }

  async decode(token: string): Promise<{ id: number; email: string; status: boolean }> {

    return new Promise((resolve, reject) => {

      jwt.verify(token, UserTokenService.secretKey, (err, decoded) => {

        if (err) {

          reject(err);

        } else {

          resolve(decoded as { id: number; email: string; status: boolean });

        }

      });
    });
  }

}


