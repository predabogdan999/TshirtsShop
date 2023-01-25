import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router,
    private http:HttpClient) { }

  ngOnInit(): void {
  }
  register(form: NgForm){
    const credentials = JSON.stringify(form.value);
    this.http.post("https://localhost:7285/api/auth/register", credentials, {
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
  AdminRedirect(){
    this.router.navigate(["/register-admin"]);
  }
  EditorRedirect(){
    this.router.navigate(["/register-editor"]);
  }
}
