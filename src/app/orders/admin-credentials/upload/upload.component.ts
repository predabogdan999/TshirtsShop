import { ProductsService } from 'src/app/orders/products/products.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  fileToUpload:File;
  public message: string;
  productId = 0;
  @Output() public onUploadFinished = new EventEmitter();
  progress = 0;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {

  }


  public uploadFile(files)  {
    if (files.length === 0) {
      return;
    }
    let fileToUpload : File[] = files;
    const formData = new FormData();
     Array.from(fileToUpload).map((file, index) => {
      return formData.append('file' + index , file, file.name);

    });


    this.http.post('https://localhost:7285/api/Product/upload', formData , {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress && event.total)
        this.progress = Math.round(100 * event.loaded / event.total);
         else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
        }
      });

  }
}
