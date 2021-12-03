package com.example.auctionapp.repository;

import com.example.auctionapp.entity.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.domain.Pageable;
import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    Page<Category> findAllByName(String name, Pageable pageable);

    List<Category> findAll();
}
