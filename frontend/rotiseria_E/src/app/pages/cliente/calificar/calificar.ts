import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { PedidoService } from '../../../services/pedido';
import { ValoracionService } from '../../../services/valoracion.service';
import { AuthService } from '../../../services/auth';
import { OrdenItem } from '../../../interfaces/pedido.interfaces';

interface ValoracionExistente {
  id_valoracion: number;
  id_prod: number;
  calificacion: number;
  comentario: string;
  producto: string;
}

@Component({
  selector: 'app-calificar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './calificar.html',
  styleUrl: './calificar.css'
})
export class Calificar implements OnInit {
  pedidoId: number | null = null;
  ordenes: OrdenItem[] = [];
  cargando = true;
  enviando = false;
  enviado = false;
  error = '';

  // Valoraciones nuevas (formulario)
  valoraciones: { [id_prod: number]: { calificacion: number; comentario: string } } = {};
  hoverStars: { [id_prod: number]: number } = {};

  // Valoraciones ya existentes
  valoracionesExistentes: { [id_prod: number]: ValoracionExistente } = {};
  yaCalifico = false;

  starsArray = [1, 2, 3, 4, 5];

  constructor(
    private route: ActivatedRoute,
    private pedidoService: PedidoService,
    private valoracionService: ValoracionService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['pedidoId']) {
        this.pedidoId = Number(params['pedidoId']);
        this.cargarOrdenes();
      } else {
        this.cargando = false;
      }
    });
  }

  cargarOrdenes(): void {
    if (!this.pedidoId) return;
    this.pedidoService.getOrdenesByPedidoId(this.pedidoId).subscribe({
      next: (res) => {
        this.ordenes = res.ordenes || [];
        this.ordenes.forEach(o => {
          this.valoraciones[o.producto.id_prod] = { calificacion: 0, comentario: '' };
        });
        this.cargarValoracionesExistentes();
      },
      error: () => {
        this.cargando = false;
        this.error = 'No se pudo cargar el detalle del pedido.';
      }
    });
  }

  cargarValoracionesExistentes(): void {
    const userId = this.authService.getUserId();
    if (!userId) { this.cargando = false; return; }

    this.valoracionService.getValoracionesByUser(Number(userId)).subscribe({
      next: (res) => {
        const todasValoraciones: ValoracionExistente[] = res.valoraciones || [];
        const idsProdPedido = this.ordenes.map(o => o.producto.id_prod);

        // Filtramos solo las valoraciones de los productos de ESTE pedido
        const delPedido = todasValoraciones.filter(v => idsProdPedido.includes(v.id_prod));

        if (delPedido.length > 0) {
          delPedido.forEach(v => {
            this.valoracionesExistentes[v.id_prod] = v;
          });
          this.yaCalifico = true;
        }

        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
      }
    });
  }

  setEstrella(id_prod: number, valor: number): void {
    this.valoraciones[id_prod].calificacion = valor;
  }

  confirmar(): void {
    const userId = this.authService.getUserId();
    if (!userId) return;

    if (this.ordenes.length === 0) {
      this.error = 'No hay productos para calificar.';
      return;
    }

    const sinCalificar = this.ordenes.some(
      o => this.valoraciones[o.producto.id_prod]?.calificacion === 0
    );
    if (sinCalificar) {
      this.error = 'Por favor calificá todos los productos con al menos 1 estrella.';
      return;
    }

    this.enviando = true;
    this.error = '';

    const envios = this.ordenes.map(o => ({
      id_user: Number(userId),
      id_prod: o.producto.id_prod,
      calificacion: this.valoraciones[o.producto.id_prod].calificacion,
      comentario: this.valoraciones[o.producto.id_prod].comentario || '(Sin comentario)'
    }));

    let completados = 0;
    let errores = 0;

    envios.forEach(v => {
      this.valoracionService.crearValoracion(v).subscribe({
        next: () => {
          completados++;
          if (completados + errores === envios.length) this.finalizar(errores);
        },
        error: () => {
          errores++;
          if (completados + errores === envios.length) this.finalizar(errores);
        }
      });
    });
  }

  finalizar(errores: number): void {
    this.enviando = false;
    if (errores === 0) {
      this.enviado = true;
    } else {
      this.error = 'Algunas valoraciones no se pudieron enviar. Intentá de nuevo.';
    }
  }

  // Devuelve array para pintar estrellas en modo lectura
  starsFilled(n: number): number[] {
    return Array(n).fill(0);
  }
  starsEmpty(n: number): number[] {
    return Array(5 - n).fill(0);
  }
}