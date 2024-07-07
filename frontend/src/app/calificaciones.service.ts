import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { meseros } from './meseros';
@Injectable({
  providedIn: 'root'
})
export class CalificacionesService {
  private apiUrl = 'http://localhost:3000/calificacion'; 
  private apiUrl1 = 'http://localhost:3000/calificacion/nombres'; 

  constructor(private httpClient: HttpClient) {}

  getMeseros(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.apiUrl1}`);
  }

  actualizarCalificacion(id: string, calificacion: number, participacion: number): Observable<meseros> {
    const url = `${this.apiUrl}/${encodeURIComponent(id)}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { calificacion, participacion };
  
    return this.httpClient.put<meseros>(url, body, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          console.error(`Mesero con id "${id}" no encontrado.`);
        }
        return throwError('Error al actualizar la calificación.');
      })
    );
  }
}