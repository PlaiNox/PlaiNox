package com.Steam.management.service.impl;

import com.Steam.management.model.Categories;
import com.Steam.management.model.Game;
import com.Steam.management.model.Genres;
import com.Steam.management.repository.GameRepository;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.stereotype.Service;

import java.io.FileReader;
import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class GameImportService {

    private final GameRepository gameRepository;

    public GameImportService(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    public void importGamesFromCsv(String filePath) throws IOException {
        try (FileReader fileReader = new FileReader(filePath);
             CSVParser csvParser = new CSVParser(fileReader, CSVFormat.DEFAULT.withFirstRecordAsHeader())) {

            int count = 0;
            for (CSVRecord record : csvParser) {
                try {
                    Game game = parseGame(record);
                    gameRepository.save(game);
                    count++;
                    //System.out.println("✓ Imported: " + game.getName());
                } catch (Exception e) {
                    System.err.println("Error importing game: " + record.get("Name") + " - " + e.getMessage());
                }
            }
            System.out.println("\n Total games imported: " + count);
        }
    }

    private Game parseGame(CSVRecord record) {
        Game game = new Game();

        // AppID
        String appIdStr = record.get("AppID");
        game.setAppId(Long.parseLong(appIdStr));

        // Name
        game.setName(record.get("Name"));

        // Release Date
        try {
            String releaseDate = record.get("Release date");
            if (releaseDate != null && !releaseDate.isEmpty()) {
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM dd, yyyy");
                game.setReleaseDate(LocalDate.parse(releaseDate, formatter));
            }
        } catch (DateTimeParseException e) {
            System.out.println("Warning: Could not parse release date for " + game.getName());
        }

        // Estimated Owners
        game.setEstimatedOwners(record.get("Estimated owners"));

        // Required Age
        try {
            String requiredAge = record.get("Required age");
            if (requiredAge != null && !requiredAge.isEmpty()) {
                game.setRequiredAge(Integer.parseInt(requiredAge));
            }
        } catch (NumberFormatException e) {
            System.out.println("Warning: Could not parse required age for " + game.getName());
        }

        // Price
        try {
            String price = record.get("Price");
            if (price != null && !price.isEmpty() && !price.equals("0.0")) {
                game.setPrice(new BigDecimal(price));
            } else {
                game.setPrice(BigDecimal.ZERO);
            }
        } catch (NumberFormatException e) {
            game.setPrice(BigDecimal.ZERO);
        }

        // About Game
        game.setAboutGame(record.get("About the game"));

        // Supported Languages
        try {
            String languages = record.get("Supported languages");
            if (languages != null && !languages.isEmpty()) {
                List<String> langList = parseList(languages);
                game.setSupportedLanguages(langList);
            }
        } catch (Exception e) {
            System.out.println("Warning: Could not parse languages for " + game.getName());
        }

        // Header Image
        game.setHeaderImage(record.get("Header image"));

        // Website
        game.setWebsite(record.get("Website"));

        // Positive Reviews
        try {
            String positive = record.get("Positive");
            if (positive != null && !positive.isEmpty()) {
                game.setPositive(Integer.parseInt(positive));
            }
        } catch (NumberFormatException e) {
            System.out.println("Warning: Could not parse positive reviews for " + game.getName());
        }

        // Negative Reviews
        try {
            String negative = record.get("Negative");
            if (negative != null && !negative.isEmpty()) {
                game.setNegative(Integer.parseInt(negative));
            }
        } catch (NumberFormatException e) {
            System.out.println("Warning: Could not parse negative reviews for " + game.getName());
        }

        // Average Playtime Two Weeks
        try {
            String playtime = record.get("Average playtime two weeks");
            if (playtime != null && !playtime.isEmpty()) {
                game.setAveragePlaytimeTwoWeeks(Integer.parseInt(playtime));
            }
        } catch (NumberFormatException e) {
            System.out.println("Warning: Could not parse playtime two weeks for " + game.getName());
        }

        // Average Playtime Forever
        try {
            String playtime = record.get("Average playtime forever");
            if (playtime != null && !playtime.isEmpty()) {
                game.setAveragePlaytimeForever(Integer.parseInt(playtime));
            }
        } catch (NumberFormatException e) {
            System.out.println("Warning: Could not parse playtime forever for " + game.getName());
        }

        // Developers
        game.setDeveloper(record.get("Developers"));

        // Publishers
        try {
            String publishers = record.get("Publishers");
            if (publishers != null && !publishers.isEmpty()) {
                List<String> pubList = parseList(publishers);
                game.setPublishers(pubList);
            }
        } catch (Exception e) {
            System.out.println("Warning: Could not parse publishers for " + game.getName());
        }

        // Categories
        try {
            String categories = record.get("Categories");
            if (categories != null && !categories.isEmpty()) {
                List<Categories> catList = parseCategories(categories);
                game.setCategories(catList);
            }
        } catch (Exception e) {
            System.out.println("Warning: Could not parse categories for " + game.getName());
        }

        // Genres
        try {
            String genres = record.get("Genres");
            if (genres != null && !genres.isEmpty()) {
                List<Genres> genreList = parseGenres(genres);
                game.setGenres(genreList);
            }
        } catch (Exception e) {
            System.out.println("Warning: Could not parse genres for " + game.getName());
        }

        return game;
    }

    private List<String> parseList(String value) {
        if (value == null || value.isEmpty()) {
            return new ArrayList<>();
        }
        // Remove brackets and quotes
        value = value.replace("[", "").replace("]", "").replace("'", "");
        return Arrays.stream(value.split(","))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .collect(Collectors.toList());
    }

    private List<Categories> parseCategories(String value) {
        List<String> categoryStrings = parseList(value);
        return categoryStrings.stream()
                .map(cat -> {
                    try {
                        return Categories.fromString(cat);
                    } catch (IllegalArgumentException e) {
                        System.out.println("Warning: Unknown category: " + cat);
                        return null;
                    }
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }

    private List<Genres> parseGenres(String value) {
        List<String> genreStrings = parseList(value);
        return genreStrings.stream()
                .map(genre -> {
                    try {
                        return Genres.fromString(genre);
                    } catch (IllegalArgumentException e) {
                        System.out.println("Warning: Unknown genre: " + genre);
                        return null;
                    }
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }
}