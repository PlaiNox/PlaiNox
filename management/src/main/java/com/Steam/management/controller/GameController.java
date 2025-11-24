package com.Steam.management.controller;

import com.Steam.management.dto.GameDto;
import com.Steam.management.service.GameService;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;

import java.util.List;


@RestController
@RequestMapping("/game")
public class GameController {


    private final GameService gameService;
    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @PostMapping(path="/save")
    @Operation(summary= "Game save Operation")
    public GameDto save(@RequestBody @Valid GameDto gameDto){
        return gameService.save(gameDto);
    }
    @GetMapping(path="/list")
    @Operation(summary = "Game list ")
    public List<GameDto> findAll(){
        return gameService.findAll();
    }

    @GetMapping(path = "/list/{id}")
    public GameDto findById(@PathVariable Long id){
        return gameService.findById(id);
    }

    @DeleteMapping(path = "/delete/{id}")
    public void deleteById(@PathVariable Long id){
        gameService.delete(id);
    }
    @GetMapping(path = "/listName/{name}")
    public GameDto findByName(@PathVariable String name){
        return gameService.findByName(name);
    }

}
