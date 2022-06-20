package com.example.auctionapp.entity;

import com.example.auctionapp.bid.Bid;
import com.example.auctionapp.user.User;
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
//@Where(clause = "auction_end_date > now()")
public class Item {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column
    private Long itemId;

    @NonNull
    @Column
    private String name;

    @NonNull
    @Column(columnDefinition="Decimal(10,2)")
    private Long startingPrice;

    @NonNull
    @Column(columnDefinition="TEXT")
    private String photo;

    @NonNull
    @Column(name = "start_date")
    private Date startDate;

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

    @ManyToOne(
            cascade = CascadeType.ALL
    )
    @JoinColumn(
            name = "user_id",
            referencedColumnName = "userId"
    )
    private User user;

    @Column(name="details", length=1024)
    private String details;

    @OneToMany(
            cascade = CascadeType.ALL
    )
    @JoinColumn(
            name = "item_id"
    )
    private List<Bid> bids;

    public Item(@NonNull String name, @NonNull Long startingPrice, @NonNull String photo, @NonNull Date startDate, @NonNull Date auctionEndDate, Category category, User user, String details) {
        this.name = name;
        this.startingPrice = startingPrice;
        this.photo = photo;
        this.startDate = startDate;
        this.auctionEndDate = auctionEndDate;
        this.category = category;
        this.user = user;
        this.details = details;
    }

    public Long getItemId() {
        return itemId;
    }

    public String getName() {
        return name;
    }

    public Long getStartingPrice() {
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

    public void setBids(List<Bid> bids) {
        this.bids = bids;
    }
}
