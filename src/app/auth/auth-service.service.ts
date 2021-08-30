import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './User.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;

}

export interface LogInResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered: string;
}

@Injectable()
export class AuthServiceService {
  userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  private credentials: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB90c1vV8qlYTv0BBcV-B9mIMZAAYFZ5j0';
  private loginCredentials: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB90c1vV8qlYTv0BBcV-B9mIMZAAYFZ5j0';
  private tokenExpTimer: any;
  constructor(private http: HttpClient, private router: Router) { }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(this.getCredentials,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(this.errorHandling),
      tap((resData) => {
        this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
      })
    );
  }

  login(email: string, password: string): Observable<LogInResponseData> {
    return this.http.post<LogInResponseData>(this.logInCredentials, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.errorHandling), tap((resData) => {
      this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
    }));

  }

  logOut(): void {
    this.userSubject.next(null);
    this.router.navigate(['/auth', {foo:'foo'}]);
    localStorage.removeItem('userData');

    if(this.tokenExpTimer) {
      clearTimeout(this.tokenExpTimer);
    }
    this.tokenExpTimer = null;
  }

  autoLogout(expDuration: number) {
    this.tokenExpTimer = setTimeout(()=>{ this.logOut()},expDuration);
  }

  private handleAuth(email: string, userId: string, token: string, expiresIn: number): void {
    const expDate = new Date(new Date().getTime() + +expiresIn * 1000)
    const user = new User(email, userId, token, expDate);
    this.userSubject.next(user);
    this.autoLogout(expiresIn*1000);
    this.saveTokenInStorage(JSON.stringify(user));
  }

  private saveTokenInStorage(user):void {
    localStorage.setItem('userData', user)
  } 

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if(!userData) {
      return;
    } 
    const newUser: User = new User(
                              userData.email, 
                              userData.id, 
                              userData._token, 
                              new Date(userData._tokenExpirationDate));
    if(newUser.token) {
      this.userSubject.next(newUser);
      const expirationDuration =  new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  private errorHandling(errorResponse: HttpErrorResponse): Observable<any> {
    let errorMessage = 'An unknown error occured, please try again later';
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError('An unknown error occured, please try again later');
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'the email already exists';
        break;

      case 'INVALID_PASSWORD':
        errorMessage = "incorrect password or a user name";
        break;

      case 'EMAIL_NOT_FOUND':
        errorMessage = "Email does not exist"
        break;
    };
    return throwError(errorMessage);
  }

  get getCredentials() {
    return this.credentials;
  }

  get logInCredentials() {
    return this.loginCredentials;
  }
}
