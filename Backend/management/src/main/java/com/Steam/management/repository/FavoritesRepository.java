package com.Steam.management.repository;

import com.Steam.management.model.Carts;
import com.Steam.management.model.Favorites;
import com.Steam.management.model.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.awt.print.Pageable;
import java.util.List;

@Repository
public interface FavoritesRepository extends JpaRepository<Favorites, Long> {

//    boolean existsByUserIdAndGameAppId(Long userId, Long appId);

    @Query(value = "SELECT f FROM Favorites f WHERE f.user.id = :userId")
    List<Favorites> findByUserId(@Param("userId") Long userId);

    // En çok favoriye eklenen oyunlar (tam liste)
    @Query("SELECT f.game FROM Favorites f GROUP BY f.game ORDER BY COUNT(f) DESC")
    List<Game> findMostFavoritedGames();

    // Sadece ilk 10 tanesi
    @Query("SELECT f.game FROM Favorites f GROUP BY f.game ORDER BY COUNT(f) DESC")
    List<Game> findMostNFavoritedGames(Pageable pageable);

}