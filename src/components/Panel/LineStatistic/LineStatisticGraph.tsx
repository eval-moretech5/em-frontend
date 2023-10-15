import {Tooltip} from "antd";
import React from "react";
import {StatResponse} from "components/Panel/types";

interface LineStatisticGraphProps {
    stats: StatResponse;
}

export const LineStatisticGraph = (props: LineStatisticGraphProps) => {

    const start = parseInt(Object.keys(props.stats)[0]);
    // const end = 20;
    const columnWidth = 18;
    const gapWidth = 9;
    // const multiplier = 1;
    // const width = (end - start) * (columnWidth + gapWidth) - gapWidth;
    const maxHeight = 40;

    return Object.keys(props.stats).map((h: string) => {

        const hnum = parseInt(h);

        const columnLeft = (columnWidth + gapWidth) * (hnum - start);
        const value = Math.round( props.stats[h] / 60 );
        const height = value < 10 ? 10 : value;
        let color;
        if (value <= 10)
            color = "#00CC00";
        else if (height <= 30)
            color = "#f1c232";
        else
            color = "#ff0000";

        return <>
            <Tooltip title={<span style={{ color: "#000000" }}>Очередь {value} мин</span>} color="#ECECEC" key={h}>
                <div style={{
                    position: "absolute",
                    left: columnLeft + "px",
                    top: (maxHeight - height) + "px",
                    width: columnWidth,
                    height: height + "px",
                    backgroundColor: color,
                    opacity: 0.5
                }}/>
            </Tooltip>
            <div style={{
                position: "absolute",
                left: (columnLeft - 4) + "px",
                top: maxHeight + "px",
                width: (columnWidth + 8) + "px",
                color: "#9F9F9F",
                fontSize: "19px",
                textAlign: "center",
            }}>{h}</div>
        </>
    })
}