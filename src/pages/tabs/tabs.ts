import { Component } from '@angular/core';

import { ContactPage } from '../contact/contact';


import { Transations } from '../transations/transations';
import { Map } from '../map/map';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root: any = Transations;
  tab2Root: any = Map;
  tab3Root: any = ContactPage;

  constructor() {

  }
}
