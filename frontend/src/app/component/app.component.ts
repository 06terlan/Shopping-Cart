import { Component } from '@angular/core';
import { InventoryService } from '../service/inventory.service';
import { Store } from '@ngrx/store';
import { LoadingActions } from '../store/actions/loading.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../../../node_modules/ng-drag-drop/style.css']
})
export class AppComponent {
	private products : any[] = [];
	private addedProductsById : {} = {};
	private addedProducts : any[] = [];
	private total : number = 0;
	private loading:boolean = false;

	constructor(private inventoryService:InventoryService, private store:Store<any>){}

	ngOnInit(){
		this.store.select('loadingReducer').subscribe(state=>{
			this.loading = state.loading;
		});

		this.retriveInventory();
	}

  	retriveInventory(){
		this.store.dispatch({type: LoadingActions.SHOW_LOADING });
		this.inventoryService.getInventory().then((d)=>{
			if(d.status === 'Success'){
				this.products = d.data.inventory.product;
			}
			this.store.dispatch({type: LoadingActions.HIDE_LOADING });
		});
	  }
	  
	checkout(){
		this.store.dispatch({type: LoadingActions.SHOW_LOADING });
		this.inventoryService.checkout(this.addedProducts).then((d)=>{
			if(d.status === 'Success'){
				alert("Done");
			}
			this.store.dispatch({type: LoadingActions.HIDE_LOADING });
		});
	}

  	onItemDrop(e: any) {
        if(typeof this.addedProductsById[e.dragData.product_id._text]==='undefined'){
        	this.addedProductsById[e.dragData.product_id._text] = e.dragData;
        	this.addedProductsById[e.dragData.product_id._text].qyt = 0;
        }
        this.addedProductsById[e.dragData.product_id._text].qyt++;

		this.total = 0;
		this.addedProducts = [];
        for(let pId in this.addedProductsById){
			this.addedProducts.push(this.addedProductsById[pId]);
			this.total += this.addedProductsById[pId].qyt * this.addedProductsById[pId].unit_price._text;
		}
    }

	removeItem(i : number){
		this.addedProducts = this.addedProducts.filter(function(value, index, arr){
			return index != i;
		});
		
		this.total = 0;
		this.addedProductsById = {};
        for(let product of this.addedProducts){
			this.addedProductsById[product.product_id._text] = product;
			this.total += product.qyt * product.unit_price._text;
		}
	}
}
