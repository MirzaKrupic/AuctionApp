package com.example.auctionapp.repository;

import com.example.auctionapp.entity.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

}
