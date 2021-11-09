package com.example.auctionapp.services;

import com.example.auctionapp.entity.Item;
import com.example.auctionapp.repository.ItemRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class ItemService {

    ItemRepository itemRepository;

    public Page<Item>getAllItems(int page, int size){
        PageRequest pageable = PageRequest.of(page, size);
        Page<Item> statePage = itemRepository.findAll(pageable);
        return statePage;
    }

    public Page<Item>getAllItemsOrderedByDate(int page, int size, String order){
        PageRequest pageable;
        if(order.equals("asc")){
            pageable = PageRequest.of(page, size, Sort.by("auctionEndDate").ascending());
        }else{
            pageable = PageRequest.of(page, size, Sort.by("auctionEndDate").descending());
        }
        Page<Item> statePage = itemRepository.findAll(pageable);
        return statePage;
    }
}
