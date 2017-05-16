import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Adding } from './adding';

@NgModule({
  declarations: [
    Adding,
  ],
  imports: [
    IonicPageModule.forChild(Adding),
  ],
  exports: [
    Adding
  ]
})
export class AddingModule {}
