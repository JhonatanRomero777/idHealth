import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { Subscription } from 'rxjs';
import { Categoria } from 'src/app/models/categoria';
import { Producto } from 'src/app/models/producto';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit, OnDestroy {

  @Output() editOutput = new EventEmitter<{product: Producto, category: Categoria}>();
  @Output() deleteOutput = new EventEmitter<Producto>();
  
  @Input() $userId: string;

  $products: Producto[];

  private $productsSubscription: Subscription;
  private $roleSubscription: Subscription;

  ColumnMode = ColumnMode;
  @ViewChild(DatatableComponent) table: DatatableComponent;

  $category: Categoria;

  $initLoading: boolean;

  $role: string;
  $adminRole: string = environment.roles[0];

  constructor(private productService: ProductService,
              private userService:UserService, private authService: AuthService){}

  ngOnInit() { 
    this.$roleSubscription = this.userService.index().subscribe((response)=>{

      if(response.usuarios){

        const val = this.authService.getUser();

        response.usuarios = response.usuarios.filter(function ($user: Usuario) {
          return $user.uid.toLowerCase().indexOf(val) !== -1 || !val;
        });

        this.$role = response.usuarios[0].rol;
      }
    });

    this.reset();
  }

  ngOnDestroy() {
    if(this.$productsSubscription) this.$productsSubscription.unsubscribe();
    if(this.$roleSubscription) this.$roleSubscription.unsubscribe();
  }

  reset(){

    this.$initLoading = true;

    this.$productsSubscription = this.productService.index()
    .subscribe((result)=>{

      this.$products = result.productos.reverse();

      if(this.$category){
        const val = this.$category._id;
        this.$products = this.$products.filter(function ($product: Producto) {
          return $product.categoria._id.toLowerCase().indexOf(val) !== -1 || !val;
        });
      }

      if(this.$userId){
        const val= this.$userId;
        this.$products = this.$products.filter(function ($product: Producto) {
          return $product.usuario._id.toLowerCase().indexOf(val) !== -1 || !val;
        });
      }

      this.$initLoading = false;
      
    });
  }

  setCategory($category: Categoria){
    this.$category = $category;
    this.reset();
  }

  setProductos($products: Producto[]){
    this.$products = $products;
  }

  edit($product: Producto, $category: Categoria){
    let data = {product: $product, category: $category}
    this.editOutput.emit(data);
  }

  delete($row: Producto){
    this.deleteOutput.emit($row);
  }
}