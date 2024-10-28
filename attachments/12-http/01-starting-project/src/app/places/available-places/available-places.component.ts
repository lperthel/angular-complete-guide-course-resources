import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  places = signal<Place[] | undefined>(undefined);
  isFetching = signal(false);
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  error = signal<string>('');
  private placesService = inject(PlacesService);
  ngOnInit() {
    this.isFetching.set(true);

    const subscription1 = this.getUserPlaces();
    // const subscription2 = this.subscribeToEvents();

    this.destroyRef.onDestroy(() => subscription1.unsubscribe());
  }

  getUserPlaces() {
    return this.placesService.loadAvailablePlaces().subscribe({
      next: (resData) => {
        console.log(resData);
        this.places.set(resData);
      },
      error: (error: Error) => {
        console.log(error);
        this.error.set(error.message);
      },
      complete: () => {
        this.isFetching.set(false);
      },
    });
  }

  handleSelectPlace(selectedPlace: Place) {
    console.log(`selected ${selectedPlace.id}`);
    const putSubscription = this.placesService
      .addPlaceToUserPlaces(selectedPlace)
      .subscribe({
        // error: (error: Error) => console.log(error),
      });
    this.destroyRef.onDestroy(() => putSubscription.unsubscribe());
  }

  subscribeToEvents() {
    return this.httpClient
      .get<{ places: Place[] }>('http://localhost:3000/places', {
        observe: 'events',
      })
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        complete: () => {
          this.isFetching.set(false);
        },
      });
  }
}
