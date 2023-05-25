export interface Teams {
    RANKING: number;
    NAME: string;
    LOGO: null;
    FLAG: string;
    ID: number;
    DIFF: number;
}

export interface Team {
    ID: number;
    RANKING: number;
    NAME: string;
    LOGO: string;
    FLAG: string;
    PLAYERS: Player[];
    DIFF: number;
}

export interface BasicTeam {
    NAME: string;
    LOGO: string;
}

export interface Player {
    ID: number;
    NICK: string;
    NAME: string;
    FLAG: string;
    PHOTO: string;
    TEAM:  BasicTeam;
    AGE: number;
}

export interface FaceitPlayer {
    player_id:            string;
    nickname:             string;
    avatar:               string;
    country:              string;
    cover_image:          string;
    platforms:            Platforms;
    games:                { [key: string]: Game };
    settings:             Settings;
    friends_ids:          string[];
    new_steam_id:         string;
    steam_id_64:          string;
    steam_nickname:       string;
    memberships:          string[];
    faceit_url:           string;
    membership_type:      string;
    cover_featured_image: string;
    infractions:          Ions;
}

export interface Game {
    region:            string;
    game_player_id:    string;
    skill_level:       number;
    faceit_elo:        number;
    game_player_name:  string;
    skill_level_label: string;
    regions:           Ions;
    game_profile_id:   string;
}

export interface Ions {
}

export interface Platforms {
    steam: string;
}

export interface Settings {
    language: string;
}

export interface FaceitPlayerStats {
    player_id: string;
    game_id:   string;
    lifetime:  Lifetime;
    segments:  Segment[];
}

export interface Lifetime {
    "Total Headshots %":   string;
    "Win Rate %":          string;
    Wins:                  string;
    "Current Win Streak":  string;
    Matches:               string;
    "Recent Results":      string[];
    "Longest Win Streak":  string;
    "Average K/D Ratio":   string;
    "K/D Ratio":           string;
    "Average Headshots %": string;
}

export interface Segment {
    type:        Type;
    mode:        Mode;
    label:       string;
    img_small:   string;
    img_regular: string;
    stats:       Stats;
}

export enum Mode {
    The1V1 = "1v1",
    The5V5 = "5v5",
}

export interface Stats {
    "Average Triple Kills": string;
    "Average Deaths":       string;
    "Average Quadro Kills": string;
    Deaths:                 string;
    Rounds:                 string;
    "Penta Kills":          string;
    Headshots:              string;
    Wins:                   string;
    "Average Kills":        string;
    "Win Rate %":           string;
    Matches:                string;
    MVPs:                   string;
    "Total Headshots %":    string;
    Kills:                  string;
    "K/R Ratio":            string;
    Assists:                string;
    "Average MVPs":         string;
    "Quadro Kills":         string;
    "Average K/D Ratio":    string;
    "Average K/R Ratio":    string;
    "K/D Ratio":            string;
    "Average Headshots %":  string;
    "Average Assists":      string;
    "Headshots per Match":  string;
    "Triple Kills":         string;
    "Average Penta Kills":  string;
}

export enum Type {
    Map = "Map",
}
