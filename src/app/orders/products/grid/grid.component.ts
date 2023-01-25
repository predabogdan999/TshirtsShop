import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Product } from '../product';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  lowValue: number = 0;
  highValue: number = 20;
  length: number;
  pageSize: number;
  pageEvent: PageEvent;
  currentPage = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  productList: Product[] = [];
  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.productService.selectTop(5).subscribe(data =>{
      this.productList = data;
    });

  }
  getPaginatorData(event:PageEvent):PageEvent{
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    this.productService.selectTop(this.highValue).subscribe(data =>{
      this.productList = data;
      this.length = data.length
    });
    return event

  }
  public createImgPath (serverPath: string)  {
    return this.productService.createImagePath(serverPath);
}

}
