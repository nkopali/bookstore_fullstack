import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BookListComponent } from '../book-list/book-list.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [BookListComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
