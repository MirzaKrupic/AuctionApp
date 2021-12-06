package com.example.auctionapp.controller;

import com.example.auctionapp.entity.Category;
import com.example.auctionapp.services.CategoryService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1")
@AllArgsConstructor
public class CategoryController {

    private CategoryService categoryService;

    @RequestMapping(method = RequestMethod.GET, path = "/items/categories")
    public @ResponseBody
    List<Category> fetchItemsShop(){
        return categoryService.fetchCategories();
    }
}
