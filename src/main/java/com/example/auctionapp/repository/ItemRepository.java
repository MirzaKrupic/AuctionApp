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

    @Query("SELECT i from Item i WHERE (i.category.supercategoryId = :supercategoryId or i.category.categoryId in :subcategories) and (i.startingPrice between :minPrice and :maxPrice)")
    Page<Item> findItemsFiltered(@Param("supercategoryId")Long supercategoryId, @Param("subcategories")List<Long> subcategories, @Param("minPrice") Integer minPrice, @Param("maxPrice") Integer maxPrice, Pageable pageable);
}
