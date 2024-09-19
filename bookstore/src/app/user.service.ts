import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface User {
  id?: number | null;
  name?: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiServerUrl = 'http://localhost:8080/user';

  constructor(private http: HttpClient) { }

  public signUp(user: User): Observable<any>{
    return this.http.post<User>(`${this.apiServerUrl}/signup`, user);
  }

  public logIn(user: User): Observable<any> {
    return this.http.post<User>(`${this.apiServerUrl}/login`, user);

  }

  public getAll(): Observable<User[]>{
    return this.http.get<User[]>(`${this.apiServerUrl}/all`)
  }
}
