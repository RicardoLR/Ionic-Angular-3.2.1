
import { Injectable } from '@angular/core';
import { Wallet, IWallet } from '../database';

export const StorageKey = "WalletID";

@Injectable()
export class WalletService{

	/** Uso de Localstorage para saber en que wallet "cartera estoy"
	Localsorge guarda "string"  OJO */
	setStorageID(walletId){
		localStorage.setItem(StorageKey, walletId);
	}
	getStorageID():number{
		return parseInt( localStorage.getItem(StorageKey) );
	}

	/**  Verifica que ya este instanciada la primera cartera
	@return Promise */
	public validateFirstWallet():any {

		return new Promise( (resolve, reject)=>{
			Wallet.getFirst().then( (wallet)=>{
				// no existe catera y la creo
				if(!wallet){
					Wallet.createFirst().then( (resultado)=>{
							console.log("Creamos una cartera");
							this.setStorageID(wallet.id);
							resolve();
					});
				}else{
					console.log("Ya habia una cartera");

					this.setStorageID(wallet.id);
					resolve();
				}
			});
		});	
	}


}
