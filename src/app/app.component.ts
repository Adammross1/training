import { Component, Signal, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RecipesService } from './core/services/recipes.service';
import { CommonModule } from '@angular/common';
import { Observable, Subject, map, of } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { FocusDetailsDirective } from './focus-details.directive';
import { HighlightMeDirective } from './highlight-me.directive';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    HighlightMeDirective,
    FocusDetailsDirective,
    ReactiveFormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'training';
  private recipesService = inject(RecipesService);
  private formBuilder = inject(FormBuilder)

  protected recipeSearchFormGroup = this.formBuilder.group({
    recipeSearchControl: [''],
    nameControl: ['']
  })

  get recipeSearch() {
    return this.recipeSearchFormGroup.controls.recipeSearchControl;
  }
  private recipesSignal = toSignal(
    this.recipesService.fetchDetails(['52772', '52773', '52774'])
  );
  protected filteredRecipeData = computed(() =>
    this.recipesSignal()
      ?.map((value) => value.meals[0])
      .map((recipe) => ({
        strMeal: recipe.strMeal,
        ingredients: this.getIngredients(recipe),
        measurements: this.getMeasurements(recipe),
      }))
  );

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

  protected recipeNamesSignal = signal<string[]>([]);
  protected recipeSearchParam = '';
  protected searchRecipe = (searchParam: string) => {
    console.log(searchParam);
    this.recipesService
      .fetchName(searchParam)
      .pipe(
        map((data) => {
          const meals = data.meals;
          if (!meals) {
            return ['sorry, no results'];
          }
          return meals.map((meal: { strMeal: any }) => meal.strMeal);
        })
      )
      .subscribe((recipes) => {
        this.recipeNamesSignal.set(recipes);
      });
  };

  protected color = 'yellow';
  protected selectedStyle: string | undefined;

  selectStyle(style: string) {
    this.selectedStyle = style;
  }
}
