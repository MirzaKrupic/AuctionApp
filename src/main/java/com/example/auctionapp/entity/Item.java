package com.example.auctionapp.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@Table(name = "item")
@AllArgsConstructor
@NoArgsConstructor
@Builder
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

}
