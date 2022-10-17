import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { FormData } from '../Utilities/formData';

@Injectable({
  providedIn: 'root'
})
export class DataPostService {
  headers = { 'content-type': 'application/json'} 

  constructor(private httpClient: HttpClient) {

   }
   postData(data: any): Observable<FormData[]> {
    return this.httpClient.post<FormData[]>(`https://634b063733bb42dca40f9563.mockapi.io/Customer`, JSON.stringify(data),{'headers':this.headers})
    .pipe(retry(1), catchError(this.handleError));
  }
  getCustomerData(): Observable<FormData[]>{
    return this.httpClient.get<FormData[]>(`https://634b063733bb42dca40f9563.mockapi.io/Customer`)
    .pipe(retry(1), catchError(this.handleError));
  }
  putCustomerData(id: string, body: any): Observable<any>{
    return this.httpClient.put<any>(`https://634b063733bb42dca40f9563.mockapi.io/Customer/${id}`,body).pipe(retry(1), catchError(this.handleError));
  }

  handleError(er: any){
    return throwError(() => {
      console.log((er));
    })
  }
}
