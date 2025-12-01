package com.Steam.management.repository;

import com.Steam.management.model.Game;
import com.Steam.management.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByVerificationCode(String verificationCode);

    //:username parametreden gelen
    @Query(value = "SELECT u FROM User u WHERE u.username = :username")
    User findByUsername(@Param("username") String username);

    @Query("SELECT g FROM User u JOIN u.games g GROUP BY g ORDER BY COUNT(u) DESC")
    List<Game> findMostOrderedGames();

}