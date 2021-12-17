package com.example.auctionapp.enumeration;

public enum ItemSortBy {
    ITEMID("itemId"),
    NAME("name"),
    AUCTIONENDDATE("auctionEndDate"),
    STARTINGPRICE("startingPrice");

    String orderByColumn;

    ItemSortBy(String orderByColumn) {
        this.orderByColumn = orderByColumn;
    }

    @Override
    public String toString() {
        return orderByColumn;
    }
}
