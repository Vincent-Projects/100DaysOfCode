import React from "react";

const weightsContext = React.createContext({
    weights: [],
    getYearWeights: () => { },
    getWeightsInfo: () => { },
    postTodayWeight: () => { },
    postWeightsInfo: () => { },
});

export default weightsContext;