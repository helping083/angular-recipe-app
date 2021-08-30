import { NgModule } from '@angular/core';
import { Routes, Router, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipesResolverService } from './recipes/recipes-resolver.service';
import { AuthComponentComponent } from './auth/auth-component/auth-component.component';
import { AuthGuard } from './auth/auth.guard';
import { RxjsTestComponent } from './rxjs-test/rxjs-test.component';

const appRoutes: Routes = [
    {
        path: 'recipes', component: RecipesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: RecipeStartComponent },
            { path: 'new', component: RecipeEditComponent },
            { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService] },
            { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService] }
        ]
    },
    { path: 'rxjs', component: RxjsTestComponent },
    { path: 'shopping-list', component: ShoppingListComponent },
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'auth', component: AuthComponentComponent },
    { path: '**',  redirectTo: '/recipes' }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})


export class AppRoutingModule {

}