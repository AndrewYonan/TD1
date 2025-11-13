class RoundManager {

    get_round(i) {
        return this.default_round();
    }

    default_round() {

        let round_config = [];

        for (let i = 0; i < 75; ++i) {round_config.push([0.5, 3]);}
        return round_config;
    }
}