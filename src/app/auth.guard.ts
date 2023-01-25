import { AuthServiceService } from 'src/app/auth-service.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private router: Router,
    private jwtHelper:JwtHelperService,
    private authServ: AuthServiceService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token = localStorage.getItem("jwt");
      if(token)
      var decodedToken = this.jwtHelper.decodeToken(token);
      const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    if (token && !this.jwtHelper.isTokenExpired(token) && ( role === 'Admin' || role === "Editor")){
      return true;
    }
    this.router.navigate(["/login"]);
    return false;
  }
  isEditor(){
    const  token = this.authServ.getToken();
  const decodedToken = this.jwtHelper.decodeToken(token);
  const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  if(role === 'Editor'){
  return true;
  }
  return false;
  }

  
}
