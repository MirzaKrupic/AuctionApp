package com.example.auctionapp.repository;

import com.example.auctionapp.entity.Category;
import com.example.auctionapp.entity.Item;
import com.example.auctionapp.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

    Item getByItemId(long itemId);

    @Query("SELECT i from Item i WHERE (i.category.supercategoryId = :supercategoryId or i.category.categoryId in :subcategories) and (i.startingPrice between :minPrice and :maxPrice)")
    Page<Item> findItemsFiltered(@Param("supercategoryId")Long supercategoryId, @Param("subcategories")List<Long> subcategories, @Param("minPrice") Long minPrice, @Param("maxPrice") Long maxPrice, Pageable pageable);

    List<Item> getByUserUserId(Long userId);

    @Query(value = "SELECT i from Item i where :currentDate BETWEEN i.startDate AND i.auctionEndDate")
    Page<Item> testniQuery(@Param("currentDate") Date currentDate, Pageable pageable);
    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(nativeQuery = true, value = "INSERT INTO item(name, photo, starting_price, category_id, user_id, details, auction_end_date, start_date) VALUES(:name, :photo, :starting_price, :category_id, :user_id, :details, :auction_end_date, :start_date)")
    void addNewItem(@Param("name") String name, @Param("photo") String photo, @Param("starting_price") Long starting_price, @Param("category_id") Long category_id, @Param("user_id") Long user_id, @Param("details") String details,  @Param("auction_end_date") Date auction_end_date, @Param("start_date") Date start_date);
}
