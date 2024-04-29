import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RecipesService } from './core/services/recipes.service';
import { CommonModule } from '@angular/common';
import { map, shareReplay } from 'rxjs';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'training';
  
  private recipesService = inject(RecipesService);

  protected recipe$ = this.recipesService.fetchDetails().pipe(
    map(data => {
      if (data && data.meals && data.meals.length > 0) {
        const meal = data.meals[0];
        return {
          strMeal: meal.strMeal,
          ingredients: this.getIngredients(meal)
        };
      } else {
        return null;
      }
    }),
    // shareReplay(1)
  );

  getIngredients(recipe: any): string[] {
    const ingredients: string[] = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && measure) {
        ingredients.push(`${ingredient} - ${measure}`);
      } else if (ingredient) {
        ingredients.push(ingredient);
      }
    }
    return ingredients;
  }

  protected recipeNames$ = this.recipesService.fetchName().pipe(
    map(data => {
      if (data && data.meals) {
        return data.meals.map((meal: { strMeal: any; }) => meal.strMeal);
      } else {
        return [];
      }
    })
  );
}
