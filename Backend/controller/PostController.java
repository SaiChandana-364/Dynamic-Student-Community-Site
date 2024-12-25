package com.example.demo.controller;

import com.example.demo.model.Post;
import com.example.demo.repository.PostRepository;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.logging.Logger;

@RestController
@CrossOrigin("http://localhost:3000")
public class PostController {
    @Autowired
    private PostRepository postRepository;  // Inject PostRepository

    @PostMapping("/create")
    public ResponseEntity<Post> createPost(@RequestBody Post post) {
        // Validate data
        post.setTime(String.valueOf(new Date()));  // Set creation time

        Post savedPost = postRepository.save(post);  // Save post to database
        return new ResponseEntity<>(savedPost, HttpStatus.CREATED);
    }
    @GetMapping("/show")
    public List<Post>
    getTop10Posts() {
        return postRepository.findTop10ByOrderByPidDesc();
    }
    @GetMapping("/posts")
    public List<Post> getPostsByType(@RequestParam(required = false) String type) {
        if (type != null) {
            return postRepository.findByType(type);
        }
        return postRepository.findAll(); // Returns all posts if no type is specified
    }
    @PutMapping("/updateLikes")
    public ResponseEntity<String> updateLikes(@RequestBody Map<String, Object> request) {
        // Extracting pid and likes from the request body
        Long pid = ((Number) request.get("pid")).longValue();
        int likes = (int) request.get("likes");

        // Find the post by ID
        Post post = postRepository.findById(pid)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        // Update the likes count
        post.setLikes(String.valueOf(likes));
        postRepository.save(post);

        return ResponseEntity.ok("Likes updated successfully");
    }

}