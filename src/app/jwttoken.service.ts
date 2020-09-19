import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class JWTTokenService {

  constructor(private localStrage: LocalStorageService) { }
  

  helper = new JwtHelperService();
  jwtToken: string = '';
  decodedToken: {[key: string]: string}

  
  setToken(token: string){
    if (token) {
      this.jwtToken = token;
      this.decodeToken();
      this.localStrage.set('token', token);
    }
  }

  decodeToken(){
    if (this.jwtToken) {
      this.decodedToken =  this.helper.decodeToken(this.jwtToken);
      console.log(this.decodedToken);
    }
  }

  getDecodeToken(){
    this.decodeToken();
    if (this.decodedToken) {
      return this.decodedToken;
    }
    return;
  }

  getUserRole(){
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.roles[0] : null;
  }

  getExpiryTime(){
    const expiryTime: any = this.helper.getTokenExpirationDate(this.jwtToken);
    if (expiryTime) {
      // return true si inférieur à 5 secondes
      return (expiryTime.getTime() - (new Date()).getTime()) < 5000;
    }
  }

  isTokenExpired(): boolean{
    if (this.jwtToken) {
      return this.helper.isTokenExpired(this.jwtToken);
    }
    return
  }
}
