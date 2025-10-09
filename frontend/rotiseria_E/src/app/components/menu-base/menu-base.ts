import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu-base',
  templateUrl: './menu-base.html',
  standalone: true,
  imports: [CommonModule, RouterModule], 
})
export class MenuBase {
  @Input() basePath!: string;
  @Input() items: { text: string; link: string }[] = [];
}