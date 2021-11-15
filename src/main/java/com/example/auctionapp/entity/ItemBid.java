package com.example.auctionapp.entity;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public class ItemBid {

    private int count;
    private double amount;
    private String name;
    private double startingPrice;
    private String photo;
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date auctionEndDate;

    public ItemBid(int count, double amount, String name, double startingPrice, String photo, Date auctionEndDate) {
        this.count = count;
        this.amount = amount;
        this.name = name;
        this.startingPrice = startingPrice;
        this.photo = photo;
        this.auctionEndDate = auctionEndDate;
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
}
