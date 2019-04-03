import { Component, Input } from '@angular/core';

@Component({
  selector: 'product',
  template: `
          <div class="row product-detail">
            <div class="col-md-5 col-4 product-img">
              <img src="{{ 'https://www.partechgss.com' + product.product_img._text }}" class="product-img">
            </div>
            <div class="col-md-7 col-8 product-info">
              <span class="product-name d-inline-block text-truncate text-head-1">{{ product.product_name._text }}</span>
              <br/>
              <span class="product-stock">{{ product.quantity_in_stock._text > 0 ? "In Stock" : "Out Stock" }}</span>
            </div>
            <div class="col-12 p-0 product-price">
               {{ '$' + product.unit_price._text }}
            </div>
          </div>
  `
})
export class ProductComponent {
    @Input() product : {};
    @Input() index : number;
}