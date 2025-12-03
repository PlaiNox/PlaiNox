package com.Steam.management.service.impl;

import com.Steam.management.config.JwtAuthenticationToken;
import com.Steam.management.dto.*;
import com.Steam.management.model.*;
import com.Steam.management.repository.*;


import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

//AddToCart metodumu düzenleyeceğim
@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final GameRepository gameRepository;
    private final ModelMapper modelMapper;
    private final CartsRepository cartsRepository;
    private final OrdersRepository ordersRepository;
    private final FavoritesRepository favoritesRepository;
    private final OrderItemRepository orderItemRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, EmailService emailService, GameRepository gameRepository, ModelMapper modelMapper, CartsRepository cartsRepository, OrdersRepository ordersRepository, FavoritesRepository favoritesRepository, OrderItemRepository orderItemRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.gameRepository = gameRepository;
        this.modelMapper = modelMapper;
        this.cartsRepository = cartsRepository;
        this.ordersRepository = ordersRepository;
        this.favoritesRepository = favoritesRepository;
        this.orderItemRepository = orderItemRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> findAll() {
        List<User> users = new ArrayList<>();
        userRepository.findAll().forEach(users::add);
        return users;
    }
    public UserDto updateProfile(UpdateUserDto updateDto) {
        User user = findCurrent();

        // Kullanıcı Adı
        if (updateDto.getUsername() != null && !updateDto.getUsername().isEmpty()) {
            user.setUsername(updateDto.getUsername());
        }

        // Şifre (Varsa şifrele)
        if (updateDto.getPassword() != null && !updateDto.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(updateDto.getPassword()));
        }

        User updatedUser = userRepository.save(user);

        return UserDto.builder()
                .id(updatedUser.getId())
                .username(updatedUser.getRealUsername())
                .email(updatedUser.getEmail())
                .build();
    }

    public User findCurrent() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated() || "anonymousUser".equals(authentication.getPrincipal())) {
            throw new RuntimeException("Kullanıcı girişi yapılmamış!");
        }

        String email = authentication.getName(); // Sizin konfigürasyonunuzda burası email döner
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    }


    public static class UserInfo {
        private final Long id;
        private final String name;

        public UserInfo(Long id, String name) {
            this.id = id;
            this.name = name;
        }

        public Long getId() { return id; }
        public String getName() { return name; }

        @Override
        public String toString() {
            return "UserInfo{id=" + id + ", name='" + name + "'}";
        }
    }



    private UserInfo getCurrentUserInfo() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        System.out.println("=== getCurrentUserInfo ===");
        System.out.println("Authentication: " + auth);
        System.out.println("Is Authenticated: " + (auth != null && auth.isAuthenticated()));

        if (auth != null) {
            System.out.println("Auth Class: " + auth.getClass().getName());
            System.out.println("Principal: " + auth.getPrincipal());
        }

        if (auth == null || !auth.isAuthenticated()) {
            System.out.println("Auth null veya authenticated değil");
            return new UserInfo(-1L, "Anonymous");
        }

        // ÖNCELİKLE JwtAuthenticationToken kontrolü
        if (auth instanceof JwtAuthenticationToken jwtAuth) {
            System.out.println("JwtAuthenticationToken bulundu!");
            Long userId = Long.parseLong(jwtAuth.getUserId());
            String username = jwtAuth.getUserName();
            System.out.println("JWT'den alınan - UserId: " + userId + ", Username: " + username);
            return new UserInfo(userId, username);
        }

        Object principal = auth.getPrincipal();

        if (principal instanceof org.springframework.security.core.userdetails.User userDetails) {
            System.out.println("Spring UserDetails bulundu");
            String username = userDetails.getUsername(); // email
            User user = userRepository.findByUsername(username);
            if (user != null) {
                return new UserInfo(user.getId(), user.getUsername());
            }
        }

        if (principal instanceof User user) {
            System.out.println("Custom User bulundu");
            return new UserInfo(user.getId(), user.getUsername());
        }

        // Son çare
        String username = auth.getName();
        System.out.println("Son çare - username: " + username);
        User user = userRepository.findByUsername(username);
        if (user != null) {
            return new UserInfo(user.getId(), user.getUsername());
        }

        System.out.println("Hiçbir yöntem çalışmadı!");
        return new UserInfo(-1L, "Anonymous");
    }




    public void deleteCarts(Long id){
        Optional<Game> optional = gameRepository.findById(id);
        if (optional.isEmpty()){
            return;
        }
        Long gameId = optional.get().getAppId();

        //Normali bu olacak gibi ama şimdilik denemem için
        List<Carts> cartsList = cartsRepository.findAll();
        for (Carts carts : cartsList) {
            if (carts.getUser().equals(findCurrent()) && carts.getGame().getAppId() == gameId){
                cartsRepository.delete(carts);
            }
        }
//        List<Carts> cartsList = cartsRepository.findAll();
//        for (Carts carts : cartsList) {
//            if (carts.getUser().getId() == 3 && carts.getGame().getAppId() == gameId){
//                cartsRepository.delete(carts);
//            }
//        }


    }
    public List<CartsDto> listCarts(){
         User user = findCurrent();
        //şimdilik dataebsteki tek userımı kullanıyorum securtyden giriş yapmayı ekleyince yukarıdaki
        //commenti kullanacapım bir aşapıdaki satır silinecek
        //User user = userRepository.findById(1L).get();
        List<Carts> cartsList = cartsRepository.findByUserId(user.getId());
        List<CartsDto> cartsDto = cartsList.stream().map(carts1 -> modelMapper.map(carts1, CartsDto.class)).toList();
        return cartsDto;


    }
    public List<CartsDto> addToCart(Long id){

        System.out.println("Adding cart Service");
        User user = findCurrent();
        System.out.println("User id: " + user.getId());
        //şimdilik dataebsteki tek userımı kullanıyorum securtyden giriş yapmayı ekleyince yukarıdaki
        //commenti kullanacapım bir aşapıdaki satır silinecek
       // User user = userRepository.findById(3L).get();
        //BUrası silinecek sonrasinda



        Optional<Game> optional = gameRepository.findById(id);
        if (optional.isEmpty()){
            return null;
        }
        Game game = optional.get();
        if (cartsRepository.findByUserIdAndAppId(user.getId(), game.getAppId()) != null){
            return null;
        }
        Carts carts = new Carts();
        carts.setUser(user);
        carts.setGame(game);
        carts.setAdded_at(LocalDateTime.now());
        carts.setTotalAmount(carts.getTotalAmount().add(game.getPrice()));
        cartsRepository.save(carts);

        List<Carts> cartsList = cartsRepository.findAll();
//        for (Carts cart : cartsList) {
//            System.out.println(cart);
//        }


        List<CartsDto> cartsDto = cartsList.stream().map(carts1 -> modelMapper.map(carts1, CartsDto.class)).toList();
        return cartsDto;


    }

    public List<OrdersDto> createOrder(){
        User user = findCurrent();
        //User user = userRepository.findById(3L).get();
        Long userId = user.getId();
        List<Carts> cartsList = cartsRepository.findByUserId(userId);
        if (cartsList.isEmpty()){
            return null;
        }
        BigDecimal totalAmount = BigDecimal.ZERO;

        Orders order = new Orders();
        order.setOrderStatus(OrderStatus.PENDING);
        order.setOrderDate(LocalDateTime.now());
        order.setUser(user);

        List<OrderItems> orderItems = new ArrayList<>();

        for (int i  = 0; i < cartsList.size(); i++){
            Carts carts = cartsList.get(i);
            Game game = carts.getGame();
            if(!user.getGames().contains(game)){
                user.getGames().add(game);
            }
            if(!game.getUsers().contains(user)){
                game.getUsers().add(user);
            }

            userRepository.save(user);
            gameRepository.save(game);

            OrderItems orderItem = new OrderItems();
            orderItem.setGame(game);
            orderItem.setPrice(game.getPrice());
            orderItem.setOrder(order);

            orderItems.add(orderItem);
            // orderItemRepository.save(orderItem);
            totalAmount = totalAmount.add(carts.getTotalAmount());

        }
        order.setTotalAmount(totalAmount);
        order.setOrderItems(orderItems);
        ordersRepository.save(order);

        cartsRepository.deleteAll(cartsList);

        List<Orders> ordersList = ordersRepository.findByUserId(userId);
        List<OrdersDto> cartsDto = ordersList.stream().map(orders1 -> modelMapper.map(orders1, OrdersDto.class)).toList();

        return cartsDto;
    }


    public List<GameDto> getLibrary(){
        User user = findCurrent();
        //User user = userRepository.findById(3L).get();
        List<Game> games = user.getGames();
        List<GameDto> gameDtos = games.stream().map(game -> modelMapper.map(game, GameDto.class)).toList();
        return gameDtos;
    }

    public List<FavoritesDto> addToFavorites(Long id){
        User user = findCurrent();
        //User user = userRepository.findById(3L).get();
        Optional<Game> optional = gameRepository.findById(id);
        if (optional.isEmpty()){
            return null;
        }
        Game game = optional.get();
        List<Favorites> favoritesList = favoritesRepository.findByUserId(user.getId());
        List<FavoritesDto> favoritesDtoList = new ArrayList<>(favoritesList.stream().map(favorites1 -> modelMapper.map(favorites1, FavoritesDto.class)).toList());
        for (Favorites favorites : favoritesList){
            if (favorites.getGame().getAppId() == game.getAppId()){
                return  favoritesDtoList;
            }
        }

        Favorites favs = new Favorites();
        favs.setUser(user);
        favs.setGame(game);
        favs.setAddedAt(LocalDateTime.now());
        favoritesRepository.save(favs);
        FavoritesDto favoritesDto = modelMapper.map(favs, FavoritesDto.class);
        favoritesDtoList.add(favoritesDto);
        return favoritesDtoList;
    }

    public List<FavoritesDto> listFavorites(){
        User user = findCurrent();
        //User user = userRepository.findById(3L).get();
        List<Favorites> favoritesList = favoritesRepository.findByUserId(user.getId());
        return favoritesList.stream().map(fav -> {
            FavoritesDto dto = new FavoritesDto();
            dto.setId(fav.getId());
            dto.setAddedAt(fav.getAddedAt());
            dto.setUserDto(modelMapper.map(fav.getUser(), UserDto.class));
            dto.setGameDto(modelMapper.map(fav.getGame(), GameDto.class));
            return dto;
        }).toList();
    }



}



