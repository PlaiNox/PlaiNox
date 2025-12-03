package com.Steam.management.repository;

import com.Steam.management.model.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface GameRepository extends JpaRepository<Game, Long> {

    @Query("SELECT g from Game g WHERE g.name = :name")
    Game findByName(@Param("name") String name);

}
