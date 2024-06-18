import { Component, Signal, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { RecipesService } from '../core/services/recipes.service';
import { CommonModule } from '@angular/common';
import { Observable, Subject, map, of } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { FocusDetailsDirective } from '../focus-details.directive';
import { HighlightMeDirective } from '../highlight-me.directive';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CustomCardComponent } from "../custom-card/custom-card.component";

@Component({
    selector: 'app-search-recipe',
    standalone: true,
    templateUrl: './search-recipe.component.html',
    styleUrl: './search-recipe.component.scss',
    imports: [
        RouterOutlet,
        CommonModule,
        HighlightMeDirective,
        FocusDetailsDirective,
        ReactiveFormsModule,
        RouterLink,
        RouterLinkActive,
        CustomCardComponent
    ]
})
export class SearchRecipeComponent {
  private recipesService = inject(RecipesService);
  private formBuilder = inject(FormBuilder);
  protected outerFormGroup = this.formBuilder.group({
    recipeSearchFormArray: this.formBuilder.array([
      this.formBuilder.control('', Validators.required),
    ]),
  });
  get recipeSearchFormArray() {
    return this.outerFormGroup.controls.recipeSearchFormArray;
  }
  protected addFormGroup = () => {
    this.recipeSearchFormArray.push(
      this.formBuilder.control('', Validators.required)
    );
  };
  protected removeFormGroup = (index: number) => {
    if (this.recipeSearchFormArray.length > 0) {
      this.recipeSearchFormArray.removeAt(index);
    }
  };

  private recipesSignal = toSignal(this.recipesService.fetchDetails(52772));
  protected filteredRecipeData = computed(() => {
    const value = this.recipesSignal();
    if (value && value.meals && value.meals.length > 0) {
      const recipe = value.meals[0];
      return {
        strMeal: recipe.strMeal,
        id: recipe.id,
        ingredients: this.getIngredients(recipe),
        measurements: this.getMeasurements(recipe),
      };
    }
    return null;
  });

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

  protected recipeNamesSignal = signal<{ strMeal: any; id: any }[]>([]);
  protected recipes: { strMeal: any; id: any }[] = [];
  protected isSubmitted = false;
  protected searchRecipe = () => {
    this.isSubmitted = true;
    if (this.outerFormGroup.valid) {
      this.recipes = [];
      this.recipeSearchFormArray.value
        .filter((searchParam): searchParam is string => !!searchParam)
        .forEach((searchParam) => {
          this.recipesService
            .fetchName(searchParam)
            .pipe(
              map((data) => {
                const meals = data.meals;
                if (!meals) {
                  return [{ strMeal: 'sorry, no results', id: null }];
                }
                return meals.map((meal: { strMeal: any; idMeal: any }) => ({
                  strMeal: meal.strMeal,
                  id: meal.idMeal,
                }));
              })
            )
            .subscribe((response: { strMeal: any; id: any }[]) => {
              response.forEach((recipe) => {
                this.recipes.push(recipe);
              });
            });
        });
      this.recipeNamesSignal.set(this.recipes);
      this.isSubmitted = false;
    }
  };

  protected color = 'yellow';
  protected selectedStyle: string | undefined;

  selectStyle(style: string) {
    this.selectedStyle = style;
  }
}
