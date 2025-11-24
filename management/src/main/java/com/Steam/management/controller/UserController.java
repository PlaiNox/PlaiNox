package com.Steam.management.controller;

import com.Steam.management.dto.CartsDto;
import com.Steam.management.model.User;
import com.Steam.management.service.impl.UserService;
import com.Steam.management.dto.OrdersDto;

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
    public ResponseEntity<User> authenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        return ResponseEntity.ok(currentUser);
    }

    @GetMapping("/")
    public ResponseEntity<List<User>> findAll() {
        List <User> users = userService.findAll();
        return ResponseEntity.ok(users);
    }

    @DeleteMapping("/cart/delete/{id}")
    public void deleteCarts(@PathVariable Long id){
        userService.deleteCarts(id);
    }
    @PutMapping("/cart/{id}")
    @Operation(summary = "Adding cart")
    public List<CartsDto> addToCart(@PathVariable Long id){
        return userService.addToCart(id);
    }

    @GetMapping("/cart/list")
    @Operation(summary = "List all of the carts")
    public List<CartsDto> listCarts(){
        return userService.listCarts();
    }

    @PutMapping("/order/{id}")
    @Operation(summary = "Order oluşturma")
    public List<OrdersDto> createOrder(@PathVariable Long id){
        return userService.createOrder(id);
    }
}