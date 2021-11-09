package com.example.auctionapp.controller;

import com.example.auctionapp.entity.Item;
import com.example.auctionapp.services.ItemService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(path = "api/v1/items")
@AllArgsConstructor
public class ItemController {

    @Autowired
    private ItemService itemService;

    @RequestMapping(method = RequestMethod.GET)
    public @ResponseBody Page<Item> fetchItems(@RequestParam("page") int page,
                                               @RequestParam("size") int size,
                                               @RequestParam(name = "order", required = false) String order,
                                               @RequestParam(name = "orderColumn", required = false) String orderColumn){

        return itemService.getAllItems(page, size, order, orderColumn);
    }
}
