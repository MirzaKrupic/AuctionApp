package com.example.auctionapp.entity;

import com.example.auctionapp.bid.Bid;
import lombok.*;
import org.hibernate.annotations.Formula;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class Category {

    @Id
    @SequenceGenerator(
            name = "category_sequence",
            sequenceName = "category_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "category_sequence"
    )
    private Long categoryId;

    @NonNull
    private String name;

    @OneToMany(
            cascade = CascadeType.ALL
    )
    @JoinColumn(
            name = "supercategory_id"
    )
    private List<Category> subcategories;

    @Column(name = "supercategory_id")
    private Long supercategoryId;

    @Formula(value="(SELECT COUNT(i.item_id) FROM item i WHERE i.category_id=category_id)")
    private int numberOfItems;
}
