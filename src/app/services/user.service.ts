import { LoginForm } from "../model/login-form";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../model/user';


@Injectable({
    providedIn: 'root'
})
export class UserService {

    apiUrl = "/api"

    public nameTerms = new Subject<string>();
    public name$ = this.nameTerms.asObservable();

    constructor(private http: HttpClient) {
        const memo = localStorage.getItem('currentUser');
    }

    // TODO: this method will retrieve a user by email from the backend.
    getOne(): Observable<User> {

        // the modified url for the backend endpoint
        const searchUrl = `${this.apiUrl}/users/user/login`;

        return null;

    }

    login(credentials: LoginForm): Observable<any> {

        // the modified url for the backend endpoint
        const searchUrl = `${this.apiUrl}/users/user/login`;

        return this.http.post<LoginForm>(searchUrl, credentials);

    }
    createUser(user: User): Observable<Object> {
        var header = new HttpHeaders({
            "Content-Type": "application/json",
            "Accept": "application/json"
        });

        return this.http.post<User>(`${this.apiUrl}/users/createUser`, JSON.stringify(user), {
            headers: header
        });

    }

    logout(): Observable<any> {

        // clear local storage
        localStorage.clear();

        // the modified url for the backend endpoint
        const searchUrl = `${this.apiUrl}/users/user/logout`;

        return this.http.get<string>(searchUrl);

    }

    isUserActive(): Observable<any> {
        return this.http.get<boolean>(`${this.apiUrl}/users/user/loggedIn`);
    }


  getActiveUser(): Observable<any> {

    // the modified url for the backend endpoint
    const searchUrl = `${this.apiUrl}/users/user/activeSession`;

    return this.http.get(searchUrl);

  }

    getOneTimeCode(emailId: string): Observable<string> {

        // the modified url for the backend endpoint
        const searchUrl = `${this.apiUrl}/users/getOnetimeCode/${emailId}`;

        return this.http.get<string>(searchUrl);

    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            console.log(error); // log to console instead

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }


}
