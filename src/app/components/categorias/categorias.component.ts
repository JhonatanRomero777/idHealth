import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { Subscription } from 'rxjs';
import { Categoria } from 'src/app/models/categoria';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit, OnDestroy {

  @Output() editOutput = new EventEmitter<Categoria>();
  @Output() deleteOutput = new EventEmitter<Categoria>();

  $categories: Categoria[];

  private $categoriesSubscription: Subscription;

  $initLoading: boolean;

  ColumnMode = ColumnMode;
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private categoryService: CategoryService){}

  ngOnInit(){ this.reset(); }

  ngOnDestroy() { if(this.$categoriesSubscription) this.$categoriesSubscription.unsubscribe(); }

  reset(){

    this.$initLoading = true;

    this.$categoriesSubscription = this.categoryService.index()
    .subscribe((result)=>{
      this.$categories = result.categorias.reverse();

      this.$initLoading = false;
    });
  }

  setCategories($categories: Categoria[]){
    this.$categories = $categories;
  }

  edit($row: Categoria){
    this.editOutput.emit($row);
  }

  delete($row: Categoria){
    this.deleteOutput.emit($row);
  }
}