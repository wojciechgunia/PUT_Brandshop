import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  GetOrderResponse,
  GetOrdersResponse,
  PostOrder,
  PostOrderResponse,
} from '../models/order.model';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  apiUrl = `${environment.apiUrl}/order`;

  constructor(private http: HttpClient) {}

  addOrder(body: PostOrder): Observable<PostOrderResponse> {
    return this.http
      .post<PostOrderResponse>(`${this.apiUrl}`, body, {
        withCredentials: true,
      })
      .pipe(
        tap((response) => {
          window.location.href = response.redirectUri;
        }),
      );
  }

  getOrder(uuid: string): Observable<GetOrderResponse> {
    const params = new HttpParams().append('uuid', uuid);
    return this.http.get<GetOrderResponse>(`${this.apiUrl}`, {
      params,
    });
  }

  getOrders(): Observable<GetOrdersResponse[]> {
    return this.http.get<GetOrdersResponse[]>(`${this.apiUrl}`, {
      withCredentials: true,
    });
  }
}
