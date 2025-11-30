package com.Steam.management.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Base64;

@Configuration
public class KeyGeneratorConfig {

    @Bean
    CommandLineRunner generateKey() {
        return args -> {
            Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
            String base64Key = Base64.getEncoder().encodeToString(key.getEncoded());
            System.out.println("Generated Secret Key: " + base64Key);
        };
    }
}