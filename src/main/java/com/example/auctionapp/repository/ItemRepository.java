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

    @Query("SELECT i from Item i WHERE (:supercategoryId is null or i.category.supercategoryId = :supercategoryId) and (:subcategories is null or i.category.categoryId in :subcategories) and (:minPrice is null or i.startingPrice>= :minPrice) and (:maxPrice is null or i.startingPrice <= :maxPrice)")
    Page<Item> findItemsFiltered(@Param("supercategoryId")Long supercategoryId, @Param("subcategories")Long[] subcategories, @Param("minPrice") Integer minPrice, @Param("maxPrice") Integer maxPrice, Pageable pageable);
}
