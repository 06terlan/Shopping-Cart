import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgDragDropModule } from 'ng-drag-drop';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './component/app.component';
import { ProductComponent } from './component/product.component';
import { ChkProductComponent } from './component/chkProduct.component';

import { InventoryService } from './service/inventory.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { reducers } from './store/reducers';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ChkProductComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgDragDropModule.forRoot(),
    StoreModule.forRoot(reducers)
  ],
  providers: [InventoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
