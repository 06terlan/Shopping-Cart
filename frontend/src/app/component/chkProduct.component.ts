import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'chk-product',
  template: `
    <div class="checkout-product">
        <div class="row">
            <div class="col-3 p-0 hidden-mobile">
            <img src="{{ 'https://www.partechgss.com' + product.product_img._text }}" class="checkout-product-img">
            </div>
            <div class="col-6 p-0 checkout-product-detail">
            <span class="checkout-product-name d-inline-block text-truncate text-head-1">{{ product.product_name._text }}</span>
            <span class="checkout-product-qty">Qty: {{ product.qyt }}</span>
            </div>
            <div class="col-3 p-0 checkout-product-action">
            <button class="btn btn-sm btn-my" (click)="removeItem(index)">Remove</button>
            <span class="checkout-product-price">{{ '$' + product.unit_price._text }}</span>
            </div>
        </div>
    </div>
  `
})
export class ChkProductComponent {
    @Input() product : {};
    @Input() index : number;
    @Output() onRemoveItem = new EventEmitter<number>();

    removeItem(index:number){
        this.onRemoveItem.emit(index);
    }
}