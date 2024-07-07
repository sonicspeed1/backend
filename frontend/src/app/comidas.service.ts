import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ComidasService {
  private apiUrl1 = 'http://localhost:3000/calificacion/nombres'; 
  private apiUrl2 = 'http://localhost:3000/comidas'; 
  constructor(private httpclient: HttpClient) {
    console.log('El servicio Http esta funcionando…');
    }
    getMeseros(): Observable<any[]> {
      return this.httpclient.get<any[]>(`${this.apiUrl1}`);
    }
    getcomidas(): Observable<any[]> {
      return this.httpclient.get<any[]>(this.apiUrl2);
    }

}
