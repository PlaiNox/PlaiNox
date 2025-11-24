package com.Steam.management.model;

import lombok.*;

@Getter
public enum Categories {

    SINGLE_PLAYER("Single-player"),
    MULTI_PLAYER("Multi-player"),
    STEAM_ACHIEVEMENTS("Steam Achievements"),
    PARTIAL_CONTROLLER_SUPPORT("Partial Controller Support"),
    FULL_CONTROLLER_SUPPORT("Full controller support"),
    STEAM_LEADERBOARDS("Steam Leaderboards"),
    REMOTE_PLAY_ON_PHONE("Remote Play on Phone"),
    REMOTE_PLAY_ON_TABLET("Remote Play on Tablet"),
    REMOTE_PLAY_ON_TV("Remote Play on TV"),
    MMO("MMO"),
    PVP("PvP"),
    ONLINE_PVP("Online PvP"),
    CO_OP("Co-op"),
    ONLINE_CO_OP("Online Co-op"),
    IN_APP_PURCHASES("In-App Purchases"),
    STEAM_CLOUD("Steam Cloud"),
    STEAM_TRADING_CARDS("Steam Trading Cards"),
    SHARED_SPLIT_SCREEN("Shared/Split Screen"),
    CROSS_PLATFORM_MULTIPLAYER("Cross-Platform Multiplayer"),
    REMOTE_PLAY_TOGETHER("Remote Play Together"),
    STATS("Stats"),
    SHARED_SPLIT_SCREEN_PVP("Shared/Split Screen PvP"),
    CAPTIONS_AVAILABLE("Captions available"),
    STEAM_WORKSHOP("Steam Workshop"),
    INCLUDES_LEVEL_EDITOR("Includes level editor"),
    LAN_PVP("LAN PvP"),
    LAN_CO_OP("LAN Co-op"),
    SHARED_SPLIT_SCREEN_CO_OP("Shared/Split Screen Co-op"),
    STEAM_TURN_NOTIFICATIONS("Steam Turn Notifications"),
    VR_SUPPORT("VR Support"),
    STEAMVR_COLLECTIBLES("SteamVR Collectibles"),
    VALVE_ANTI_CHEAT_ENABLED("Valve Anti-Cheat enabled"),
    INCLUDES_SOURCE_SDK("Includes Source SDK"),
    COMMENTARY_AVAILABLE("Commentary available"),
    MODS_REQUIRE_HL2("Mods (require HL2)"),
    MODS("Mods"),
    TRACKED_MOTION_CONTROLLER_SUPPORT("Tracked Motion Controller Support"),
    TRACKED_CONTROLLER_SUPPORT("Tracked Controller Support"),
    VR_ONLY("VR Only"),
    VR_SUPPORTED("VR Supported"),
    HDR_AVAILABLE("HDR available");

    private final String displayName;

    Categories(String displayName){
        this.displayName = displayName;
    }

    public static Categories fromString(String name){
        for(Categories c: Categories.values()){
            if(c.getDisplayName().equalsIgnoreCase(name)){
                return c;
            }
        }
        throw new IllegalArgumentException("No category constant for " + name);
    }
}