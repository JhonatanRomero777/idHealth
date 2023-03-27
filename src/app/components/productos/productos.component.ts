import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { Subscription } from 'rxjs';
import { Producto } from 'src/app/models/producto';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit, OnDestroy {

  @Input() $userId: string;

  $products: Producto[];

  private $productsSubscription: Subscription;

  ColumnMode = ColumnMode;
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private authService:AuthService, private productService: ProductService){}

  ngOnInit(){
    this.$productsSubscription = this.productService.index()
    .subscribe((result)=>{

      this.$products = result.productos;

      if(this.$userId){
        this.$products = result.productos.filter(function ($product: Producto) {
          return $product.usuario._id.toLowerCase().indexOf(this.$userId) !== -1 || !this.$userId;
        });
      }
      
    });
  }

  ngOnDestroy() { if(this.$productsSubscription) this.$productsSubscription.unsubscribe(); }
}