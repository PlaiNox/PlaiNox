package com.Steam.management.model;

import lombok.*;

import javax.swing.text.*;
@Getter

public enum Genres {

    CASUAL("Casual"),
    INDIE("Indie"),
    SPORTS("Sports"),
    ACTION("Action"),
    ADVENTURE("Adventure"),
    STRATEGY("Strategy"),
    FREE_TO_PLAY("Free to Play"),
    MASSIVELY_MULTIPLAYER("Massively Multiplayer"),
    RPG("RPG"),
    SIMULATION("Simulation"),
    EARLY_ACCESS("Early Access"),
    RACING("Racing"),
    UTILITIES("Utilities"),
    EDUCATION("Education"),
    SEXUAL_CONTENT("Sexual Content"),
    NUDITY("Nudity"),
    VIOLENT("Violent"),
    GORE("Gore"),
    DESIGN_AND_ILLUSTRATION("Design & Illustration"),
    ANIMATION_AND_MODELING("Animation & Modeling"),
    GAME_DEVELOPMENT("Game Development"),
    WEB_PUBLISHING("Web Publishing"),
    SOFTWARE_TRAINING("Software Training"),
    PHOTO_EDITING("Photo Editing"),
    AUDIO_PRODUCTION("Audio Production"),
    VIDEO_PRODUCTION("Video Production"),
    ACCOUNTING("Accounting"),
    MOVIE("Movie"),
    DOCUMENTARY("Documentary"),
    EPISODIC("Episodic"),
    SHORT("Short"),
    TUTORIAL("Tutorial"),
    VIDEO_360("360 Video");

    private final String displayName;

    Genres(String displayName){
        this.displayName = displayName;
    }
    // Databaseden gelen genres ismini ait olduğu Genres nesnesi ile eşleştir.
    public static Genres fromString(String name){
        for(Genres g: Genres.values()){
            if(g.displayName.equalsIgnoreCase(name)){
                return g;
            }
        }
        throw new IllegalArgumentException("No enum constant for: " + name);
    }
}
