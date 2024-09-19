import { Component } from '@angular/core';
import { Book, BooksService } from '../books.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [NgFor],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent {
  books: Book[] | undefined;
  search_term: string | null = '';

  constructor (private route: ActivatedRoute, private booksService: BooksService, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      this.search_term = param.get('title')

      this.search_term ? this.booksService.getByTitle(this.search_term).subscribe((data) => {
        this.books = data;
      }) : null;
    });

  }

  onBookClick(book: Book) {
    this.router.navigate(['/books', book.id])
  }

}
