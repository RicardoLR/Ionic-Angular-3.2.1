import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Toast } from '@ionic-native/toast';


import { NewWallet } from '../new-wallet/new-wallet';

import { Wallet, IWallet } from '../../database';

import { WalletService } from '../../services/wallet.service';
import { TransactionService } from '../../services/transaction.service';


/**
 */
@IonicPage()
@Component({
  selector: 'page-wallets',
  templateUrl: 'wallets.html',
})
export class Wallets {

	wallets: IWallet[];

	/* Agregar pagina por arriba de la tab Wallet vinculada por [navPush]="addNewWalletPage" */
	addNewWalletPage = NewWallet;

	constructor(public navCtrl: NavController, public navParams: NavParams, private toast: Toast,
	    public walletService :WalletService, private transactionService:TransactionService) {
	}

	ionViewWillEnter() {	
		
	    if( this.walletService.empty() ){
	      this.walletService.validateFirstWallet();
	      console.log( "this.walletService.getStorageID()", this.walletService.getStorageID() );
	    }

		Wallet.all().then( resultWallets => this.wallets = resultWallets );

	}

	selectWallet(wallet:Wallet){
		this.walletService.setStorageID(wallet.id);
	}

	/** Remove from the list (view) and the DB 
	@params Wallet */
	deleteWallet(walletToDelete:Wallet){

		// Validar tener otra cartera
		if( this.wallets.length == 1)
			return this.showToast("Debes conservar 1 cartera.", "bottom");
			// hacemos return para que salga de la funcion

		// Validar que no sea cartera principal
		if( this.walletService.getStorageID() == walletToDelete.id)
			return this.showToast("Antes de eliminar, selecciona otra cartera como principal.", "bottom");
		

		// elimino de la vista
		this.wallets = this.wallets.filter( (elemWallet)=>{
			// Regresa los elementos que no queremos eliminar
			return elemWallet.id != walletToDelete.id;
		});

		// elimino de la DB
		walletToDelete.destroy();
	}

	showToast(message:string, position:string){

		this.toast.show( message, '2000', position).subscribe( toast => {
		    console.log(toast);
		  }
		);
	}

}
