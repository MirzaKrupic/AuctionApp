package com.example.auctionapp.enumeration;

public enum Sort {
    STARTDATE("startDate"),
    NAME("name"),
    AUCTIONENDDATE("auctionEndDate"),
    STARTINGPRICE("startingPrice");

    String orderByColumn;

    Sort(String orderByColumn) {
        this.orderByColumn = orderByColumn;
    }

    @Override
    public String toString() {
        return orderByColumn;
    }
}
