package bookstore.backend.backend;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bookstore.backend.backend.model.Book;
import bookstore.backend.backend.service.BookService;

@RestController
@RequestMapping("/book")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService)
    {
        this.bookService = bookService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Book>> getAllBooks(){
        List<Book> books = bookService.findAllBooks();
        return new ResponseEntity<>(books, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookByTitle(@PathVariable("id") Long id){
        Optional<Book> book = bookService.findById(id);

        return book.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
            .orElseGet(() -> new ResponseEntity<>(null, HttpStatus.NOT_FOUND));
    }


    @GetMapping("/title/{title}")
    public ResponseEntity<List<Book>> getBookByTitle(@PathVariable("title") String title){
        List<Book> book = bookService.findBookByTitle(title);
        return new ResponseEntity<>(book, HttpStatus.OK);
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Book>> getBooksByCategory(@PathVariable("category") String category) {
        List<Book> books = bookService.findByCategory(category);
        return new ResponseEntity<>(books, HttpStatus.OK);
    }

    @GetMapping("/categories")
    public ResponseEntity<List<String>> getAllCategories() {
        List<String> categories = bookService.getAllCategories();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }
}
