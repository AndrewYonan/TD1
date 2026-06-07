
import RoundBuilder from "../entities/RoundBuilder.js";

export default class RoundSystem {

    constructor(roundConfig, entityConfig) {

        this.entityConfig = entityConfig;
        this.roundConfig = roundConfig;
        this.roundBuilder = new RoundBuilder(roundConfig);
        this.rounds = this.roundBuilder.buildRounds();
        
        this.currentRound = null;
        this.timeToNextSpawn = 0;
        this.clock = 0;

    }

    spawn(dt) {
        
        this.clock += dt;
        
        if (this.clock > this.timeToNextSpawn) return this.consumeSpawn();
        
        return -1;
    }


    consumeSpawn() {

        const spawn = this.currentRound.pop();

        this.clock = 0;
        this.timeToNextSpawn = 1;

        return spawn;
    }
}







// export const ROUND_CONFIG = {

//     1: {
//         simultaneous: false,
//         waves: [{rank: 1,
//                 count: 10,
//                 spacing: 100
//         }]
//     },

//     2: {
//         simultaneous: false,
//         waves: [{
//             rank: 1,
//             count: 20,
//             spacing: 100
//         }]
//     },

//     3: {
//         simultaneous: false,
//         waves: [{
//             rank: 1,
//             count: 5,
//             spacing: 100
//         }, {
//             rank: 2,
//             count: 5,
//             spacing: 100
//         }]
//     },

//     4: {
//         simultaneous: false,
//         waves: [{
//             rank: 1,
//             count: 10,
//             spacing: 100
//         }, {
//             rank: 2,
//             count: 10,
//             spacing: 100
//         }]
//     },

//     5: {
//         simultaneous: false,
//         waves: [{
//             rank: 2,
//             count: 20,
//             spacing: 80
//         }]
//     },

//     6: {
//         simultaneous: false,
//         waves: [{
//             rank: 3,
//             count: 10,
//             spacing: 100
//         }]
//     } 
// }