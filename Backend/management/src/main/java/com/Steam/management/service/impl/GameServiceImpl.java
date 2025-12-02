package com.Steam.management.service.impl;

import com.Steam.management.dto.GameDto;
import com.Steam.management.model.Game;
import com.Steam.management.repository.FavoritesRepository;
import com.Steam.management.repository.GameRepository;
import com.Steam.management.repository.UserRepository;
import com.Steam.management.service.GameService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.awt.print.Pageable;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class GameServiceImpl implements GameService {

    private final GameRepository gameRepository;
    private final ModelMapper modelMapper;
    private final FavoritesRepository favoritesRepository;
    private final UserRepository userRepository;

    public GameServiceImpl(GameRepository gameRepository, ModelMapper modelMapper, FavoritesRepository favoritesRepository, UserRepository userRepository) {
        this.gameRepository = gameRepository;
        this.modelMapper = modelMapper;
        this.favoritesRepository = favoritesRepository;
        this.userRepository = userRepository;
    }


    @Override
    public GameDto save(GameDto gameDto) {

        Game game = modelMapper.map(gameDto, Game.class);
        gameRepository.save(game);
        GameDto gameDto1 = modelMapper.map(game, GameDto.class);

        return gameDto1;
    }

    @Override
    public List<GameDto> findAll() {
        List<Game> gameList = gameRepository.findAll();

        return gameList.stream().map(game -> modelMapper.map(game, GameDto.class)).collect(Collectors.toList());
    }

    @Override
    public GameDto findById(Long id) {
        Optional<Game> optional = gameRepository.findById(id);
        if(optional.isEmpty()){
            return null;
        }
        Game game= optional.get();
        return modelMapper.map(game, GameDto.class);
    }

    @Override
    public GameDto findByName(String name) {
        Game game = gameRepository.findByName(name);
        if (game == null){
            return null;
        }
        return modelMapper.map(game, GameDto.class);
    }

    @Override
    public void delete(Long id) {

        if (findById(id) == null){
            return;
        }
        gameRepository.deleteById(id);
    }

    public List<GameDto> mostFavoritedGames(){
        List<Game> gameList = favoritesRepository.findMostFavoritedGames();
        List<GameDto>  gameDtoList = gameList.stream().map(game -> modelMapper.map(game, GameDto.class)).collect(Collectors.toList());
        return gameDtoList;
    }
    public List<GameDto> mostNFavoritedGame(int count){
        Pageable pageable = (Pageable) PageRequest.of(0, count);
        List<Game> game =  favoritesRepository.findMostNFavoritedGames(pageable);
        return game.stream().map(g -> modelMapper.map(g, GameDto.class)).collect(Collectors.toList());
    }

    public List<GameDto> mostOrderedList(){
        List<Game> gameList = userRepository.findMostOrderedGames();
        return gameList.stream().map(g -> modelMapper.map(g, GameDto.class)).collect(Collectors.toList());
    }
}
