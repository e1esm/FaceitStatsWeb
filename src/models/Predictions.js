export class FactionBestMaps {
    constructor(data) {
        this.firstFactionBestMaps = data.first_faction_best_maps.map(mapData => new MapStats(mapData));
        this.secondFactionBestMaps = data.second_faction_best_maps.map(mapData => new MapStats(mapData));
    }

    getBestMapsForFaction(faction) {
        if (faction === "first") {
            return this.firstFactionBestMaps;
        } else if (faction === "second") {
            return this.secondFactionBestMaps;
        } else {
            throw new Error("Invalid faction. Use 'first' or 'second'.");
        }
    }
}

export class MapStats {
    constructor({ map, win_possibility }) {
        this.map = map;
        this.winPossibility = win_possibility;
    }
}
