package com.example.auctionapp.entity;

import com.example.auctionapp.bid.Bid;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Data
@Table(name = "item")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Where(clause = "auction_end_date > now()")
public class Item {

    @Id
    @SequenceGenerator(
            name = "item_sequence",
            sequenceName = "item_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "item_sequence"
    )
    @Column
    private Long itemId;

    @NonNull
    @Column
    private String name;

    @NonNull
    @Column
    private int startingPrice;

    @NonNull
    @Column
    private String photo;

    @NonNull
    @Column
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date auctionEndDate;

    @ManyToOne(
            cascade = CascadeType.ALL
    )
    @JoinColumn(
            name = "category_id",
            referencedColumnName = "categoryId"
    )
    private Category category;

    @Column(name="details", length=1024)
    private String details;

    @OneToMany(
            cascade = CascadeType.ALL
    )
    @JoinColumn(
            name = "item_id"
    )
    private List<Bid> bids;

    public Long getItemId() {
        return itemId;
    }

    public String getName() {
        return name;
    }

    public int getStartingPrice() {
        return startingPrice;
    }

    public String getPhoto() {
        return photo;
    }

    public Date getAuctionEndDate() {
        return auctionEndDate;
    }

    public Category getCategory() {
        return category;
    }

    public String getDetails() {
        return details;
    }

    public List<Bid> getBids() {
        return bids;
    }
}
