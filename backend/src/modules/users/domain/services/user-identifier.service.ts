import { Injectable } from '@nestjs/common';
@Injectable()
export class UserIdentifierService {

    generate(): string {
        const timestamp = Date.now().toString().slice(-5);
        const random = Math.floor(10000 + Math.random() * 90000).toString();
        return `${timestamp}${random}`;
    }

}


