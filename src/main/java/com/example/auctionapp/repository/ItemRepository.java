package com.example.auctionapp.repository;

import com.example.auctionapp.entity.Category;
import com.example.auctionapp.entity.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

    Item getByItemId(long itemId);

    Page<Item> findByCategorySupercategoryId(Long categoryId, Pageable pageable);

    Page<Item> findByCategoryCategoryIdIn(List<Long> ids, Pageable pageable);

    Page<Item> findByStartingPriceBetween(int fromPrice, int toPrice, Pageable pageable);

    Page<Item> findByCategoryCategoryIdInAndStartingPriceBetween(List<Long> ids, int fromPrice, int toPrice, Pageable pageable);

    Page<Item> findByCategorySupercategoryIdAndStartingPriceBetween(Long categoryId, int fromPrice, int toPrice, Pageable pageable);
}
