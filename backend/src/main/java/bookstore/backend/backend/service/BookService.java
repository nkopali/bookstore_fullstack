package bookstore.backend.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bookstore.backend.backend.model.Book;
import bookstore.backend.backend.repo.BookRepo;

@Service
public class BookService {

    private final BookRepo bookRepo;

    @Autowired
    public BookService(BookRepo bookRepo){
        this.bookRepo = bookRepo;
    }

    public Book addBook(Book book){
        return bookRepo.save(book);
    }

    public List<Book> addBooks(List<Book> books){
        return bookRepo.saveAll(books);
    }

    public List<Book> findBookByTitle (String title){
        return bookRepo.findByTitle(title);
    }

    public List<Book> findAllBooks() {
        return bookRepo.findAll();
    }

    public List<Book> findByCategory (String category){
        return bookRepo.findByCategory(category);
    }

    public List<String> getAllCategories(){
        return bookRepo.getAllCategories();
    }

    public Optional<Book> findById(Long id) {
        return bookRepo.findById(id);
    }
}
