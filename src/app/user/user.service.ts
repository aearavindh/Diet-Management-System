import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Challenger } from '../model/challenger.model';
import { User } from '../model/user.model';
import { FullUser } from '../model/full-user.model';
import { Batch } from '../model/batch.model';
import { Group } from '../model/group.model';
import { Message } from '../model/message.model';
import { Post } from '../model/post.model';
import { DailyLog } from '../model/daily-log.model';
import { MonthlyChart } from '../model/monthly-chart.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
	user: User;
	headers: HttpHeaders;
	private serviceUrl = 'http://192.168.225.110:8000/';
	//private serviceUrl = 'http://localhost:8000/';

  constructor(private http: HttpClient) {
      this.getUser();
  }
  
  getUser(){
	  this.user = JSON.parse(localStorage.getItem('user'));
      this.headers = new HttpHeaders({ 'Authorization': 'Basic ' + btoa(this.user.username+':'+this.user.password) });
	                                        //'Content-Type': 'application/x-www-form-urlencoded' });
  }
  
  
  changePassword(user: User): Observable<string>{
	  this.getUser();
	  return this.http.post<string>(this.serviceUrl+'auth/change-password', user, { headers: this.headers, responseType: 'text' as 'json' })
	       .pipe(catchError(this.handleError));
  }
  
  getRequests(email: string): Observable<Challenger[]>{
	  this.getUser();
	  return this.http.get<Challenger[]>(this.serviceUrl+'user/requests?email='+email,{headers: this.headers, responseType: 'json'})
           .pipe(catchError(this.handleError));
  }
  
  getBatches(): Observable<Batch[]>{
	  this.getUser();
	  return this.http.get<Batch[]>(this.serviceUrl+'user/batches?email='+this.user.username,{headers: this.headers, responseType: 'json'})
           .pipe(catchError(this.handleError));
  }
  
  getGroups(): Observable<Group[]>{
	  this.getUser();
	  return this.http.get<Group[]>(this.serviceUrl+'user/groups?email='+this.user.username,{headers: this.headers, responseType: 'json'})
           .pipe(catchError(this.handleError));
  }
  
  createGroup(groups: Group[]): Observable<string>{
	  this.headers = this.headers.set('Content-Type','application/json');
	  this.getUser();
	  return this.http.post<string>(this.serviceUrl+'user/create-group?email='+this.user.username, groups, {headers: this.headers, responseType: 'text' as 'json'})
           .pipe(catchError(this.handleError));
  }
  
  updateStatus(challenger: Challenger, status: String): Observable<string>{
	  this.getUser();
	  return this.http.put<string>(this.serviceUrl+'user/status/'+status+'?email='+this.user.username, challenger, { headers: this.headers, responseType: 'text' as 'json' })
	       .pipe(catchError(this.handleError));
  }
  
  updateMobile(fullUser: FullUser): Observable<string>{
	  this.getUser();
	  return this.http.put<string>(this.serviceUrl+'user/modify-user?email='+this.user.username, fullUser, { headers: this.headers, responseType: 'text' as 'json' })
	       .pipe(catchError(this.handleError));
  }
  
  endProgram(): Observable<string>{
	  this.getUser();
	  return this.http.delete<string>(this.serviceUrl+'user/end-program?email='+this.user.username, {headers: this.headers, responseType: 'text' as 'json'})
           .pipe(catchError(this.handleError));
  }
  
  refer(email: string): Observable<string>{
	  this.getUser();
	  return this.http.get<string>(this.serviceUrl+'user/refer-challenger?sender='+this.user.username+'&receiver='+email, {headers: this.headers, responseType: 'text' as 'json'})
           .pipe(catchError(this.handleError));
  }
  
  donate(amount: string): Observable<string>{
	  this.getUser();
	  return this.http.get<string>(this.serviceUrl+'user/donate?donor='+this.user.username+'&amount='+amount, {headers: this.headers, responseType: 'text' as 'json'})
           .pipe(catchError(this.handleError));
  }
  
  fetchUser():Observable<FullUser>{
	  this.getUser();
	  return this.http.get<FullUser>(this.serviceUrl+'user?email='+this.user.username, {headers: this.headers, responseType: 'json'})
           .pipe(catchError(this.handleError));
  }
  
  fetchUsers():Observable<FullUser[]>{
	  this.getUser();
	  return this.http.get<FullUser[]>(this.serviceUrl+'user/all-users?email='+this.user.username, {headers: this.headers, responseType: 'json'})
           .pipe(catchError(this.handleError));
  }
  
  deleteUser(user: string):Observable<string>{
	  this.getUser();
	  return this.http.delete<string>(this.serviceUrl+'user/remove-user?email='+this.user.username+'&user='+user, {headers: this.headers, responseType: 'json'})
           .pipe(catchError(this.handleError));
  }
  
  modifyUser(user: FullUser): Observable<string>{
	  this.getUser();
	  return this.http.put<string>(this.serviceUrl+'user/modify-user?email='+this.user.username, user, { headers: this.headers, responseType: 'text' as 'json' })
	       .pipe(catchError(this.handleError));
  }
  
  addUser(user: FullUser): Observable<string>{
	  this.getUser();
	  return this.http.post<string>(this.serviceUrl+'user/add-user?email='+this.user.username, user, { headers: this.headers, responseType: 'text' as 'json' })
	       .pipe(catchError(this.handleError));
  }
  
  getLogs():Observable<DailyLog[]>{
	  this.getUser();
	  return this.http.get<DailyLog[]>(this.serviceUrl+'user/logs', {headers: this.headers, responseType: 'json'})
           .pipe(catchError(this.handleError));
  }
  
  getCharts():Observable<MonthlyChart[]>{
	  this.getUser();
	  return this.http.get<MonthlyChart[]>(this.serviceUrl+'user/charts', {headers: this.headers, responseType: 'json'})
           .pipe(catchError(this.handleError));
  }
  
  addLog(dailyLog: DailyLog): Observable<string>{
	  this.getUser();
	  return this.http.post<string>(this.serviceUrl+'user/update-log', dailyLog, { headers: this.headers, responseType: 'text' as 'json' })
	       .pipe(catchError(this.handleError));
  }
  
  addChart(monthlyChart: MonthlyChart): Observable<string>{
	  this.getUser();
	  return this.http.post<string>(this.serviceUrl+'user/update-chart', monthlyChart, { headers: this.headers, responseType: 'text' as 'json' })
	       .pipe(catchError(this.handleError));
  }
  
  getMessages():Observable<Message[]>{
	  this.getUser();
	  return this.http.get<Message[]>(this.serviceUrl+'user/messages?email='+this.user.username, {headers: this.headers, responseType: 'json'})
           .pipe(catchError(this.handleError));
  }
  
  sendMessageToUser(message: Message): Observable<string>{
	  this.getUser();
	  return this.http.post<string>(this.serviceUrl+'user/message-to-user', message, { headers: this.headers, responseType: 'text' as 'json' })
	       .pipe(catchError(this.handleError));
  }
  
  sendMessageToBatch(message: Message): Observable<string>{
	  this.getUser();
	  return this.http.post<string>(this.serviceUrl+'user/message-to-batch', message, { headers: this.headers, responseType: 'text' as 'json' })
	       .pipe(catchError(this.handleError));
  }
  
  sendMessageToGroup(message: Message, batchName: string): Observable<string>{
	  this.getUser();
	  return this.http.post<string>(this.serviceUrl+'user/message-to-group?batchName='+batchName, message, { headers: this.headers, responseType: 'text' as 'json' })
	       .pipe(catchError(this.handleError));
  }
  
  getPosts():Observable<Post[]>{
	  this.getUser();
	  return this.http.get<Post[]>(this.serviceUrl+'user/posts?email='+this.user.username, {headers: this.headers, responseType: 'json'})
           .pipe(catchError(this.handleError));
  }
  
  sendPost(formData: FormData, data: string): Observable<string>{
	  this.getUser();
	  return this.http.post<string>(this.serviceUrl+'user/post?data='+data, formData, { headers: this.headers, responseType: 'text' as 'json' })
	       .pipe(catchError(this.handleError));
  }
  
  getReport(batch: string):Observable<string>{
	  this.getUser();
	  return this.http.get<string>(this.serviceUrl+'user/report/'+batch, {headers: this.headers, responseType: 'text' as 'json'})
           .pipe(catchError(this.handleError));
  }
  
  handleError(res: HttpErrorResponse | any){
	  console.error(res);
	  console.error(res.error || res.body.error);
	  return throwError(res.error);
  }
}
