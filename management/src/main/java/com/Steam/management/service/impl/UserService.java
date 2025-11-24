package com.Steam.management.service.impl;

import com.Steam.management.dto.*;
import com.Steam.management.model.*;
import com.Steam.management.repository.*;

import org.modelmapper.ModelMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

//AddToCart metodumu düzenleyeceğim
@Service
public class UserService {
    private final UserRepository userRepository;
    private final GameRepository gameRepository;
    private final ModelMapper modelMapper;
    private final CartsRepository cartsRepository;
    private final OrdersRepository ordersRepository;

    public UserService(UserRepository userRepository, EmailService emailService, GameRepository gameRepository, ModelMapper modelMapper, CartsRepository cartsRepository, OrdersRepository ordersRepository) {
        this.userRepository = userRepository;
        this.gameRepository = gameRepository;
        this.modelMapper = modelMapper;
        this.cartsRepository = cartsRepository;
        this.ordersRepository = ordersRepository;
    }

    public List<User> findAll() {
        List<User> users = new ArrayList<>();
        userRepository.findAll().forEach(users::add);
        return users;
    }
    public User findCurrent(){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username);
        return user;
    }

    public void deleteCarts(Long id){
        Optional<Game> optional = gameRepository.findById(id);
        if (optional.isEmpty()){
            return;
        }
        Long gameId = optional.get().getAppId();

        //Normali bu olacak gibi ama şimdilik denemem için
//        List<Carts> cartsList = cartsRepository.findAll();
//        for (Carts carts : cartsList) {
//            if (carts.getUser().equals(findCurrent()) && carts.getGame().getAppId() == gameId){
//                cartsRepository.delete(carts);
//            }
//        }
        List<Carts> cartsList = cartsRepository.findAll();
        for (Carts carts : cartsList) {
            if (carts.getUser().getId() == 1 && carts.getGame().getAppId() == gameId){
                cartsRepository.delete(carts);
            }
        }


    }
    public List<CartsDto> listCarts(){
        List<Carts> cartsList = cartsRepository.findAll();
        List<CartsDto> cartsDto = cartsList.stream().map(carts1 -> modelMapper.map(carts1, CartsDto.class)).toList();
        return cartsDto;


    }
    public List<CartsDto> addToCart(Long id){
       // User user = findCurrent();
        //şimdilik dataebsteki tek userımı kullanıyorum securtyden giriş yapmayı ekleyince yukarıdaki
        //commenti kullanacapım bir aşapıdaki satır silinecek
        User user = userRepository.findById(1L).get();
        //BUrası silinecek sonrasinda



        Optional<Game> optional = gameRepository.findById(id);
        if (optional.isEmpty()){
            return null;
        }
        Game game = optional.get();


        Carts carts = new Carts();
        carts.setUser(user);
        carts.setGame(game);
        carts.setAdded_at(LocalDateTime.now());
        cartsRepository.save(carts);

        List<Carts> cartsList = cartsRepository.findAll();
//        for (Carts cart : cartsList) {
//            System.out.println(cart);
//        }


        List<CartsDto> cartsDto = cartsList.stream().map(carts1 -> modelMapper.map(carts1, CartsDto.class)).toList();
        return cartsDto;


    }

    public List<OrdersDto> createOrder(Long cart_id){
        // User user = findCurrent();
        User user = userRepository.findById(1L).get();
        Optional<Carts> optional = cartsRepository.findById(cart_id);
        if (optional.isEmpty()){
            return null;
        }
        Carts cart = optional.get();

        Orders order = new Orders();
        BigDecimal totalAmount = cart.getTotalAmount();
        order.setTotalAmount(totalAmount);
        order.setOrderStatus(OrderStatus.PENDING);
        order.setOrderDate(LocalDateTime.now());

        List<Orders> ordersList = ordersRepository.findAll();
        List<OrdersDto>  cartsDto = ordersList.stream().map(orders1 -> modelMapper.map(orders1, OrdersDto.class)).toList();
        return cartsDto;
    }
}

