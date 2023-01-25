import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeleteProductComponent } from './delete-product.component';

const routes: Routes = [
    {path:'',component: DeleteProductComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeleteProductRoutingModule { }
 