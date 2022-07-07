package com.example.auctionapp.entity;

import com.example.auctionapp.user.User;
import lombok.*;

import javax.persistence.*;

@Entity
@Data
@Table(name = "token_graveyard")
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TokenGraveyard {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column
    private Long tokenId;

    @NonNull
    @Column
    private String token;

    @ManyToOne(
            cascade = CascadeType.ALL
    )
    @JoinColumn(
            name = "user_id",
            referencedColumnName = "userId"
    )
    private User user;

    public TokenGraveyard(@NonNull String token, User user) {
        this.token = token;
        this.user = user;
    }

    public Long getTokenId() {
        return tokenId;
    }

    public void setTokenId(Long tokenId) {
        this.tokenId = tokenId;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
