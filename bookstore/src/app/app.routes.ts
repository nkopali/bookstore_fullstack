import { Routes } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { CategoryPageComponent } from './category-page/category-page.component';
import { SearchPageComponent } from './search-page/search-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent},
  { path: 'books/:id', component: BookDetailComponent },
  { path: 'category/:category', component: CategoryPageComponent},
  { path: 'search/:title', component: SearchPageComponent},
  { path: '**', component: ErrorPageComponent},
];
