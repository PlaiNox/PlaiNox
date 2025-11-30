package com.Steam.management.config;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public class JwtAuthenticationToken extends UsernamePasswordAuthenticationToken {

    private final String userId;
    private final String userName;
    private final String role;

    public JwtAuthenticationToken(String username, String userId, String userName, String role,
                                  Collection<? extends GrantedAuthority> authorities) {
        super(username, null, authorities);
        this.userId = userId;
        this.userName = userName;
        this.role = role;
    }

    public String getUserId() { return userId; }
    public String getUserName() { return userName; }
    public String getRole() { return role; }
}
