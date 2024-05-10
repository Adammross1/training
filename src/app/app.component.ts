import { Component, Signal, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RecipesService } from './core/services/recipes.service';
import { CommonModule } from '@angular/common';
import { map, of } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'training';
  private recipesService = inject(RecipesService);
  private recipesSignal = toSignal(this.recipesService.fetchDetails(['52772', '52773', '52774']));
  protected filteredRecipeData = computed(() => this.recipesSignal()?.map((value) => value.meals[0]).map((recipe) => ({
    strMeal: recipe.strMeal,
    ingredients: this.getIngredients(recipe),
    measurements: this.getMeasurements(recipe),
  })));


  getIngredients = (recipe: any): string[] => {
    const ingredients: string[] = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      if (ingredient) {
        ingredients.push(ingredient);
      }
    }
    return ingredients;
  };
  getMeasurements = (recipe: any): string[] => {
    const measurements: string[] = [];
    for (let i = 1; i <= 20; i++) {
      const measure = recipe[`strMeasure${i}`];
      if (measure) {
        measurements.push(measure);
      }
    }
    return measurements;
  };

  protected recipeNames$ = this.recipesService.fetchName().pipe(
    map((data) => {
      const meals = data.map((response) => response.meals);
      return meals
        .reduce((acc, val) => acc.concat(val), [])
        .map((meal: { strMeal: any }) => meal.strMeal);
    })
  );
}
