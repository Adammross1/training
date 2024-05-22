import { Routes } from '@angular/router';
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';
import { SearchRecipeComponent } from './search-recipe/search-recipe.component';

export const routes: Routes = [
  { path: 'create-recipe', component: CreateRecipeComponent },
  { path: 'search-recipe', component: SearchRecipeComponent },
];
