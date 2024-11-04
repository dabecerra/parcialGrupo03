import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { URL } from '../constants/api.constant';
import { Observable } from 'rxjs';
import { Coffee } from '../types/coffe.type';

Injectable({
  providedIn: 'root',
});
export class HttpService {
  private readonly _http: HttpClient = inject(HttpClient);

  private readonly _URL: string = URL;

  public getCoffeList(): Observable<Coffee[]> {
    return this._http.get<Coffee[]>(this._URL);
  }
}
