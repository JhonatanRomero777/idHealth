import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Categoria } from 'src/app/models/categoria';
import { Producto } from 'src/app/models/producto';
import { ProductService } from 'src/app/services/product.service';
import { SearchService } from 'src/app/services/search.service';
import { SweetAlertService } from 'src/app/services/sweet.alert.service';
import { SelectComponent } from '../../categorias/select/select.component';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent  {

  @Output() categoryOutput = new EventEmitter<Categoria>();

  @Output() productOutput = new EventEmitter<Producto[]>();
  @Output() resetOutput = new EventEmitter<boolean>();

  @Input() $userId: string;

  @ViewChild("productName") InputName: any;
  @ViewChild("productPrecio") InputPrecio: any;
  @ViewChild(SelectComponent) categorySelect: SelectComponent;
  
  loadingCreate: boolean = false;
  loadingSearch: boolean = false;
  loadingUpdate: boolean = false;
  cancelar: boolean = false;

  public $product: Producto;
  public $category: Categoria;
  public $current_category: Categoria;

  private $productSearchSubscription: Subscription;
  private $productCreateSubscription: Subscription;
  private $productUpdateSubscription: Subscription;

  constructor(private sweetAlertService: SweetAlertService, private searchService: SearchService,
              private productService: ProductService){}

  ngOnDestroy() {
    if(this.$productSearchSubscription) this.$productSearchSubscription.unsubscribe();
    if(this.$productCreateSubscription) this.$productCreateSubscription.unsubscribe();
    if(this.$productUpdateSubscription) this.$productUpdateSubscription.unsubscribe();
  }

  search($name: string){
    if($name){
      this.$productSearchSubscription = this.searchService.productos($name).subscribe(
        (result)=>{          
          if(result.results.length > 0){

            if(this.$userId){
              const val= this.$userId;
              result.results = result.results.filter(function ($product: any) {
                return $product.usuario.toLowerCase().indexOf(val) !== -1 || !val;
              });
            }

            this.productOutput.emit(result.results);
            this.cancelar = true;
          }
          else this.sweetAlertService.errorMsg("Ningún Resultado");

          this.loadingSearch = false;
      });
    }
    else{
      this.loadingSearch = false;
      this.sweetAlertService.errorMsg("Ingrese Nombre");
    }
  }

  create($name: string, $precio: string){
    if($name){

      if(this.$category){
        this.$productCreateSubscription = this.productService.create($name, $precio, this.$category._id)
        .subscribe(
          (result)=>{          
            this.reset();
            this.loadingCreate = false;
            this.sweetAlertService.successMsg("Creación Exitosa", "Producto creada correctamente");
          },
          (error) => {
            this.sweetAlertService.errorMsg(error.error.msg);
            this.loadingCreate = false;
          });
      }
      else{
        this.loadingCreate = false;
        this.sweetAlertService.errorMsg("Seleccione Categoría");
      }

    }
    else{
      this.loadingCreate = false;
      this.sweetAlertService.errorMsg("Ingrese Nombre");
    }
  }

  reset(){
    this.InputName.nativeElement.value = "";
    this.InputPrecio.nativeElement.value = "";
    this.resetOutput.emit(true);
    this.cancelar = false;
    this.$product = null;
  }

  edit(data: {product: Producto, category: Categoria}){

    console.log(data.category);
    
    this.$product = data.product;

    this.$category = data.category;
    this.$current_category = this.$category;

    this.categorySelect.setCategory(this.$category);

    this.InputName.nativeElement.value = this.$product.nombre;
    this.InputPrecio.nativeElement.value = this.$product.precio;
  }

  updateProduct(){
    if(this.$category){

      if(this.InputName.nativeElement.value && this.InputPrecio.nativeElement.value){

        if(this.InputName.nativeElement.value === this.$product.nombre
            && this.InputPrecio.nativeElement.value === this.$product.precio
            && this.$current_category._id === this.$category._id){
          this.loadingUpdate = false;
          this.reset();
        }
        else {
          this.$product.nombre = this.InputName.nativeElement.value;
          this.$product.precio = this.InputPrecio.nativeElement.value;
  
          this.$productUpdateSubscription = this.productService
          .update(this.$product, this.$category._id).subscribe(
            (result)=>{          
              this.reset();
              this.loadingUpdate = false;
              this.sweetAlertService
              .successMsg("Actualización Exitosa", "Producto actualizada correctamente");
            },
            (error) => {
              this.sweetAlertService.errorMsg(error.error.msg);
              this.loadingUpdate = false;
          });
        }
      }
      else{
        this.loadingUpdate = false;
        this.sweetAlertService.errorMsg("Ingrese Nombre");
      }
    }
    else{
      this.loadingUpdate = false;
      this.sweetAlertService.errorMsg("Seleccione Categoría");
    }
  }

  delete($product: Producto){

    let productService = this.productService;
    let me = this;

    this.sweetAlertService.deleteConfirm("Producto = " + $product.nombre).then(
      function(result) {

        if (result.value) {

          productService.delete($product).subscribe(
          (result)=>{          
            me.reset();
            me.sweetAlertService
            .successMsg("Eliminación Exitosa", "Producto eliminada correctamente");
          },
          (error) => {
            me.sweetAlertService.errorMsg(error.error.msg);
          });

        }  
    });
  }
}