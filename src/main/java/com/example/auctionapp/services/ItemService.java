package com.example.auctionapp.services;

import com.example.auctionapp.bid.Bid;
import com.example.auctionapp.bid.BidRepository;
import com.example.auctionapp.entity.Category;
import com.example.auctionapp.entity.Item;
import com.example.auctionapp.enumeration.Sort;
import com.example.auctionapp.enumeration.Direction;
import com.example.auctionapp.repository.CategoryRepository;
import com.example.auctionapp.repository.ItemRepository;
import com.example.auctionapp.security.config.JWTTokenHelper;
import com.example.auctionapp.user.User;
import com.example.auctionapp.user.UserService;
import lombok.AllArgsConstructor;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

import org.springframework.data.domain.Pageable;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
@AllArgsConstructor
public class ItemService {

    ItemRepository itemRepository;
    CategoryRepository categoryRepository;
    BidRepository bidRepository;
    JWTTokenHelper jwtTokenHelper;
    UserService userService;

    final Integer MIN_PRICE = 0;
    final Integer MAX_PRICE = 1000;

    public Page<Item> getAllItems(int page, int size, Direction order, Sort orderColumn, Long superCategoryId, Long[] categories, Integer minPrice, Integer maxPrice) {
        Page<Item> statePage;

        Pageable pageable = PageRequest.of(page, size);

        if(orderColumn != null){
            if(order.toString().equals("asc")){
                pageable = PageRequest.of(page, size, org.springframework.data.domain.Sort.by(orderColumn.toString()).ascending());
            } else {
                pageable = PageRequest.of(page, size, org.springframework.data.domain.Sort.by(orderColumn.toString()).descending());
            }
        }

        if(minPrice == null){
            minPrice = MIN_PRICE;
        }
        if(maxPrice == null){
            maxPrice = MAX_PRICE;
        }

        if(superCategoryId == null && categories == null){
            List<Category> allCategories = categoryRepository.findAll();
            List<Long> allCategoriesIds = new ArrayList<Long>();
            for(Category i : allCategories){
                allCategoriesIds.add(i.getCategoryId());
            }
            statePage = itemRepository.findItemsFiltered(Long.valueOf(0), allCategoriesIds, minPrice, maxPrice, pageable);
        } else if(superCategoryId == null){
            superCategoryId = Long.valueOf(0);
            statePage = itemRepository.findItemsFiltered(superCategoryId, List.of(categories), minPrice, maxPrice, pageable);
        } else if(categories == null) {
            categories = new Long[0];
            statePage = itemRepository.findItemsFiltered(superCategoryId, List.of(categories), minPrice, maxPrice, pageable);
        } else {
            statePage = itemRepository.findItemsFiltered(superCategoryId, List.of(categories), minPrice, maxPrice, pageable);
        }
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        Date date = new Date();
        statePage = itemRepository.testniQuery(date,pageable);
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

    public List<Item> getItemsByToken(HttpServletRequest httpServletRequest) {
        String token = jwtTokenHelper.getToken(httpServletRequest);
        Optional<User> user = userService.loadUserByEmail(jwtTokenHelper.getUsernameFromToken(token));

        List<Item> items = itemRepository.getByUserUserId(user.get().getUserId());
        for(Item i : items){
            i.setUser(null);
        }
        return items;
    }
}
