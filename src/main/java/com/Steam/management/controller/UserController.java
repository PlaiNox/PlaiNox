package com.Steam.management.controller;

import com.Steam.management.dto.CartsDto;
import com.Steam.management.dto.FavoritesDto;
import com.Steam.management.dto.GameDto;
import com.Steam.management.dto.*;
import com.Steam.management.model.User;
import com.Steam.management.service.impl.UserService;
import com.Steam.management.dto.UpdateUserDto;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/users")
@RestController
public class UserController {
    private final UserService userService;
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<UserDto> authenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        //return ResponseEntity.ok(currentUser);
        UserDto userDto = UserDto.builder()
                .id(currentUser.getId().longValue())
                .username(currentUser.getRealUsername())
                .email(currentUser.getEmail())
                .build();

        return ResponseEntity.ok(userDto);
    }

    @GetMapping("/")
    public List<User> findAll() {
        List <User> users = userService.findAll();
        return users;
    }
    @PutMapping("/me/update")
    public ResponseEntity<UserDto> updateProfile(@RequestBody UpdateUserDto updateDto) {
        UserDto updatedUser = userService.updateProfile(updateDto);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/cart/delete/{id}")
    public void deleteCarts(@PathVariable Long id){
        userService.deleteCarts(id);
    }
    @PutMapping("/cart/{id}")
    @Operation(summary = "Adding cart")
    public List<CartsDto> addToCart(@PathVariable Long id){
        System.out.println("Adding cart COntroller");
        return userService.addToCart(id);
    }

    @GetMapping("/cart/list")
    @Operation(summary = "List all of the carts")
    public List<CartsDto> listCarts(){
        return userService.listCarts();
    }

//    @PutMapping("/order/{id}")
//    @Operation(summary = "Order oluşturma")
//    public List

    @PutMapping("/order")
    @Operation(summary = "Order oluşturma")
    public List<OrdersDto> createOrder(){
        return userService.createOrder();
    }


    @GetMapping("/library/list")
    @Operation(summary = "List the library")
    public List<GameDto> listLibrary(){ return userService.getLibrary();}


    @PutMapping("/favorite/{id}")
    @Operation(summary = "Add to favorites")
    public List<FavoritesDto> addFavorite(@PathVariable Long id) {
        return userService.addToFavorites(id);
    }

    @GetMapping("/favorite/list")
    public List<FavoritesDto> getFavorites() {
        return userService.listFavorites();
    }


}