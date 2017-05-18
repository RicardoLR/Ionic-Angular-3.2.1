import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Wallets } from './wallets';

@NgModule({
  declarations: [
    Wallets,
  ],
  imports: [
    IonicPageModule.forChild(Wallets),
  ],
  exports: [
    Wallets
  ]
})
export class WalletsModule {}
