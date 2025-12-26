package com.mongodb.examples.springdatabulkinsert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
public class ProductWebController {

    @Autowired
    private MongoTemplate mongoTemplate;

    @GetMapping("/products/search")
    public Map<String, Object> searchProducts(
            @RequestParam(required = false) String name,
            HttpSession session) {
        
        @SuppressWarnings("unchecked")
        List<String> searchHistory = (List<String>) session.getAttribute("searchHistory");
        if (searchHistory == null) {
            searchHistory = new ArrayList<>();
        }
        
        // Defines the default search if no name is provided
        if (name == null || name.trim().isEmpty()) {
            name = "product";
        }
        
        // Adds the current search to history
        searchHistory.add(name);
        session.setAttribute("searchHistory", searchHistory);
        
        // Queries the "name" field in the "products" collection
        Query query = new Query(Criteria.where("name").regex(name, "i"));
        
        List<Product> products = mongoTemplate.find(query, Product.class, "products");
        
        return Map.of(
            "products", products,
            "sessionId", session.getId()
        );
    }
    
    @GetMapping("/products/history")
    public Map<String, Object> getSearchHistory(HttpSession session) {

        // Retrieves the search history from the session
        @SuppressWarnings("unchecked")
        List<String> searchHistory = (List<String>) session.getAttribute("searchHistory");
        if (searchHistory == null) {
            searchHistory = new ArrayList<>();
        }
        
        return Map.of(
            "searchHistory", searchHistory,
            "sessionId", session.getId(),
            "searchCount", searchHistory.size()
        );
    }
    
}