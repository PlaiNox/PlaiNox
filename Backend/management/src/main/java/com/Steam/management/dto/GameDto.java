package com.Steam.management.dto;

import com.Steam.management.model.Categories;
import com.Steam.management.model.Genres;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import java.math.BigDecimal;
import java.time.LocalDate;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
public class GameDto {

    private Long appId;

    private String name;

    private LocalDate releaseDate;

    private String estimatedOwners;

    private Integer requiredAge;

    private BigDecimal price;

    private String aboutGame;

    private List<String> supportedLanguages ;

    private String headerImage;

    private String website;

    private Integer averagePlaytimeTwoWeeks;
    private Integer averagePlaytimeForever;

    private String developer;


    private Set<String> publishers ;


    private List<Categories> categories ;

    private List<Genres> genres ;





}
