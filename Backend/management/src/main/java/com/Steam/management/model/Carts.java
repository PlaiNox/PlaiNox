package com.Steam.management.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name="carts")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Carts {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cart_id;

    @Column
    private LocalDateTime added_at;

    //Userı lazım olduğu zaman çekmek için FetchType.LAZY
    //alt alta id 10 olan kullanıcının oyunlarını görebeileceğimiz için manyToOne
    @ManyToOne(fetch = FetchType.LAZY)
    //Carts tablosunda User'dan gelen id l, colomn id user_id olsun ve boş olamasın
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    //Aynı oyun birden fazla müşterinin sepetinde olabilir
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_id",nullable = false)
    private Game game;

    private BigDecimal totalAmount = BigDecimal.ZERO;

}
