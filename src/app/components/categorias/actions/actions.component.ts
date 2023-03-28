import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Categoria } from 'src/app/models/categoria';
import { CategoryService } from 'src/app/services/category.service';
import { SearchService } from 'src/app/services/search.service';
import { SweetAlertService } from 'src/app/services/sweet.alert.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent  {

  @Output() nameOutput = new EventEmitter<Categoria[]>();
  @Output() resetOutput = new EventEmitter<boolean>();

  @ViewChild("categoryName") InputName: any;
  
  loadingCreate: boolean = false;
  loadingSearch: boolean = false;
  loadingUpdate: boolean = false;
  cancelar: boolean = false;

  public $category: Categoria;

  constructor(private sweetAlertService: SweetAlertService, private searchService: SearchService,
              private categoryService: CategoryService){}

  search($name: string){
    if($name){
      this.searchService.categorias($name).subscribe(
        (result)=>{          
          if(result.results.length > 0){
            this.nameOutput.emit(result.results);
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

  create($name: string){
    if($name){
      this.categoryService.create($name).subscribe(
        (result)=>{          
          this.reset();
          this.loadingCreate = false;
          this.sweetAlertService.successMsg("Creación Exitosa", "Categoría creada correctamente");
        },
        (error) => {
          this.sweetAlertService.errorMsg(error.error.msg);
          this.loadingCreate = false;
        });
    }
    else{
      this.loadingCreate = false;
      this.sweetAlertService.errorMsg("Ingrese Nombre");
    }
  }

  reset(){
    this.InputName.nativeElement.value = "";
    this.resetOutput.emit(true);
    this.cancelar = false;
    this.$category = null;
  }

  edit($category: Categoria){
    this.$category = $category;
    this.InputName.nativeElement.value = this.$category.nombre;
  }

  updateCategory(){
    if(this.InputName.nativeElement.value){

      if(this.InputName.nativeElement.value === this.$category.nombre){
        this.loadingUpdate = false;
        this.reset();
      }
      else {

        this.$category.nombre = this.InputName.nativeElement.value;

        this.categoryService.update(this.$category).subscribe(
          (result)=>{          
            this.reset();
            this.loadingUpdate = false;
            this.sweetAlertService
            .successMsg("Actualización Exitosa", "Categoría actualizada correctamente");
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

  delete($category: Categoria){

    let categoryService = this.categoryService;
    let me = this;

    this.sweetAlertService.deleteConfirm("Categoría = " + $category.nombre).then(
      function(result) {

        if (result.value) {

          categoryService.delete($category).subscribe(
          (result)=>{          
            me.reset();
            me.sweetAlertService
            .successMsg("Eliminación Exitosa", "Categoría eliminada correctamente");
          },
          (error) => {
            me.sweetAlertService.errorMsg(error.error.msg);
          });

        }  
    });
  }
}