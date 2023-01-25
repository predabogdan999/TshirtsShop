import { animate, state, style, transition, trigger } from '@angular/animations';
import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of } from 'rxjs';
import { Category } from 'src/app/site-framework/Category';
import { Product } from '../product';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-group-by-categories',
  templateUrl: './group-by-categories.component.html',
  styleUrls: ['./group-by-categories.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})


export class GroupByCategoriesComponent implements OnInit {


  categoryList:  Category[] = [];
  expandedElement: any;
  public dataSource = new MatTableDataSource<Product>();
  displayedColumns: string[] = ['category'  ];
  displayedColumns2=['productName','description' ,'price','startDate','endDate' ]

  constructor( private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsService.getCategories().subscribe(categoriesData =>{
      this.categoryList = categoriesData;
    });

    this.productsService.groupbylist().subscribe(res =>{
      this.dataSource.data= res;
      });
  }
  getdata(data)
  {
    return new MatTableDataSource<any>(data);
  }

  createImgPath (serverPath: string)  {
    return this.productsService.createImagePath(serverPath);
  }
  deleteProd(id){
    return this.productsService.deleteProduct(id);
  }
  expired(id){
    return this.productsService.AddToExpiredProducts(id);
  }
}






