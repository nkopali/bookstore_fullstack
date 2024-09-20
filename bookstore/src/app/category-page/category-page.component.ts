import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book, BooksService } from '../books.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-category-page',
  standalone: true,
  imports: [NgFor],
  templateUrl: './category-page.component.html',
  styleUrl: './category-page.component.css'
})
export class CategoryPageComponent {
  books: Book[] | undefined;
  main_category: string | null = '';

  constructor (private route: ActivatedRoute, private booksService: BooksService, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      this.main_category = param.get('category')
      this.main_category && this.booksService.getByCategory(this.main_category).subscribe((data) => {
        this.books = data;
      });
    })

  }

  onBookClick(book: Book) {
    this.router.navigate(['/books', book.id])
  }
}
