import React, {Component} from "react";
import {Button, Space, Tooltip, Typography} from "antd";
import {BiCalendar} from "react-icons/bi";
import PanelSelect from "components/Panel/Filters/PanelSelect";
import {PlaceCardType, StatisticWeekType} from "components/Panel/types";
import _ from "lodash";

interface LineStatisticProps {
    placeCard: PlaceCardType;

    changeWeekStart: (weekStart: string) => void;
    changeSelectedDay: (selectedDay: string) => void;
}

interface WeekItem {
    key: string;
    label: string;
    icon: any;
}

export default class LineStatistic extends Component<LineStatisticProps> {
    render() {

        const containerWidth = 330;

        const start = 9;
        const end = 20;
        const columnWidth = 18;
        const gapWidth = 9;
        const multiplier = 1;
        const width = (end - start) * (columnWidth + gapWidth) - gapWidth;
        const maxHeight = Math.round(40 * multiplier);

        const days: Array<Date> = [];
        const startWeekDate = new Date(this.props.placeCard.weekStart);
        const selectedDay: Date = new Date(this.props.placeCard.selectedDay);

        for (let i = 0; i < 7; i++) {
            days.push( new Date( startWeekDate.valueOf() + (i * 24 * 60 * 60 * 1000) ) );
        }

        return <>
            <Space style={{ display: "inline-flex", justifyContent: "space-between" }}>
                <Typography.Title level={5} style={{ margin: "5px 0" }}>
                    Статистика посещения
                </Typography.Title>
                <PanelSelect
                    values={[this.props.placeCard.weekStart]}
                    changeValue={(value: StatisticWeekType) => {
                        this.props.changeWeekStart(value);
                    }}
                    items={this.weeks()}
                />
            </Space>

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
                    days.map((day, i) => {

                        const selected: boolean = day.getDate() == selectedDay.getDate();

                        return <>
                            <div style={{

                                position: "absolute",
                                left: (45 * i) + "px",
                                top: (maxHeight + 25) + "px",
                                width: 45 + "px",
                            }}>
                                <Button
                                    type={selected ? "primary" : "text"}
                                    shape="circle"
                                    onClick={() => this.props.changeSelectedDay( day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate() )}
                                >
                                    {["Вс","Пн","Вт","Ср","Чт","Пт","Сб",][day.getDay()]}
                                </Button>
                                <div
                                    style={{ color: "#C6C6C6", fontSize: "16px", }}
                                >{day.getDate()}/{day.getMonth()}</div>
                            </div>
                        </>
                    })
                }
            </div>
        </>;
    }

    lastWeekStart(): Date {
        const now: Date = new Date();

        const daysToRemove: number = now.getDay() == 0
            ? 6
            : now.getDay() - 1;

        return new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() - daysToRemove
        );
    }

    weeks(): Array<WeekItem> {
        const weekStarts: Array<WeekItem> = [];

        const lastWeekStart = this.lastWeekStart();

        for (let i = 4; i >= 0; i--) {

            const startDate = new Date( lastWeekStart.valueOf() - (i * 7 * 24 * 60 * 60 * 1000) );
            const endDate = new Date( lastWeekStart.valueOf() + (6 * 24 * 60 * 60 * 1000) );

            weekStarts.push({
                key: startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate(),
                label: (startDate.getDate()) + "/" + (startDate.getMonth() + 1) + "-" + (endDate.getDate()) + "/" + (endDate.getMonth() + 1),
                icon: <BiCalendar size={20} />
            });
        }

        return weekStarts;
    }

    /*dateToString(date: Date): string {
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    }*/
}