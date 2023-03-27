import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { Subscription } from 'rxjs';
import { Producto } from 'src/app/models/producto';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  $products: Producto[];

  private $productsSubscription: Subscription;

  ColumnMode = ColumnMode;
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private authService:AuthService, private productService: ProductService){}

  ngOnInit(){
    this.$productsSubscription = this.productService.index()
    .subscribe((result)=>{

      const val = this.authService.getUser();

      this.$products = result.productos.filter(function ($product: Producto) {
        return $product.usuario._id.toLowerCase().indexOf(val) !== -1 || !val;
      });
    });
  }

  ngOnDestroy() { if(this.$productsSubscription) this.$productsSubscription.unsubscribe(); }
}