
import { Injectable } from '@angular/core';

import { Transaction } from '../database';
import { WalletService } from './wallet.service';

export const StorageKey = "WalletID";

@Injectable()
export class TransactionService{

	constructor(private walletService:WalletService){

	}


	/**  Verifica que ya este instanciada la primera cartera
	@return Promise */
	public all():any {

		return Transaction.all( this.walletService.getStorageID() );
	}

	/** @return Promise [transactionPromise, walletUpdatePromise] */
	save(transaction:Transaction):any{
		console.log("transaction save(transaction): ", transaction);

		let transactionPromise = transaction.save();

		let walletUpdatePromise = this.walletService.update(transaction.amount);

		return Promise.all( [transactionPromise, walletUpdatePromise] );
	}

}
