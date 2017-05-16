import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Transations } from './transations';

@NgModule({
  declarations: [
    Transations,
  ],
  imports: [
    IonicPageModule.forChild(Transations),
  ],
  exports: [
    Transations
  ]
})
export class TransationsModule {}