//
//package com.Steam.management.service.impl;
//
//import com.Steam.management.config.JwtAuthenticationToken;
//import com.Steam.management.dto.*;
//import com.Steam.management.model.*;
//import com.Steam.management.repository.*;
//
//import org.modelmapper.ModelMapper;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//import java.math.BigDecimal;
//import java.time.LocalDateTime;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Optional;
//
////AddToCart metodumu düzenleyeceğim
//@Service
//public class UserService {
//
//    private final UserRepository userRepository;
//    private final GameRepository gameRepository;
//    private final ModelMapper modelMapper;
//    private final CartsRepository cartsRepository;
//    private final OrdersRepository ordersRepository;
//    private final FavoritesRepository favoritesRepository;
//    private final OrderItemRepository orderItemRepository;
//
//    public UserService(UserRepository userRepository, EmailService emailService, GameRepository gameRepository, ModelMapper modelMapper, CartsRepository cartsRepository, OrdersRepository ordersRepository, FavoritesRepository favoritesRepository, OrderItemRepository orderItemRepository) {
//        this.userRepository = userRepository;
//        this.gameRepository = gameRepository;
//        this.modelMapper = modelMapper;
//        this.cartsRepository = cartsRepository;
//        this.ordersRepository = ordersRepository;
//        this.favoritesRepository = favoritesRepository;
//        this.orderItemRepository = orderItemRepository;
//    }
//
//    public List<User> findAll() {
//        List<User> users = new ArrayList<>();
//        userRepository.findAll().forEach(users::add);
//        return users;
//    }
//    // DÜZELTİLDİ: Artık SecurityContext'ten emaili alıp user'ı buluyor.
//    public User findCurrent() {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//
//        if (authentication == null || !authentication.isAuthenticated() || "anonymousUser".equals(authentication.getPrincipal())) {
//            throw new RuntimeException("Kullanıcı girişi yapılmamış!");
//        }
//
//        String email = authentication.getName(); // Sizin konfigürasyonunuzda burası email döner
//        return userRepository.findByEmail(email)
//                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
//    }
//
//    public void deleteCarts(Long id) {
//        Optional<Game> optional = gameRepository.findById(id);
//        if (optional.isEmpty()) {
//            return;
//        }
//        Long gameId = optional.get().getAppId();
//        User currentUser = findCurrent(); // Şu anki userı aldık
//
//        List<Carts> cartsList = cartsRepository.findAll();
//        for (Carts carts : cartsList) {
//            // DÜZELTİLDİ: User ID karşılaştırması ve güvenli erişim
//            if (carts.getUser().getId().equals(currentUser.getId()) && carts.getGame().getAppId().equals(gameId)) {
//                cartsRepository.delete(carts);
//            }
//        }
//    }
//
//    public List<CartsDto> listCarts(){
//         User user = findCurrent();
//        //şimdilik dataebsteki tek userımı kullanıyorum securtyden giriş yapmayı ekleyince yukarıdaki
//        //commenti kullanacapım bir aşapıdaki satır silinecek
//        //User user = userRepository.findById(1L).get();
//        List<Carts> cartsList = cartsRepository.findByUserId(user.getId());
//        List<CartsDto> cartsDto = cartsList.stream().map(carts1 -> modelMapper.map(carts1, CartsDto.class)).toList();
//        return cartsDto;
//
//
//    }
//    public List<CartsDto> addToCart(Long id){
//
//        System.out.println("Adding cart Service");
//        User user = findCurrent();
//        System.out.println("User id: " + user.getId());
//        //şimdilik dataebsteki tek userımı kullanıyorum securtyden giriş yapmayı ekleyince yukarıdaki
//        //commenti kullanacapım bir aşapıdaki satır silinecek
//       // User user = userRepository.findById(3L).get();
//        //BUrası silinecek sonrasinda
//
//
//
//        Optional<Game> optional = gameRepository.findById(id);
//        if (optional.isEmpty()){
//            return null;
//        }
//        Game game = optional.get();
//        if (cartsRepository.findByUserIdAndAppId(user.getId(), game.getAppId()) != null){
//            return null;
//        }
//        Carts carts = new Carts();
//        carts.setUser(user);
//        carts.setGame(game);
//        carts.setAdded_at(LocalDateTime.now());
//        carts.setTotalAmount(carts.getTotalAmount().add(game.getPrice()));
//        cartsRepository.save(carts);
//
//        List<Carts> cartsList = cartsRepository.findAll();
////        for (Carts cart : cartsList) {
////            System.out.println(cart);
////        }
//
//
//        List<CartsDto> cartsDto = cartsList.stream().map(carts1 -> modelMapper.map(carts1, CartsDto.class)).toList();
//        return cartsDto;
//
//
//    }
//
//    public List<OrdersDto> createOrder(){
//        User user = findCurrent();
//        //User user = userRepository.findById(3L).get();
//        Long userId = user.getId();
//        List<Carts> cartsList = cartsRepository.findByUserId(userId);
//        if (cartsList.isEmpty()){
//            return null;
//        }
//        BigDecimal totalAmount = BigDecimal.ZERO;
//
//        Orders order = new Orders();
//        order.setOrderStatus(OrderStatus.PENDING);
//        order.setOrderDate(LocalDateTime.now());
//        order.setUser(user);
//
//        List<OrderItems> orderItems = new ArrayList<>();
//
//        for (int i  = 0; i < cartsList.size(); i++){
//            Carts carts = cartsList.get(i);
//            Game game = carts.getGame();
//            if(!user.getGames().contains(game)){
//                user.getGames().add(game);
//            }
//            if(!game.getUsers().contains(user)){
//                game.getUsers().add(user);
//            }
//
//            userRepository.save(user);
//            gameRepository.save(game);
//
//            OrderItems orderItem = new OrderItems();
//            orderItem.setGame(game);
//            orderItem.setPrice(game.getPrice());
//            orderItem.setOrder(order);
//
//            orderItems.add(orderItem);
//            // orderItemRepository.save(orderItem);
//            totalAmount = totalAmount.add(carts.getTotalAmount());
//
//        }
//        order.setTotalAmount(totalAmount);
//        order.setOrderItems(orderItems);
//        ordersRepository.save(order);
//
//        cartsRepository.deleteAll(cartsList);
//
//        List<Orders> ordersList = ordersRepository.findByUserId(userId);
//        List<OrdersDto> cartsDto = ordersList.stream().map(orders1 -> modelMapper.map(orders1, OrdersDto.class)).toList();
//
//        return cartsDto;
//    }
//
//
//    public List<GameDto> getLibrary(){
//        User user = findCurrent();
//        //User user = userRepository.findById(3L).get();
//        List<Game> games = user.getGames();
//        List<GameDto> gameDtos = games.stream().map(game -> modelMapper.map(game, GameDto.class)).toList();
//        return gameDtos;
//    }
//
//    public List<FavoritesDto> addToFavorites(Long id){
//        User user = findCurrent();
//        //User user = userRepository.findById(3L).get();
//        Optional<Game> optional = gameRepository.findById(id);
//        if (optional.isEmpty()){
//            return null;
//        }
//        Game game = optional.get();
//        List<Favorites> favoritesList = favoritesRepository.findByUserId(user.getId());
//        List<FavoritesDto> favoritesDtoList = new ArrayList<>(favoritesList.stream().map(favorites1 -> modelMapper.map(favorites1, FavoritesDto.class)).toList());
//        for (Favorites favorites : favoritesList){
//            if (favorites.getGame().getAppId() == game.getAppId()){
//                return  favoritesDtoList;
//            }
//        }
//
//        Favorites favs = new Favorites();
//        favs.setUser(user);
//        favs.setGame(game);
//        favs.setAddedAt(LocalDateTime.now());
//        favoritesRepository.save(favs);
//        FavoritesDto favoritesDto = modelMapper.map(favs, FavoritesDto.class);
//        favoritesDtoList.add(favoritesDto);
//        return favoritesDtoList;
//    }
//
//    public List<FavoritesDto> listFavorites(){
//        User user = findCurrent();
//        //User user = userRepository.findById(3L).get();
//        List<Favorites> favoritesList = favoritesRepository.findByUserId(user.getId());
//        return favoritesList.stream().map(fav -> {
//            FavoritesDto dto = new FavoritesDto();
//            dto.setId(fav.getId());
//            dto.setAddedAt(fav.getAddedAt());
//            dto.setUserDto(modelMapper.map(fav.getUser(), UserDto.class));
//            dto.setGameDto(modelMapper.map(fav.getGame(), GameDto.class));
//            return dto;
//        }).toList();
//    }
//
//
//
//}
//
//
//
//
