package com.example.auctionapp.entity;

import com.example.auctionapp.bid.Bid;
import lombok.*;

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

    @ManyToOne(
            cascade = CascadeType.ALL
    )
    @JoinColumn(
            name = "supercategory_id",
            referencedColumnName = "categoryId"
    )
    private Category superCategory;
}
