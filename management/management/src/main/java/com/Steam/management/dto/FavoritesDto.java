package com.Steam.management.dto;

import com.Steam.management.model.Game;
import com.Steam.management.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FavoritesDto {
    private Long id;

    private UserDto userDto;

    private GameDto gameDto;
    private LocalDateTime addedAt;
}
