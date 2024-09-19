import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Book {
  id?: number | null;
  title: string;
  description: string,
  author: string,
  category: string,
  price: number
}

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private apiServerUrl = 'http://localhost:8080/book';

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Book[]>{
    return this.http.get<Book[]>(`${this.apiServerUrl}/all`)
  }

  getById(id: string): Observable<Book> {
    return this.http.get<any>(`${this.apiServerUrl}/${encodeURIComponent(id)}`)
  }

  public getByTitle(title: string): Observable<Book[]>{
    return this.http.get<Book[]>(`${this.apiServerUrl}/title/${encodeURIComponent(title)}`)
  }

  public getAllCategories(): Observable<string[]>{
    return this.http.get<string[]>(`${this.apiServerUrl}/categories`)
  }

  public getByCategory(category: string): Observable<Book[]>{
    return this.http.get<Book[]>(`${this.apiServerUrl}/category/${encodeURIComponent(category)}`)
  }
}
