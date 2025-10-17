import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { House, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
}
