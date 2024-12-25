package com.example.demo.controller;

import com.example.demo.model.Comment;
import com.example.demo.model.Post;
import com.example.demo.repository.CommentRepository;
import com.example.demo.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class CommentsController {
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private PostRepository postRepository;

    @PostMapping("/add")
    public ResponseEntity<Comment> addComment(@RequestBody Comment comment) {
        // Find the post by pid
        Long pid = comment.getPost().getPid();
        Post post = postRepository.findById(pid)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        int currentCommentsCount = Integer.parseInt(post.getComments());
        currentCommentsCount += 1;
        post.setComments(String.valueOf(currentCommentsCount)); // Convert back to String

        postRepository.save(post);
        // Set additional fields
        comment.setPost(post);
        comment.setTime(LocalDateTime.now());

        // Save the comment to the database
        Comment savedComment = commentRepository.save(comment);

        return new ResponseEntity<>(savedComment, HttpStatus.CREATED);
    }

    @GetMapping("/post/{pid}")
    public List<Comment> getCommentsByPost(@PathVariable Long pid) {
        return commentRepository.findByPostPid(pid);
    }
}
