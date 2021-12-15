package com.example.auctionapp.services;

import com.example.auctionapp.bid.Bid;
import com.example.auctionapp.bid.BidRepository;
import com.example.auctionapp.entity.Item;
import com.example.auctionapp.repository.ItemRepository;
import com.example.auctionapp.security.config.JWTTokenHelper;
import com.example.auctionapp.user.User;
import com.example.auctionapp.user.UserService;
import lombok.AllArgsConstructor;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

import org.springframework.data.domain.Pageable;

import java.util.*;

@Service
@AllArgsConstructor
public class ItemService {

    ItemRepository itemRepository;
    BidRepository bidRepository;
    JWTTokenHelper jwtTokenHelper;
    UserService userService;

    public Page<Item> getAllItems(int page, int size, String order, String orderColumn, Long superCategoryId, Long[] categories, int[] prices) {
        PageRequest pageable;
        Page<Item> statePage;
        if(prices != null){
            if(categories != null){
                return itemRepository.findByCategoryCategoryIdInAndStartingPriceBetween(Arrays.asList(categories), prices[0], prices[1], PageRequest.of(page, size, Sort.by(orderColumn).ascending()));
            }
            if (superCategoryId != null) {
                pageable = PageRequest.of(page, size, Sort.by(orderColumn).ascending());
                return itemRepository.findByCategorySupercategoryIdAndStartingPriceBetween(superCategoryId, prices[0], prices[1], pageable);
            } else {
                if (order != null && orderColumn != null) {
                    if (order.equals("asc")) {
                        pageable = PageRequest.of(page, size, Sort.by(orderColumn).ascending());
                    } else {
                        pageable = PageRequest.of(page, size, Sort.by(orderColumn).descending());
                    }
                } else {
                    pageable = PageRequest.of(page, size);
                }
            }
            statePage = itemRepository.findByStartingPriceBetween(prices[0], prices[1], pageable);
        }else{
            if(categories != null){
                return itemRepository.findByCategoryCategoryIdIn(Arrays.asList(categories), PageRequest.of(page, size, Sort.by(orderColumn).ascending()));
            }
            if (superCategoryId != null) {
                pageable = PageRequest.of(page, size, Sort.by(orderColumn).ascending());
                return itemRepository.findByCategorySupercategoryId(superCategoryId, pageable);
            } else {
                if (order != null && orderColumn != null) {
                    if (order.equals("asc")) {
                        pageable = PageRequest.of(page, size, Sort.by(orderColumn).ascending());
                    } else {
                        pageable = PageRequest.of(page, size, Sort.by(orderColumn).descending());
                    }
                } else {
                    pageable = PageRequest.of(page, size);
                }
            }
            statePage = itemRepository.findAll(pageable);
        }

        for (Item item : statePage) {
            item.setBids(null);
        }
        return statePage;
    }

    public Item fetchItemsById(long itemId) {
        return itemRepository.getByItemId(itemId);
    }

    public ResponseEntity<?> itemBid(HttpServletRequest httpServletRequest, Long itemId, double amount) {
        String token = jwtTokenHelper.getToken(httpServletRequest);
        Optional<User> user = userService.loadUserByEmail(jwtTokenHelper.getUsernameFromToken(token));

        Item item = itemRepository.getByItemId(itemId);

        if (CollectionUtils.isNotEmpty(item.getBids())) {
            Optional<Bid> maxBid = item.getBids().stream()
                    .max(Comparator.comparingDouble(Bid::getAmount));

            if (maxBid.get().getAmount() >= amount) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Amount you entered is too low!");
            }
        } else {
            if (item.getStartingPrice() >= amount) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Amount you entered is too low!");
            }
        }
        Bid bid = new Bid(amount, user.get(), itemId);
        bidRepository.save(bid);
        return ResponseEntity.ok("Bid successfull");
    }
}
