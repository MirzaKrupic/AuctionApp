package com.example.auctionapp.services;

import com.example.auctionapp.entity.Category;
import com.example.auctionapp.repository.CategoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CategoryService {

    private CategoryRepository categoryRepository;

    public List<Category> fetchCategories() {
        return categoryRepository.findAll();
    }
}
