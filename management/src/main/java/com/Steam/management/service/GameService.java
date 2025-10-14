package com.Steam.management.service;

import com.Steam.management.dto.GameDto;

import java.util.List;

public interface GameService {

    public GameDto save(GameDto gameDto);

    public List<GameDto> findAll();
    public GameDto findById(Long id);
    public GameDto findByName(String name);

    public void delete(Long id);
}
