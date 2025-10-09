import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-mensajes', 
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    NgClass
  ],
  templateUrl: './mensajes-component.html', 
  styleUrl: './mensajes-component.css' 
})
export class MensajesComponent {
  
  @Input({ required: true }) title!: string;
  @Input() message: string | null = null;
  @Input({ required: true }) buttonText!: string;
  @Input({ required: true }) buttonLink!: string; 
  @Input() titleColorClass: string = 'text-naranja'; 
}