import { Component } from '@angular/core';
import { MenuBase } from '../../../components/menu-base/menu-base';

@Component({
  selector: 'app-menu-administrador',
  templateUrl: './menu.html',
  standalone: true,
  imports: [MenuBase],
})
export class Menu {}