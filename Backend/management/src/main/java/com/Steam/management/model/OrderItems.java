package com.Steam.management.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "orderItem")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderItems {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Bir Order içinde birçok OrderItem olabilir
    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Orders order;

    // Bir oyun birçok sipariş satırında bulunabilir
    @ManyToOne
    @JoinColumn(name = "game_id", nullable = false)
    private Game game;

    @Column(precision = 10, scale = 2, nullable = false)
    private BigDecimal price;

}
