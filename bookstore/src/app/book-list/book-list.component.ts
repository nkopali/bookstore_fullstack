import { Component } from '@angular/core';
import { Book, BooksService } from '../books.service';
import { CommonModule, NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [NgFor, ToastModule, CommonModule, ButtonModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
  providers: [MessageService]
})
export class BookListComponent {
  constructor(
    private booksService: BooksService,
    private router: Router,
    private messageService: MessageService
  ){}

  loadingStates: { [key: string]: boolean } = {};
  books: Book[] | undefined;

  ngOnInit(): void {
    this.booksService.getAll().subscribe((data: Book[]) => {
      this.books = data;
    }, (error) => {console.error("Error fetching books ", error)})
  }

  onBookClick(book: any) {
    // Navigate to the book detail page or handle the click event
    console.log(book)
    this.router.navigate(['/books', book.id]);
  }

  onAddToCartClick(event: Event, book: any, index: number){
    event.stopPropagation();
    console.log("Added to Cart ", book.title)

    this.loadingStates[index] = true;

    setTimeout(() => {
      this.loadingStates[index] = false;

      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Book added to cart!' });
    }, 1000);
  }

  onScroll(event: WheelEvent): void {
    const bookList = event.currentTarget as HTMLElement;

    // Adjust the scroll amount based on the wheel delta
    bookList.scrollLeft += event.deltaY;
    event.preventDefault(); // Prevent default vertical scroll behavior

  }

}
