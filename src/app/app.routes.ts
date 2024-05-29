import { Routes } from '@angular/router';
import { ShowRecipeComponent } from './show-recipe/show-recipe.component';
import { SearchRecipeComponent } from './search-recipe/search-recipe.component';
import { NavbarComponent } from './navbar/navbar.component';

export const routes: Routes = [
  {
    path: 'recipe',
    component: NavbarComponent,
    children: [
      {
        path: 'search',
        component: SearchRecipeComponent,
        children: [{ path: 'show/:id', component: ShowRecipeComponent }],
      },
    ],
  },
];
