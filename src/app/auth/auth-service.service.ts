import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable()
export class AuthServiceService {

  constructor(private http: HttpClient) { }

  signUp(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB90c1vV8qlYTv0BBcV-B9mIMZAAYFZ5j0',
      {
        email:email,
        password: password,
        returnSecureToken: true
      }
    );
  }
}
