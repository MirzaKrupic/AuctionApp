package com.example.auctionapp.enumeration;

public enum Order {
    ASC("asc"),
    DESC("desc");

    String order;

    Order(String order) {
        this.order = order;
    }

    @Override
    public String toString() {
        return order;
    }
}
