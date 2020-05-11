function init(data) {
    let rows = data.split('\r\n').slice(1);

    rows = rows.filter((row) => {
        return row.length
    });

    rows = rows.map(function(row, idx) {
        const cols = row.split(',');
        return {
            id: idx,
            video_id: cols[0],
            set: cols[1],
            colors: cols[2],
            timestamp_draft: cols[3],
            timestamp_match: cols[4],
            player: cols[5],
            format: cols[6],
            soft: cols[7],
        };
    });

    return rows;
}

export default init;
