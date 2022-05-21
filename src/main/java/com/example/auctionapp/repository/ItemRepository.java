package com.example.auctionapp.repository;

import com.example.auctionapp.entity.Category;
import com.example.auctionapp.entity.Item;
import com.example.auctionapp.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

    Item getByItemId(long itemId);

    @Query("SELECT i from Item i WHERE (i.category.supercategoryId = :supercategoryId or i.category.categoryId in :subcategories) and (i.startingPrice between :minPrice and :maxPrice)")
    Page<Item> findItemsFiltered(@Param("supercategoryId")Long supercategoryId, @Param("subcategories")List<Long> subcategories, @Param("minPrice") Integer minPrice, @Param("maxPrice") Integer maxPrice, Pageable pageable);

    List<Item> getByUserUserId(Long userId);

    @Query(value = "SELECT i from Item i where :currentDate BETWEEN i.startDate AND i.auctionEndDate")
    Page<Item> testniQuery(@Param("currentDate") Date currentDate, Pageable pageable);
}
