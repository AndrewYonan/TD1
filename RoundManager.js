class RoundManager {

    get_round(i) {
        return this.default_round();
    }

    default_round() {

        let round_config = [];

        for (let i = 0; i < 5; ++i) {round_config.push([0.4, 1]);}
        for (let i = 0; i < 5; ++i) {round_config.push([0.4, 2]);}
        for (let i = 0; i < 5; ++i) {round_config.push([0.4, 3]);}
        for (let i = 0; i < 5; ++i) {round_config.push([0.4, 4]);}
        for (let i = 0; i < 5; ++i) {round_config.push([0.4, 5]);}
        return round_config;
    }
}