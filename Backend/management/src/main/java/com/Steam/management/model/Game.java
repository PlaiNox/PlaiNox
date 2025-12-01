package com.Steam.management.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;

@Entity
@Table(name="game")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Game {

    @Id
    private Long appId;

    @Column(nullable = false)
    private String name;

    @Column(name = "release_date")
    private LocalDate releaseDate;

    @Column(name = "estimated_owners")
    private String estimatedOwners;

    @Column(name = "required_age")
    private Integer requiredAge;

    @Column(precision = 10, scale = 2)
    private BigDecimal price;

   
    @Column(name = "about_game", columnDefinition = "TEXT")
    private String aboutGame;

    // DÜZELTME 3: Listelerin başına @ElementCollection eklenmeli
    @ElementCollection 
    @CollectionTable(name = "game_supported_languages", joinColumns = @JoinColumn(name = "game_id"))
    private List<String> supportedLanguages = new ArrayList<>();

    @Column(name = "header_image")
    private String headerImage;

    @Column
    private String website;

    @Column
    private Integer Positive;

    @Column
    private Integer Negative;

    @Column
    private Integer averagePlaytimeTwoWeeks;

    @Column
    private Integer averagePlaytimeForever;

    @Column
    private String developer;

    @ElementCollection // <-- EKLENDİ
    @CollectionTable(name = "game_publishers", joinColumns = @JoinColumn(name = "game_id"))
    private List<String> publishers = new ArrayList<>();

    @ElementCollection // <-- EKLENDİ
    @CollectionTable(name = "game_categories", joinColumns = @JoinColumn(name = "game_id"))
    @Enumerated(EnumType.STRING)
    private List<Categories> categories = new ArrayList<>();

    @ElementCollection // <-- EKLENDİ
    @CollectionTable(name = "game_genres", joinColumns = @JoinColumn(name = "game_id"))
    @Enumerated(EnumType.STRING)
    private List<Genres> genres = new ArrayList<>();

    @ManyToMany(mappedBy = "games")
    @ToString.Exclude
    private List<User> users = new ArrayList<>();
}