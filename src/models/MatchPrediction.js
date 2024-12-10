export class MatchData {
    constructor(data) {
        this.id = data.id;
        this.wonFaction = data.wonFaction;
        this.playedMap = data.playedMap;
        this.matchLink = data.matchLink;
        this.wasPredictionRight = data.wasPredictionRight;
        this.failureMessage = data.failureMessage;
        this.createdAt = data.createdAt;
        this.foundResultAt = data.foundResultAt;
    }
}
