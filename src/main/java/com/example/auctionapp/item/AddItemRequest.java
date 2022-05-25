package com.example.auctionapp.item;

import java.util.Date;

public class AddItemRequest {
    private String name;
    private String description;
    private Long categoryId;
    private String image;
    private Date endDate;
    private Long price;

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public String getImage() {
        return image;
    }

    public Date getEndDate() {
        return endDate;
    }

    public Long getPrice() {
        return price;
    }
}
