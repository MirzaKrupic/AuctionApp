package com.example.auctionapp.controller;

import com.example.auctionapp.bid.BiddingRequest;
import com.example.auctionapp.entity.Item;
import com.example.auctionapp.security.config.JWTTokenHelper;
import com.example.auctionapp.services.ItemService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping(path = "api/v1")
@AllArgsConstructor
public class ItemController {

    @Autowired
    private ItemService itemService;

    @RequestMapping(method = RequestMethod.GET, path = "/items")
    public @ResponseBody Page<Item> fetchItems(@RequestParam("page") int page,
                                               @RequestParam("size") int size,
                                               @RequestParam(name = "order", required = false) String order,
                                               @RequestParam(name = "orderColumn", required = false) String orderColumn){

        return itemService.getAllItems(page, size, order, orderColumn);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/item/{itemId}")
    public @ResponseBody Item fetchItemsById(@PathVariable("itemId") long itemId){
        return itemService.fetchItemsById(itemId);
    }

    @PostMapping("/item/bid")
    public ResponseEntity<?> itemBid(HttpServletRequest httpServletRequest, @RequestBody BiddingRequest biddingRequest) {
        ResponseEntity<?> token = itemService.itemBid(httpServletRequest, biddingRequest);
        return ResponseEntity.ok(token);
    }
}
