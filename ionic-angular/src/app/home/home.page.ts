import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import {
  selectors as inventorySelectors,
  InventoryActions,
  Inventory
} from 'src/store/inventory';
import { Observable } from 'rxjs';
import { skip, filter, first } from 'rxjs/operators';
import { NgRedux } from '@angular-redux/store';
import { RootState } from 'src/store';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  @select(inventorySelectors.selectInventory) inventory$: Observable<
    Inventory[]
  >;
  @select(inventorySelectors.selectFetching) fetching$: Observable<boolean>;

  constructor(
    private store: NgRedux<RootState>,
    private inventoryActions: InventoryActions,
    private barcodeScanner: BarcodeScanner,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.store.dispatch<any>(this.inventoryActions.fetchInventory());
  }

  doRefresh(event) {
    this.store.dispatch<any>(this.inventoryActions.fetchInventory());
    this.fetching$
      .pipe(
        skip(1),
        filter(fetching => !fetching),
        first()
      )
      .subscribe(() => event.target.complete());
  }

  async openScanner() {
    try {
      const { cancelled, text } = await this.barcodeScanner.scan();
      if (!cancelled && text) {
        this.store.dispatch<any>(this.inventoryActions.sendInventory(text));
      }
    } catch (error) {
      const alert = await this.alertCtrl.create({
        message: error,
        buttons: ['OK']
      });
      alert.present();
    }
  }
}
