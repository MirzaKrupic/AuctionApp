package com.example.auctionapp.enumeration;

public enum Direction {
    ASC("asc"),
    DESC("desc");

    String order;

    Direction(String order) {
        this.order = order;
    }

    @Override
    public String toString() {
        return order;
    }
}
