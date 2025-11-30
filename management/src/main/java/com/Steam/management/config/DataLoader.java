package com.Steam.management.config;

import com.Steam.management.service.impl.GameImportService;
import com.Steam.management.repository.GameRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    private final GameImportService gameImportService;
    private final GameRepository gameRepository;

    public DataLoader(GameImportService gameImportService, GameRepository gameRepository) {
        this.gameImportService = gameImportService;
        this.gameRepository = gameRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Eğer database boşsa, import et
        if (gameRepository.count() == 0) {
            System.out.println("Importing games from CSV...");
            gameImportService.importGamesFromCsv("src/main/resources/data/top200_playtime.csv");
            System.out.println("Games imported successfully!");
        } else {
            System.out.println("Games already imported. Skipping...");
        }
    }
}