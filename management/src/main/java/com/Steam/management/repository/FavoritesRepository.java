package com.Steam.management.repository;

import com.Steam.management.model.Favorites;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavoritesRepository extends JpaRepository<Favorites, Long> {

    boolean existsByUserIdAndGameAppId(Long userId, Long appId);

    List<Favorites> findByUserId(Long userId);
}