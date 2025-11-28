package com.Steam.management.service.impl;

import com.Steam.management.dto.CartsDto;
import com.Steam.management.model.Carts;
import com.Steam.management.model.Game;
import com.Steam.management.model.User;
import com.Steam.management.repository.CartsRepository;
import com.Steam.management.repository.GameRepository;
import com.Steam.management.repository.UserRepository;

import org.modelmapper.ModelMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

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

    public UserService(UserRepository userRepository, EmailService emailService, GameRepository gameRepository, ModelMapper modelMapper, CartsRepository cartsRepository) {
        this.userRepository = userRepository;
        this.gameRepository = gameRepository;
        this.modelMapper = modelMapper;
        this.cartsRepository = cartsRepository;
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
}
