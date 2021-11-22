package com.example.auctionapp.bid;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BidRepository extends JpaRepository<Bid, Long> {

    @Query(value = "SELECT count(*) from bid where item_id = :itemId", nativeQuery = true)
    int countBidsForItem(Long itemId);

    @Query(value = "SELECT max(amount) from bid where item_id = :itemId", nativeQuery = true)
    double getHighestBidAmountByItemId(Long itemId);
}
