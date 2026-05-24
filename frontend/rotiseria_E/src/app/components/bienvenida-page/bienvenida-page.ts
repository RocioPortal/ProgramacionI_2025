import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

interface OnboardingStep { 
  imageSrc: string;
  imageAlt: string;
  title: string;
  text: string;
  buttonText: string;
  nextLink: string;
}

@Component({                        
  selector: 'app-bienvenida-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './bienvenida-page.html', 
  styleUrls: ['./bienvenida-page.css'] 
})
export class BienvenidaPage implements OnInit {

  currentStep: OnboardingStep | undefined;
  private allSteps: OnboardingStep[] = [        
    {
      imageSrc: 'assets/bienvenida1/image.png',
      imageAlt: 'Elegí tu producto favorito',
      title: 'Elegí tu producto favorito',
      text: 'Desde la comodidad de tu casa, disfruta de comida casera.',
      buttonText: 'SIGUIENTE',
      nextLink: '/bienvenida/2'
    },
    {
      imageSrc: 'assets/bienvenida2/image.png',
      imageAlt: 'Paga desde tu casa',
      title: 'Paga desde tu casa',
      text: 'Elegí tu método de pago de preferencia.',
      buttonText: 'SIGUIENTE',
      nextLink: '/bienvenida/3'
    },
    {
      imageSrc: 'assets/bienvenida3/image.png',
      imageAlt: 'Come rico y casero',
      title: 'Come rico y casero',
      text: 'Disfruta de un sabroso plato a un precio increíble.',
      buttonText: 'COMENZAR',
      nextLink: '/login'         
    }
  ];

  constructor(private route: ActivatedRoute) { }  
  ngOnInit(): void {                       
    this.route.paramMap.subscribe(params => {
      const stepParam = params.get('step');
      const stepNumber = stepParam ? parseInt(stepParam, 10) : 1;
      this.currentStep = this.allSteps[stepNumber - 1];
    });
  }
}