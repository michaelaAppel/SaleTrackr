import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { CreateComponent } from './create/create.component';
import { DetailComponent } from './detail/detail.component';
import { TableComponent } from './table/table.component';
import { ReactiveFormsModule }  from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, NavComponent, FooterComponent, CreateComponent, DetailComponent, TableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'webtech-abgabe';
}