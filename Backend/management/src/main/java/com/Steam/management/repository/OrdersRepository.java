package com.Steam.management.repository;

import com.Steam.management.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.awt.print.Pageable;
import java.util.List;

@Repository
public interface OrdersRepository extends JpaRepository<Orders, Long> {

    @Query(value = "SELECT o FROM Orders o WHERE o.user.id = :userId")
    List<Orders> findByUserId(@Param("userId") Long userId);




}



