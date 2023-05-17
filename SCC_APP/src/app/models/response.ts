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
