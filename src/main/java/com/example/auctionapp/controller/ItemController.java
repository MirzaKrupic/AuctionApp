package com.example.auctionapp.controller;

import com.example.auctionapp.entity.Item;
import com.example.auctionapp.enumeration.Sort;
import com.example.auctionapp.enumeration.Direction;
import com.example.auctionapp.item.AddItemRequest;
import com.example.auctionapp.item.UsersBidsResponse;
import com.example.auctionapp.repository.ItemRepository;
import com.example.auctionapp.services.ItemService;
import com.example.auctionapp.user.User;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/v1")
@AllArgsConstructor
public class ItemController {

    @Autowired
    private ItemService itemService;

    @RequestMapping(method = RequestMethod.GET, path = "/items")
    public @ResponseBody Page<Item> fetchItems(@RequestParam("page") Integer page,
                                               @RequestParam("size") Integer size,
                                               @RequestParam(name = "order", required = false) Direction order,
                                               @RequestParam(name = "orderColumn", required = false) Sort orderColumn,
                                               @RequestParam(name = "superCategoryId", required = false) Long superCategoryId,
                                               @RequestParam(name = "categories", required = false) Long[] categories,
                                               @RequestParam(name = "minPrice", required = false) Long minPrice,
                                               @RequestParam(name = "maxPrice", required = false) Long maxPrice,
                                               @RequestParam(name = "searchParam", required = false) String searchParam){

        return itemService.getAllItems(page, size, order, orderColumn, superCategoryId, categories, minPrice, maxPrice, searchParam);
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

    @PostMapping("/item/additem")
    public ResponseEntity<?> itemAdd(HttpServletRequest httpServletRequest, @RequestBody AddItemRequest addItemRequest) {
        ResponseEntity<?> token = itemService.itemAdd(httpServletRequest,addItemRequest);
        return ResponseEntity.ok(token);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/user/items")
    public @ResponseBody List<Item> fetchItems(HttpServletRequest httpServletRequest){
        return itemService.getItemsByToken(httpServletRequest);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/item/userbids")
    public @ResponseBody List<UsersBidsResponse> fetchUserBids(HttpServletRequest httpServletRequest){
        return itemService.getBidsByToken(httpServletRequest);
    }
}
