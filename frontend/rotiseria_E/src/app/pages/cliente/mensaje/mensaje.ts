import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { MensajesComponent } from '../../../components/mensajes/mensajes-component'; 

interface MessageData {
  title: string;
  message: string | null;
  buttonText: string;
  buttonLink: string;
  titleColorClass: string;
}

@Component({
  selector: 'app-mensaje-page',
  standalone: true,
  imports: [
    CommonModule,
    MensajesComponent 
  ],
  templateUrl: './mensaje.html', 
  styleUrl: './mensaje.css'
})
export class MensajePage implements OnInit { 
  
  messageData: MessageData | null = null; 

  private readonly messagesConfig: Record<string, MessageData> = {
    'pedido': {
      title: 'Felicitaciones!',
      message: 'Tu pedido se realizó con éxito.',
      buttonText: 'VER ESTADO DEL PEDIDO',
      buttonLink: '/cliente/notificaciones', 
      titleColorClass: 'text-naranja'
    },
    'calificar': {
      title: 'Gracias por tu comentario',
      message: null, 
      buttonText: 'Volver al menú',
      buttonLink: '/cliente/menu', 
      titleColorClass: 'text-marron'
    }
  };

  private readonly errorData: MessageData = {
    title: 'Error',
    message: 'Mensaje no encontrado.',
    buttonText: 'VOLVER AL INICIO',
    buttonLink: '/cliente/menu',
    titleColorClass: 'text-naranja'
  };

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const type = this.route.snapshot.paramMap.get('type') as string;
    
    const data = this.messagesConfig[type] || this.errorData;
    
    this.messageData = data;
  }
}