export class MatchStats {
    constructor(matchId, stats) {
        this.matchId = matchId;
        this.stats = stats;
    }

    static fromJSON(json) {
        const { "Match Id": matchId, stats } = json;
        return new MatchStats(
            matchId,
            {
                kdRatio: stats["K/D Ratio"],
                pentaKills: stats["Penta Kills"],
                krRatio: stats["K/R Ratio"],
                quadroKills: stats["Quadro Kills"],
                tripleKills: stats["Triple Kills"],
                doubleKills: stats["Double Kills"],
                mvps: stats["MVPs"],
                score: stats["Score"],
                deaths: stats["Deaths"],
                kills: stats["Kills"],
                assists: stats["Assists"],
                headshotsPercentage: stats["Headshots %"],
                map: stats["Map"],
                hltvRating: stats["hltv_rating"] || 0,
                adr: stats["ADR"]
            }
        );
    }
}

export class Stats{

}