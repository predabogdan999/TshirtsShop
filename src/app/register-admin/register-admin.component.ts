import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css']
})
export class RegisterAdminComponent implements OnInit {

  constructor(private router: Router,
    private http:HttpClient) { }

  ngOnInit(): void {
  }
  register(form: NgForm){
    const credentials = JSON.stringify(form.value);
    this.http.post("https://localhost:7285/api/auth/register-admin", credentials, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(response => {
      const token = (<any>response).token;
      localStorage.setItem("jwt", token);
      //this.invalidLogin = false;
      this.router.navigate(["/login"]);
    }, err => {
    //  this.invalidLogin = true;
    });

  }
}
