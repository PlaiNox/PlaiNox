package com.Steam.management.repository;

import com.Steam.management.model.Carts;
import com.Steam.management.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartsRepository extends JpaRepository<Carts, Long> {

    @Query(value = "SELECT c FROM Carts c WHERE c.user.id = :userId")
    List<Carts> findByUserId(@Param("userId") Long userId);

    @Query(value = "SELECT c FROM Carts c WHERE c.user.id = :userId AND c.game.appId = :appId")
    Carts findByUserIdAndAppId(@Param("userId") Long userId, @Param("appId") Long appId);


}
