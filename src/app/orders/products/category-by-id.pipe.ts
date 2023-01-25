import { Category } from 'src/app/site-framework/Category';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryById'
})
export class CategoryByIdPipe implements PipeTransform {

  transform(categoryId: number, categories: Category[]): string {
    const category = categories.find(category => category.id === categoryId);
    return category ? category.categoryName : "";
  }

}
