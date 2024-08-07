import { Component, OnInit } from '@angular/core';
import { Comida } from '../Comidas';
import { ComidasService } from '../comidas.service';
import { pedido } from '../pedido'; 
import { PedidosService } from '../pedidos.service';
import { meseros } from '../meseros';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  comidas: Comida[] = [];
  meseros: meseros[] = [];
  pedidos: pedido[]= [];

  constructor(private comidasService: ComidasService, private pedidosService: PedidosService) {}

  ngOnInit(): void {
    this.cargarComidas();
    this.cargarMeseros();
    this.cargarPedidos();
  }

  cargarComidas() {
    this.comidasService.getcomidas().subscribe(data => {
      console.log(data);
      this.comidas = data;
    });
  }

  cargarMeseros() {
    this.comidasService.getMeseros().subscribe(data => {
      console.log(data);
      this.meseros = data;
    });
  }

  realizarPedido(comida: Comida) {
    const meseroAleatorio = this.meseros[Math.floor(Math.random() * this.meseros.length)];
    const nuevoPedido: pedido = {
      comida: comida.Nombre,
      mesero: meseroAleatorio.Nombre,
      precio: comida.precio
    };

    this.pedidosService.ingresarPedido(nuevoPedido).subscribe(
      (pedidoCreado) => {
        console.log('Pedido creado:', pedidoCreado);
        alert(`Su comida: ${pedidoCreado.comida} será entregada por el mesero: ${pedidoCreado.mesero} con la cantidad de: ${pedidoCreado.precio} dólares`);
        this.cargarPedidos();
      },
      (error) => {
        console.error('Error al crear el pedido:', error);
        alert('Error al crear el pedido. Inténtalo de nuevo.');
      }
    );
  }
  cargarPedidos(): void {
    this.pedidosService.obtenerPedidos().subscribe(
      (pedidos: pedido[]) => {
        this.pedidos = pedidos;
      },
      (error) => {
        console.error('Error al cargar los pedidos', error);
        // Manejo de errores, por ejemplo, mostrar un mensaje al usuario
      }
    );
  }

  eliminarPedido(id: string): void {
    this.pedidosService.eliminarPedido(id).subscribe(
      () => {
        console.log('Pedido eliminado correctamente');
        // Actualizar la lista de pedidos después de eliminar uno
        this.cargarPedidos();
      },
      (error) => {
        console.error('Error al eliminar el pedido', error);
        // Manejo de errores, por ejemplo, mostrar un mensaje al usuario
      }
    );
  }

}
    );
  }
}
