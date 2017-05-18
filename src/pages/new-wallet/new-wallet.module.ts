import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewWallet } from './new-wallet';

@NgModule({
  declarations: [
    NewWallet,
  ],
  imports: [
    IonicPageModule.forChild(NewWallet),
  ],
  exports: [
    NewWallet
  ]
})
export class NewWalletModule {}
