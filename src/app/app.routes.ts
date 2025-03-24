import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';
import { CreateComponent } from './create/create.component';
import { TableComponent } from './table/table.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
    { path: "", component: HomeComponent, pathMatch: 'full' },
    { path: "parcel/:id", component: DetailComponent},
    { path: "about", component: AboutComponent},
    { path: "create", component: CreateComponent},
    { path: "table", component: TableComponent},
    { path: "**", redirectTo: "" }
];