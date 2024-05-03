import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private http = inject(HttpClient);

  public fetchDetails(recipeId: string): Observable<any[]> {
    // Make the HTTP request and return the Observable
    return forkJoin([
      this.http.get<any>(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
      ),
      this.http.get<any>(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
      ),
      this.http.get<any>(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
      ),
    ]);
  }

  public fetchName(): Observable<any[]> {
    // Make the HTTP request and return the Observable
    return forkJoin([
      this.http.get<any>(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=salad`
      ),
      this.http.get<any>(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=spaghetti`
      ),
      this.http.get<any>(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=chicken`
      ),
    ]);
  }
}
