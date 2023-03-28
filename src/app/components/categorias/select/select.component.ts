import { Component, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Categoria } from 'src/app/models/categoria';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent {

  @Output() categoryOutput = new EventEmitter<Categoria>();

  $categories: Categoria[];
  $category: Categoria;

  private $categoriesSubscription: Subscription;

  constructor(private categoryService: CategoryService){}

  ngOnInit(){ this.reset(); }

  ngOnDestroy() { if(this.$categoriesSubscription) this.$categoriesSubscription.unsubscribe(); }

  reset(){
    this.$categoriesSubscription = this.categoryService.index()
    .subscribe((result)=>{
      this.$categories = result.categorias.reverse();
    });
  }

  setCategory($category: Categoria){ this.$category = $category; }
}