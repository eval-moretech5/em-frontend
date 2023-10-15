import React, {Component} from "react";
import {Space, Typography} from "antd";
import {BiCalendar} from "react-icons/bi";
import PanelSelect from "components/Panel/Filters/PanelSelect";
import {PlaceCardType, StatisticWeekType} from "components/Panel/types";
import {LineStatisticControls} from "components/Panel/LineStatistic/LineStatisticControls";
import {LineStatisticGraph} from "components/Panel/LineStatistic/LineStatisticGraph";
import dateFormat from "dateformat";

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

        const maxHeight = 40;

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
                <div style={{ border: "1px solid #C2C2C2", width: "100%", position: "absolute", top: maxHeight + "px", }} />

                {/*// @ts-ignore*/}
                <LineStatisticGraph stats={this.props.placeCard.lineStats} />

                {/*// @ts-ignore*/}
                <LineStatisticControls
                    weekStart={this.props.placeCard.weekStart}
                    selectedDay={this.props.placeCard.selectedDay}
                    maxHeight={maxHeight}
                    changeWeekStart={this.props.changeWeekStart}
                    changeSelectedDay={this.props.changeSelectedDay}
                />

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
            const endDate = new Date( startDate.valueOf() + (6 * 24 * 60 * 60 * 1000) );

            weekStarts.push({
                key: dateFormat(startDate, "yyyy-mm-dd"),
                label: dateFormat(startDate, "mm/dd") + "-" + dateFormat(endDate, "mm/dd"),
                icon: <BiCalendar size={20} />
            });
        }

        return weekStarts;
    }
}