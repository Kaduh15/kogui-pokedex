import { Component, inject, Input, InputSignal } from '@angular/core';
import { LucideAngularModule, LucideIconData } from 'lucide-angular';
import { RouterLink } from "@angular/router";

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