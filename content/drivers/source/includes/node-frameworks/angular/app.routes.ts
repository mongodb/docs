import { Routes } from '@angular/router';
import { RestaurantListComponent } from './restaurant-list/restaurant-list';

export const routes: Routes = [
  { path: '', component: RestaurantListComponent },
  { path: 'browse', component: RestaurantListComponent }
];
