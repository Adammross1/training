import { Routes } from '@angular/router';
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';
import { SearchRecipeComponent } from './search-recipe/search-recipe.component';
import { NavbarComponent } from './navbar/navbar.component';

export const routes: Routes = [
  { path: 'recipe', component: NavbarComponent, children: [
    { path: 'create', component: CreateRecipeComponent },
    { path: 'search', component: SearchRecipeComponent },
  ]},
];
