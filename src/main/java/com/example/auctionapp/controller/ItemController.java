package com.example.auctionapp.controller;

import com.example.auctionapp.entity.Item;
import com.example.auctionapp.enumeration.Sort;
import com.example.auctionapp.enumeration.Direction;
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
                                               @RequestParam(name = "order", required = false) Direction order,
                                               @RequestParam(name = "orderColumn", required = false) Sort orderColumn,
                                               @RequestParam(name = "superCategoryId", required = false) Long superCategoryId,
                                               @RequestParam(name = "categories", required = false) Long[] categories,
                                               @RequestParam(name = "minPrice", required = false) Integer minPrice,
                                               @RequestParam(name = "maxPrice", required = false) Integer maxPrice){

        return itemService.getAllItems(page, size, order, orderColumn, superCategoryId, categories, minPrice, maxPrice);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/item/{itemId}")
    public @ResponseBody Item fetchItemsById(@PathVariable("itemId") long itemId){
        return itemService.fetchItemsById(itemId);
    }

    @PostMapping("/item/{itemId}/bid")
    public ResponseEntity<?> itemBid(HttpServletRequest httpServletRequest, @PathVariable("itemId") long itemId, @RequestBody double amount) {
        ResponseEntity<?> token = itemService.itemBid(httpServletRequest,itemId, amount);
        return ResponseEntity.ok(token);
    }
}
