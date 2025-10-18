import { Component, Input } from '@angular/core';
import { RouterLink } from "@angular/router";
import { LucideAngularModule, LucideIconData } from 'lucide-angular';

@Component({
  selector: 'app-button-navigate',
  imports: [LucideAngularModule, RouterLink],
  templateUrl: './button-navigate.html'
})
export class ButtonNavigate {
  @Input() icon!: LucideIconData;
  @Input() label: string = '';
  @Input() route: string = '/';
  @Input() active: boolean = false;
}