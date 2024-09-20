package bookstore.backend.backend;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bookstore.backend.backend.model.LoginDTO;
import bookstore.backend.backend.model.User;
import bookstore.backend.backend.service.UserService;

@RestController
@RequestMapping("/user")
public class UserController
{
    private final UserService userService;

    @Autowired
    public UserController(UserService userService)
    {
        this.userService = userService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers () {
        List<User> users = userService.findAllUsers();
        return new ResponseEntity<>(users,HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> loginUser(@RequestBody LoginDTO loginRequest) {
        User user = userService.findUserByEmail(loginRequest.getEmail());
        Map<String, String> response = new HashMap<>();

        if (user != null && loginRequest.getPassword().equals(user.getPassword())) {
            // Credentials are correct
            response.put("message", "Login successful");
            return ResponseEntity.ok(response);
        } else {
            // Credentials are invalid
            if (user == null) {
                response.put("message", "User doesn't exist");
            } else {
                response.put("message", "Wrong Password");
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<User> getUser (@PathVariable("id") Long id) {
        Optional<User> user = userService.findUserById(id);
        return user.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
            .orElseGet(() -> new ResponseEntity<>(null, HttpStatus.NOT_FOUND));
    }

    @PostMapping("/signup")
    public ResponseEntity<Map<String, String>> addUser(@RequestBody User user){
        Map<String, String> response = new HashMap<>();

        User newUser = userService.findUserByEmail(user.getEmail());

        if (newUser != null) {
            response.put("message", "User already exists");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        userService.addUser(user);
        response.put("message", "Sign Up successful");
        return ResponseEntity.ok(response);

    }

    @PutMapping("/update")
    public ResponseEntity<User> updateUser(@RequestBody User user){
        User updateUser = userService.updateUser(user);
        return new ResponseEntity<>(updateUser,HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable("id") Long id){
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
