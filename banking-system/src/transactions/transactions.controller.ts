import { Controller,Body, Get, Post } from '@nestjs/common';
import { TransactionsService } from './transactions.service.js';

@Controller('transactions')
export class TransactionsController {

    constructor(private transactionService: TransactionsService){}

    @Post()
    async deposit(
        @Body() amount: number,
        
    ){

    }
}
