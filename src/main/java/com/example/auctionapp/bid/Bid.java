package com.example.auctionapp.bid;

import com.example.auctionapp.entity.Category;
import com.example.auctionapp.entity.Item;
import com.example.auctionapp.user.User;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "bid")
public class Bid {

    @Id
    @SequenceGenerator(
            name = "bid_sequence",
            sequenceName = "bid_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "bid_sequence"
    )
    @Column
    @NonNull
    private Long bidId;

    @Column
    @NonNull
    private double amount;

    @ManyToOne(
            cascade = CascadeType.ALL
    )
    @JoinColumn(
            name = "user_id",
            referencedColumnName = "userId"
    )
    private User user;

    @ManyToOne(
            fetch = FetchType.LAZY
    )
    private Item item;

    public Bid(double amount, User user, Item item) {
        this.amount = amount;
        this.user = user;
        this.item = item;
    }
}
