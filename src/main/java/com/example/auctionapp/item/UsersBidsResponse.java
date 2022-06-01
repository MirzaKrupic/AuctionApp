package com.example.auctionapp.item;

import java.util.Date;

public class UsersBidsResponse {
    private Long itemId;
    private String name;
    private Date endDate;
    private Double currentPrice;
    private int noBids;
    private int owner;

    public UsersBidsResponse(Long itemId, String name, Date endDate, Double currentPrice, int noBids, int owner) {
        this.itemId = itemId;
        this.name = name;
        this.endDate = endDate;
        this.currentPrice = currentPrice;
        this.noBids = noBids;
        this.owner = owner;
    }

    public int getOwner() {
        return owner;
    }

    public void setOwner(int owner) {
        this.owner = owner;
    }

    public Long getItemId() {
        return itemId;
    }

    public void setItemId(Long itemId) {
        this.itemId = itemId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public Double getCurrentPrice() {
        return currentPrice;
    }

    public void setCurrentPrice(Double currentPrice) {
        this.currentPrice = currentPrice;
    }

    public int getNoBids() {
        return noBids;
    }

    public void setNoBids(int noBids) {
        this.noBids = noBids;
    }
}
