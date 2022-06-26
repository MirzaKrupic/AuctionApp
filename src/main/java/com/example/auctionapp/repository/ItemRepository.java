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

    List<Item> findAll();


    @Query(nativeQuery = true, value = "SELECT * from item i JOIN category c ON i.category_id = c.category_id WHERE (c.supercategory_id = :supercategoryId or c.category_id in :subcategories) and (i.starting_price between :minPrice and :maxPrice) and (:search_param = '' OR to_tsvector(i.name) @@ plainto_tsquery(:search_param))")
    Page<Item> findItemsFiltered(@Param("supercategoryId")Long supercategoryId, @Param("subcategories")List<Long> subcategories, @Param("minPrice") Long minPrice, @Param("maxPrice") Long maxPrice, @Param("search_param") String search_param, Pageable pageable);

    List<Item> getByUserUserId(Long userId);

    @Query(value = "SELECT i from Item i where :currentDate BETWEEN i.startDate AND i.auctionEndDate")
    Page<Item> testniQuery(@Param("currentDate") Date currentDate, Pageable pageable);
    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(nativeQuery = true, value = "INSERT INTO item(name, photo, starting_price, category_id, user_id, details, auction_end_date, start_date) VALUES(:name, :photo, :starting_price, :category_id, :user_id, :details, :auction_end_date, :start_date)")
    void addNewItem(@Param("name") String name, @Param("photo") String photo, @Param("starting_price") Long starting_price, @Param("category_id") Long category_id, @Param("user_id") Long user_id, @Param("details") String details,  @Param("auction_end_date") Date auction_end_date, @Param("start_date") Date start_date);

    @Query(nativeQuery = true, value="SELECT distinct(i.item_id) from item i JOIN bid b ON i.item_id = b.item_id WHERE b.user_id = 1 GROUP BY i.item_id, b.bid_id")
    List<Item> findUserItemBids();

}
