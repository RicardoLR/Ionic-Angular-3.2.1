
import { Injectable } from '@angular/core';
import { Wallet } from '../database';

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

	getMainWallet():any{
		return Wallet.find(this.getStorageID());
	}

	/** @return Promise [findPromise, updatePromise] */
	update(amount:number){

		let findPromise = this.getMainWallet();
		
		let updatePromise = findPromise.then( wallet=> {
			Wallet.update(this.getStorageID(), (+wallet.amount) + (+amount)); // + convierte a entero preservando signo(+ -)
		});

		return Promise.all( [findPromise, updatePromise] );
	}



	/**  Apoyo para recargar validateFirstWallet(), cuando "seleccionando otra wallet en tab wallet"
	@return boolean: true cuando no haya nada */
	empty():boolean{
		return !localStorage.getItem(StorageKey);
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
