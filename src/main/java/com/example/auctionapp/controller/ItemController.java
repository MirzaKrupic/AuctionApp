package com.example.auctionapp.controller;

import com.example.auctionapp.authentication.AuthenticationRequest;
import com.example.auctionapp.bid.BiddingRequest;
import com.example.auctionapp.entity.Item;
import com.example.auctionapp.entity.ItemBid;
import com.example.auctionapp.security.config.JWTTokenHelper;
import com.example.auctionapp.services.ItemService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(path = "api/v1/items")
@AllArgsConstructor
public class ItemController {

    @Autowired
    private ItemService itemService;

    @Autowired
    private JWTTokenHelper jwtTokenHelper;

    @RequestMapping(method = RequestMethod.GET)
    public @ResponseBody Page<Item> fetchItems(@RequestParam("page") int page,
                                               @RequestParam("size") int size,
                                               @RequestParam(name = "order", required = false) String order,
                                               @RequestParam(name = "orderColumn", required = false) String orderColumn){

        return itemService.getAllItems(page, size, order, orderColumn);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/info")
    public @ResponseBody ItemBid fetchItemsById(@RequestParam("itemId") long itemId){
        return itemService.fetchItemsById(itemId);
    }

    @PostMapping("bid")
    public ResponseEntity<?> itemBid(HttpServletRequest httpServletRequest, @RequestBody BiddingRequest biddingRequest) {
        System.out.println(jwtTokenHelper.getToken(httpServletRequest));
        System.out.println(biddingRequest);
        ResponseEntity<?> token = itemService.itemBid(httpServletRequest, biddingRequest);
        return ResponseEntity.ok(token);
    }
}
