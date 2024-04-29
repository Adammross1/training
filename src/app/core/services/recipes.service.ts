import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private http = inject(HttpClient);

  public fetchDetails(): Observable<any> {
    // Make the HTTP request and return the Observable
    return this.http.get<any>(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771`
    );
  }

  public fetchName(): Observable<any> {
    // Make the HTTP request and return the Observable
    return this.http.get<any>(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=salad`
    );
  }
}
