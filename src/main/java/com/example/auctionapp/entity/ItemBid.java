package com.example.auctionapp.entity;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public class ItemBid {

    private long itemId;
    private int count;
    private double amount;
    private String name;
    private double startingPrice;
    private String photo;
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date auctionEndDate;
    private String details;

    public ItemBid(long itemId, String details, int count, double amount, String name, double startingPrice, String photo, Date auctionEndDate) {
        this.count = count;
        this.itemId = itemId;
        this.amount = amount;
        this.name = name;
        this.startingPrice = startingPrice;
        this.photo = photo;
        this.auctionEndDate = auctionEndDate;
        this.details = details;
    }

    public int getCount() {
        return count;
    }

    public double getAmount() {
        return amount;
    }

    public String getName() {
        return name;
    }

    public double getStartingPrice() {
        return startingPrice;
    }

    public String getPhoto() {
        return photo;
    }

    public Date getAuctionEndDate() {
        return auctionEndDate;
    }

    public String getDetails() {
        return details;
    }

    public long getItemId() {
        return itemId;
    }
}
