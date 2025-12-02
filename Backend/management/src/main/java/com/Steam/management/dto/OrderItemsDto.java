package com.Steam.management.dto;

import com.Steam.management.model.Game;
import com.Steam.management.model.Orders;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderItemsDto {

    private Long id;

    private Orders order;

    private Game game;

    private BigDecimal price;

}
