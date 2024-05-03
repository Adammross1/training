import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RecipesService } from './core/services/recipes.service';
import { CommonModule } from '@angular/common';
import { Observable, map, of, shareReplay } from 'rxjs';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'training';
  protected recipe$: Observable<{strMeal: string, ingredients: string[]}[]> = of([]);
  
  private recipesService = inject(RecipesService);


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
      const meals = data.map(response => response.meals);
      return meals.reduce((acc, val) => acc.concat(val), []).map((meal: { strMeal: any; }) => meal.strMeal);
    })
  );


  getRecipe = (recipeValue: string) => {
    this.recipe$ = this.recipesService.fetchDetails(recipeValue).pipe(
      map(data => {
        const recipes = data.map(response => response.meals[0]);
        return recipes.map(recipe => ({
          strMeal: recipe.strMeal,
          ingredients: this.getIngredients(recipe)
        }));
      }),
    );
  }
}
