package bookstore.backend.backend.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import bookstore.backend.backend.model.User;

@Repository
public interface UserRepo extends JpaRepository<User, Long>{
    void deleteUserById(Long id);

    Optional<User> findUserById(Long id);

    User findByEmail(String email);
}
