export class PlayerStats {
    constructor(data) {
      this.kdRate = data.kd_rate;
      this.krRate = data.kr_rate;
      this.quadroKills = data.quadro_kills;
      this.trippleKills = data.tripple_kills;
      this.doubleKills = data.double_kills;
      this.mvps = data.mvps;
      this.deaths = data.deaths;
      this.kills = data.kills;
      this.assists = data.assists;
      this.headshotPercentage = data.headshot_percentage;
      this.hltvRating = data.hltv_rating;
      this.adr = data.adr;
      this.aces = data.aces;
    }
}

export class MapStats{
  constructor(data) {
    this.kdRate = data.kd_rate;
    this.krRate = data.kr_rate;
    this.quadroKills = data.quadro_kills;
    this.trippleKills = data.tripple_kills;
    this.doubleKills = data.double_kills;
    this.mvps = data.mvps;
    this.deaths = data.deaths;
    this.kills = data.kills;
    this.assists = data.assists;
    this.headshotPercentage = data.headshot_percentage;
    this.hltvRating = data.hltv_rating;
    this.adr = data.adr;
    this.aces = data.aces;
    this.timesPlayed = data.times_played;
    this.map = data.map;
  }
}