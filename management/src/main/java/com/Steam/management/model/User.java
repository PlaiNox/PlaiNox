package com.Steam.management.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Setter
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable = false)
    private String username;
    @Column(unique = true, nullable = false)
    private String email;
    @Column(nullable = false)
    private String password;

    @Column(name = "verification_code")
    private String verificationCode;
    @Column(name = "verification_expiration")
    private LocalDateTime verificationCodeExpiresAt;
    private boolean enabled;

    @ManyToMany
    @JoinTable(
            name = "game_user",
            //İlişkinin tanımlandığı tarafın tablodaki ismini belirledim
            joinColumns = @JoinColumn(name = "user_id"),
            //İlişkinin karşı tarartaki için
            inverseJoinColumns = @JoinColumn(name = "game_id")

    )
    private List<Game> games = new ArrayList<>();

    //constructor for creating an unverified user
    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
    //default constructor
    public User(){
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }


    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }
}