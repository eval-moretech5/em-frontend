import React, {Component} from "react";
import {Button, Tooltip, Typography} from "antd";
import {BiCalendar} from "react-icons/bi";
import PanelSelect from "components/Panel/Filters/PanelSelect";
import {StatisticWeekType} from "components/Panel/types";
import _ from "lodash";

interface LineStatisticProps {

}

export default class LineStatistic extends Component<LineStatisticProps> {
    render() {

        const start = 9;
        const end = 20;
        const columnWidth = 18;
        const gapWidth = 9;
        const multiplier = 1;
        const width = (end - start) * (columnWidth + gapWidth) - gapWidth;
        const maxHeight = Math.round(40 * multiplier);

        return <>
            <Typography.Title level={5} style={{ margin: "5px 0" }}>
                Статистика посещения <PanelSelect
                    values={["09/10-15/10"]}
                    changeValue={(value: StatisticWeekType) => {
                        console.log(value);
                    }}
                    items={[
                        {key: "25/09-01/10", icon: <BiCalendar size={20} />,     label: "25/09-01/10"},
                        {key: "02/10-08/10", icon: <BiCalendar size={20} />,     label: "02/10-08/10"},
                        {key: "09/10-15/10", icon: <BiCalendar size={20} />,     label: "09/10-15/10"},
                        {key: "16/10-22/10", icon: <BiCalendar size={20} />,     label: "16/10-22/10"},
                        {key: "23/10-29/10", icon: <BiCalendar size={20} />,     label: "23/10-29/10"},
                    ]}
                />
            </Typography.Title>

            <div style={{ position: "relative", height: (maxHeight + 80) + "px", }}>
                <div style={{ border: "1px solid #C2C2C2", width: width + "px", position: "absolute", top: maxHeight + "px", }} />
                {
                    _.range(start, end).map((h: number) => {

                        const columnLeft = (columnWidth + gapWidth) * (h - start);
                        const value = Math.round(Math.random() * maxHeight);
                        const height = value < 10 ? 10 : value;
                        let color;
                        if (value < 10)
                            color = "#00CC00";
                        else if (height < 30)
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
                {
                    _.range(7).map(n => {
                        const date: Date = new Date(2023,9,9);
                        date.setDate(date.getDate() + n);

                        return <>
                            <div style={{
                                position: "absolute",
                                left: (45 * n) + "px",
                                top: (maxHeight + 25) + "px",
                                width: 45 + "px",
                            }}>
                                <Button type={n == 2 ? "primary" : "text"} shape="circle">{["Вс","Пн","Вт","Ср","Чт","Пт","Сб",][date.getDay()]}</Button>
                                <div style={{ color: "#C6C6C6", fontSize: "16px", }}>{date.getDate()}/{date.getMonth()}</div>
                            </div>
                        </>
                    })
                }
            </div>
        </>;
    }
}