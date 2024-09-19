package bookstore.backend.backend;

import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.filter.CorsFilter;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import bookstore.backend.backend.model.Book;
import bookstore.backend.backend.service.BookService;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	CommandLineRunner runner(BookService bookService){
		return args -> {
			ObjectMapper mapper = new ObjectMapper();
			TypeReference<List<Book>> typeReference = new TypeReference<List<Book>>(){};
			InputStream inputStream = TypeReference.class.getResourceAsStream("/json/books_data.json");
			try
			{
				List<Book> books = mapper.readValue(inputStream, typeReference);
				bookService.addBooks(books);
				System.out.println("Book added");
			} catch (IOException e) {
				System.out.println("Unable to add book: " + e.getMessage());
			}
		};
	}

	@Bean
	public CorsFilter corsFilter() {
		CorsConfiguration corsConfig = new CorsConfiguration();
		corsConfig.setAllowCredentials(true);
		corsConfig.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
		corsConfig.setAllowedHeaders(Arrays.asList(
			"Origin", "Access-Control-Allow-Origin", "Content-Type", "Accept",
			"Authorization", "Origin, Accept", "X-Requested-With",
			"Access-Control-Request-Method", "Access-Control-Request-Headers"
		));
		corsConfig.setExposedHeaders(Arrays.asList(
			"Origin", "Content-Type", "Accept", "Authorization",
			"Access-Control-Allow-Origin", "Access-Control-Allow-Credentials"
		));
		corsConfig.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS")); // Allowed HTTP methods

		UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
		urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfig); // Apply CORS config to all routes

		return new CorsFilter(urlBasedCorsConfigurationSource);
	}
}
