import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html'
})
export class CategoryComponent {
  @Output() categorySelected = new EventEmitter<string>();

  onCategoryChange(event: any) {
    this.categorySelected.emit(event.target.value);
  }
}