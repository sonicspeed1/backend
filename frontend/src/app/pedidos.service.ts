import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { pedido } from './pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  private baseUrl = 'http://localhost:3000/pedidos';

  constructor(private http: HttpClient) {}

  ingresarPedido(nuevoPedido: pedido): Observable<pedido> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<pedido>(this.baseUrl, nuevoPedido, { headers });
  }

  obtenerPedidos(): Observable<pedido[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<pedido[]>(`${this.baseUrl}/obtener`, { headers });
  }

  eliminarPedido(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
