import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class AccountsService {

    constructor(
        private prisma: PrismaService
    ){}

    
}
