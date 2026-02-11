import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RestaurantService, Restaurant } from '../restaurant';

@Component({
  selector: 'app-restaurant-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './restaurant-list.html',
  styleUrl: './restaurant-list.css'
})
export class RestaurantListComponent implements OnInit {
  restaurants: Restaurant[] = [];
  loading = true;
  error = '';

  constructor(
    private restaurantService: RestaurantService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.loadRestaurants();
  }

  loadRestaurants(): void {
    const isFiltered = this.router.url === '/browse';
    
    const observable = isFiltered
      ? this.restaurantService.getFilteredRestaurants()
      : this.restaurantService.getAllRestaurants();

    observable.subscribe({
      next: (data) => {
        this.restaurants = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load restaurants';
        this.loading = false;
        console.error('Error loading restaurants:', err);
      }
    });
  }
}
