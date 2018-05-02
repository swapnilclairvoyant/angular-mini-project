import { Contacts } from './contacts';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};



@Injectable()
export class ContactsService {
  contactsUrl = 'http://localhost:8082/api/users';
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('ContactsService');
  }


  /// Get Users
  getUsers (): Observable<any[]> {
    return this.http.get<any[]>(this.contactsUrl)
    .pipe(
      catchError(this.handleError('getUsers', []))
    );
  }

  addUser(user: Contacts): Observable<any> {
    console.log('User is : ', user);
    return this.http.post<any>(this.contactsUrl, JSON.stringify(user), httpOptions)
      .pipe(
        catchError(this.handleError('addUser', user))
      );
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(this.contactsUrl + '/' + id, httpOptions)
      .pipe(
        catchError(this.handleError('deleteUser', id))
      );
  }

  updateUser(user: Contacts): Observable<any> {
    return this.http.put<any>(this.contactsUrl + '/' + user.id, user, httpOptions)
      .pipe(
        catchError(this.handleError('updateUser', user))
      );
  }
}
