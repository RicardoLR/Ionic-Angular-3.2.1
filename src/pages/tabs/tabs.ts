import { Component } from '@angular/core';



import { Transations } from '../transations/transations';
import { Map } from '../map/map';
import { Wallets } from '../wallets/wallets';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root: any = Transations;
  tab2Root: any = Map;
  tab3Root: any = Wallets;

  constructor() {

  }
}
