import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '../generated/prisma/client.js';

@Injectable()
export class TransactionsService {

    constructor(
        private prisma: PrismaService
    ){}

    //deposite money to your account
    async deposit(amount: number, accountId: string) {
        //converting the number to prisma decimal
        const amountToDeposite = new Prisma.Decimal(amount)

        //run both operations in database transactions
        return  await this.prisma.$transaction(async (tx) => {
            //update the account
            const updateAccount = await tx.account.update({
                where: {id: accountId},
                data: {
                    balance: {
                        increment: amountToDeposite
                    }
                }
            });
            //creating a record of the transaction
        const transactionRecord = await  tx.transaction.create({
            data: {
                type: 'DEPOSIT',
                amount: amountToDeposite,
                description: `Deposited ${amount} to account ${updateAccount.accountNumber}`,
                toAccountId: accountId,
            }
        })
        return {
            message: 'deposite successful',
            account: updateAccount,
            transaction: transactionRecord
        }

        })


}


//withdraw money
 async withdraw(amount: number, accountId: string) {
    const moneyWithdraw = new Prisma.Decimal(amount);

    return await this.prisma.$transaction(async (tx) => {
        const accountUpdate = await tx.account.update({
            where: {id: accountId},
            data: {
                balance: {
                    decrement: moneyWithdraw
                }
            }
        });
        //creating a record of the transaction
        const recordTrans = await tx.transaction.create({
            data: {
                type: 'WITHDRAWAL',
                amount: moneyWithdraw,
                description: `Deposited ${amount} to account ${accountUpdate.accountNumber}`,
                toAccountId: accountId,

            }
        })
        return {
            message: 'withdraw successful',
            account: accountUpdate,
            transaction: recordTrans
        }
    })
 }

}
