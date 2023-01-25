import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/orders/products/products.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CartModel } from '../CartModel';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  productCartList: CartModel[] = [];
  sum:number;
  payButtonSwitch= true;
  payMethod: string;



  order = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    city: new FormControl('',[Validators.required]),
    street: new FormControl('',[Validators.required]),
    number: new FormControl('',[Validators.required]),
    postalCode: new FormControl('',[Validators.required]),
    phoneNumber: new FormControl('',[Validators.required]),
    paymentMethod: new FormControl('', [Validators.required]),
    total: new FormControl('', [Validators.required])
  });

  constructor(private productService: ProductsService,
    public dialog: MatDialog,
    private route:Router) { }

  ngOnInit(): void {

    this.productCartList = JSON.parse(localStorage.getItem('cart') || '{}' );

  }

  onSubmit(){


    if(this.payButtonSwitch == false){
      this.payMethod = 'card'

    }else{
      this.payMethod = 'cash'
    }
    this.order.patchValue({paymentMethod: this.payMethod, total:this.sum });

    let newOrder = {
      name: this.order.value.name,
      email: this.order.value.email,
      city: this.order.value.city,
      street: this.order.value.street,
      number: this.order.value.number,
      postalCode:this.order.value.postalCode,
      phoneNumber: this.order.value.phoneNumber,
      paymentMethod: this.payMethod,
      productsList: this.productCartList,
      total:this.sum
    };

    console.log(newOrder)
    this.productService.addNewOrder(newOrder).subscribe(data => {});

  }

  getTotalPrice(){
    if(localStorage.getItem('cart') !=  undefined || localStorage.getItem('cart') != '[]'){
      this.sum = this.productCartList.reduce((acc, product) => {
        return acc + product.productCart.products.price * product.stoc ;
      }, 0);
      return this.sum;
    }
    return 0;
   }

   showDialog(){
    const dialogRef = this.dialog.open(OrderProgressComponent, {

    });
    setTimeout(() => {
      dialogRef.close();
      localStorage.removeItem('cart');
      this.productCartList = JSON.parse( '{}' );
      this.route.navigate(['/products'])
    }, 3000);

   }
}

@Component({
  selector: 'order-progress-dialog',
  templateUrl: 'order-progress-dialog.html',
 styleUrls: ['order-progress-dialog.css']
})
export class OrderProgressComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<OrderProgressComponent>,
  ) { }

  ngOnInit() {

  }

}
