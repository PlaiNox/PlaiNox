package com.Steam.management.dto;

import com.Steam.management.model.OrderStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class OrdersDto {

    private LocalDateTime orderDate;
    private OrderStatus orderStatus;
    private BigDecimal totalAmount;
    private Long id;

}
