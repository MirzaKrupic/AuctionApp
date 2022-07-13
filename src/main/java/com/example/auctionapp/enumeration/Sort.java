package com.example.auctionapp.enumeration;

public enum Sort {
    STARTDATE("start_date"),
    NAME("name"),
    AUCTIONENDDATE("auction_end_date"),
    STARTINGPRICE("starting_price");

    String orderByColumn;

    Sort(String orderByColumn) {
        this.orderByColumn = orderByColumn;
    }

    @Override
    public String toString() {
        return orderByColumn;
    }
}
