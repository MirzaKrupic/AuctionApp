package com.example.auctionapp.repository;

import com.example.auctionapp.entity.Category;
import com.example.auctionapp.entity.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

    Item getByItemId(long itemId);

    @Query("SELECT i FROM Item i where i.category.supercategoryId = ?1")
    Page<Item> getBySupercategory(Long id, Pageable pageable);
}
