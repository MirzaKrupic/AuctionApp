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
public class Bid implements Comparable<Bid> {

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

    @Column(name = "item_id")
    private long itemId;

    public Bid(double amount, User user, long itemId) {
        this.amount = amount;
        this.user = user;
        this.itemId = itemId;
    }

    @Override
    public int compareTo(Bid o) {
        if(this.getAmount() > o.getAmount()) {
            return 1;
        } else if (this.getAmount() < o.getAmount()) {
            return -1;
        }
        return 0;
    }
}
