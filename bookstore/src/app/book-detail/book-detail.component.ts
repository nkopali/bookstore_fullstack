import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book, BooksService } from '../books.service';
import { NgFor } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [NgFor, ButtonModule, ToastModule],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css',
  providers: [MessageService]
})
export class BookDetailComponent {
  book: Book | undefined;
  book_id: string | null = '';
  loading: boolean = false

  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService,
    private messageService: MessageService) {}

  ngOnInit(): void {
    this.book_id = this.route.snapshot.paramMap.get('id');

    this.book_id ? this.booksService.getById(this.book_id).subscribe((data) =>{
      this.book = data;
    }) : null;
  }

  onAddToCartClick() {
    this.loading = true

    setTimeout(() => {
        this.loading = false
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Book added to cart!' });
    }, 1000);
  }
}
