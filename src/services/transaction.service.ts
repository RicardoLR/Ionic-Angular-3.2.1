
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


}
