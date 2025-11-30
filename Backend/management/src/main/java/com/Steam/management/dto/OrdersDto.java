package com.Steam.management.dto;

import com.Steam.management.model.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrdersDto {

    private LocalDateTime orderDate;
    private OrderStatus orderStatus;
    private BigDecimal totalAmount;

    private Long id;

}