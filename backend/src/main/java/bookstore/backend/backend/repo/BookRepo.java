package bookstore.backend.backend.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import bookstore.backend.backend.model.Book;

@Repository
public interface BookRepo extends JpaRepository<Book, Long> {

    @Query("SELECT b FROM Book b WHERE b.title LIKE :title%")
    List<Book> findByTitle(@Param("title") String title);

    @Query("Select b FROM Book b WHERE b.category = :category")
    List<Book> findByCategory(@Param("category") String category);

    @Query("Select DISTINCT b.category FROM Book b ORDER BY b.category ASC")
    List<String> getAllCategories();
}
