import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Challenger } from '../model/challenger.model';
import { User } from '../model/user.model';

export class ResponseData{
	
	public _message: string;
	public _code: number;
	
	get message(): string{
		return this._message;
	}
	get code(): number{
		return this._code;
	}
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
	
	private serviceUrl = 'http://192.168.225.110:8000/';
	//private serviceUrl = 'http://localhost:8000/';

  constructor(private http: HttpClient) { }
  
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  
  
  register(challenger: Challenger): Observable<string>{
	  return this.http.post<string>(this.serviceUrl+'auth/register', challenger, { headers: this.headers, responseType: 'text' as 'json' })
	       .pipe(catchError(this.handleError));
  }
  
  login(user: User): Observable<string>{
	  return this.http.post<string>(this.serviceUrl+'auth/login', user, { headers: this.headers, responseType: 'text' as 'json' })
	       .pipe(catchError(this.handleError));
  }
  
  forgotPassword(email: string): Observable<ResponseData>{
	  return this.http.post<ResponseData>(this.serviceUrl+'auth/forgot-password?email='+email, { headers: this.headers, responseType: 'json' })
	       .pipe(catchError(this.handleError));
  }
  
  changePassword(user: User): Observable<string>{
	  return this.http.post<string>(this.serviceUrl+'auth/change-password', user, { headers: this.headers, responseType: 'text' as 'json' })
	       .pipe(catchError(this.handleError));
  }
  
  handleError(res: HttpErrorResponse | any){
	  console.error(res.error || res.body.error);
	  return throwError(res.error);
  }
}
