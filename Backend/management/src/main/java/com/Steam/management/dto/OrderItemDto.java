package com.Steam.management.dto;

import com.Steam.management.model.Game;
import com.Steam.management.model.Orders;

import java.math.BigDecimal;

public class OrderItemDto {

    private Long id;

    private OrderDto orderDto;

    private GameDto gameDto;

    private BigDecimal price;
    private int quantity;


}
