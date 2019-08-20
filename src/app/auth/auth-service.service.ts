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

  logOut() {
    this.userSubject.next(null);
    this.router.navigate(['/auth']);
  }

  private handleAuth(email: string, userId: string, token: string, expiresIn: number) {
    const expDate = new Date(new Date().getTime() + +expiresIn * 1000)
    const user = new User(email, userId, token, expDate);
    this.userSubject.next(user);
  }

  private errorHandling(errorResponse: HttpErrorResponse) {
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
