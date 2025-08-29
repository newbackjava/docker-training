package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/hello")
    public String hello() {
        return "Hello from Spring Boot!";
    }

    @GetMapping("/db-test")
    public String dbTest() {
        try {
            String sql = "SELECT 1 + 1";
            //String sql = "SELECT now()";
            //String result = jdbcTemplate.queryForObject(sql, String.class);
            Integer result = jdbcTemplate.queryForObject(sql, Integer.class);
            return "Database test successful. result  : " + result;
        } catch (Exception e) {
            e.printStackTrace();
            return "Database connection failed! Error: " + e.getMessage();
        }
    }
}