import { ProductsService } from 'src/app/orders/products/products.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../product';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from 'src/app/site-framework/Category';
import { Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-view-linq',
  templateUrl: './view-linq.component.html',
  styleUrls: ['./view-linq.component.css']
})
export class ViewLinqComponent implements OnInit {

  categoryList:  Category[] = [];
  sortedData: Product[];
  categories: Product[];
  obj = Object.keys || undefined   ;
  public dataSource = new MatTableDataSource<Product>();

  displayedColumns: string[] = ['productName','price','startDate','endDate','categoryId','productImg'];
  constructor(private productsService: ProductsService) {
      this.productsService.listLinq().subscribe(res =>{
        this.sortedData = res.slice();
      });

     }

  ngOnInit(): void {
    this.productsService.getCategories().subscribe(categoriesData =>{
      this.categoryList = categoriesData;
    });

    this.productsService.listLinq().subscribe(res =>{
      this.dataSource.data= res;
    });
    this.productsService.listLinq().subscribe(data =>{
      this.categories = data;
    });
  }

  createImgPath (serverPath: string)  {
    return this.productsService.createImagePath(serverPath);
  }

  sortData(sort:Sort){
    const data = this.sortedData.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }
    this.dataSource.data = data.sort((a, b) => {

      const isAsc = sort.direction === 'asc';

      switch (sort.active) {
        case 'productName':
          return compare(a.productName, b.productName, isAsc);
        case 'price':
          return compare(a.price, b.price, isAsc);
        case 'endDate':
          return compare(a.endDate, b.endDate, isAsc);
        case 'startDate':
          return compare(a.startDate, b.startDate, isAsc);
        case 'categoryId':
          return compare(a.categoryId, b.categoryId, isAsc);
        default:
          return 0;
      }
    });
    }
  }


  function compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }


