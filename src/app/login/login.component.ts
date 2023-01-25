import { AuthServiceService } from 'src/app/auth-service.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidLogin:boolean;
  isLoggedIn : Observable<boolean>;
  constructor(private router: Router,
    private http:HttpClient,
    private authService: AuthServiceService) { }

  ngOnInit(): void {

  }
  login(form: NgForm) {
    const credentials = JSON.stringify(form.value);
    this.authService.login(credentials);
    /*this.http.post("https://localhost:7285/api/auth/login", credentials, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(response => {
      const token = (<any>response).token;
      localStorage.setItem("jwt", token);
      this.invalidLogin = false;
       this.router.navigate(['/products']);

    }, err => {
      this.invalidLogin = true;
    });*/
  }

}
