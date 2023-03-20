function init(data) {
    return data.map(function(datum, idx) {
        return {
            id: idx,
            ...datum,
        };
    });
}

export default init;
