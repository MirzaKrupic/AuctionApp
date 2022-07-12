package com.example.auctionapp.repository;

import com.example.auctionapp.entity.Category;
import com.example.auctionapp.entity.TokenGraveyard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GraveyardRepository extends JpaRepository<TokenGraveyard, Long> {

}
