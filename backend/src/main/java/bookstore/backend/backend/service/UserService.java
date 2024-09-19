package bookstore.backend.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bookstore.backend.backend.model.User;
import bookstore.backend.backend.repo.UserRepo;
import jakarta.transaction.Transactional;

@Service
public class UserService {
    private final UserRepo userRepo;

    @Autowired
    public UserService(UserRepo userRepo)
    {
        this.userRepo = userRepo;
    }

    public User addUser(User user){
        return userRepo.save(user);
    }

    public User findUserByEmail(String email) {
        return userRepo.findByEmail(email);
    }
    @Transactional
    public void deleteUser(Long id) {
        userRepo.deleteUserById(id);
    }

    public List<User> findAllUsers() {
        return userRepo.findAll();
    }

    public Optional<User> findUserById(Long id) {
        return userRepo.findUserById(id);
    }

    public User updateUser(User user) {
        return userRepo.save(user);
    }
}
