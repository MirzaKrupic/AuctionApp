package com.example.auctionapp.repository;

import com.example.auctionapp.entity.Item;
import com.example.auctionapp.entity.ItemBid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

    @Query(value = "SELECT i.details, count(b.*), max(b.amount), i.name, i.starting_price, i.photo, i.auction_end_date from item i join bid b on i.item_id = b.item_id where i.item_id = :itemId group by i.name", nativeQuery = true)
    public ItemBid getItemAndMaxBid(long itemId);

    Item getByItemId(long itemId);
}
