import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class InventoryService{
	private inventoryUrl = "http://127.0.0.1:5000/api/inventory";
	private checkoutUrl = "http://127.0.0.1:5000/api/checkout";

	constructor(private http:HttpClient){}

	getInventory(){
		return this.http.get<any>(this.inventoryUrl, {}).toPromise();
	}

	checkout(products : any[]){
		return this.http.post<any>(this.checkoutUrl, {products: products}).toPromise();
	}
}