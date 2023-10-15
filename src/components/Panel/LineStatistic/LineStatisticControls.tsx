import React from "react";
import {Button} from "antd";
import dateFormat from "dateformat";

interface LineStatisticControlsProps{
    weekStart: string;
    selectedDay: string;
    maxHeight: number;

    changeWeekStart: (weekStart: string) => void;
    changeSelectedDay: (selectedDay: string) => void;
}

export const LineStatisticControls = (props:LineStatisticControlsProps) => {

    const days: Array<Date> = [];
    const startWeekDate = new Date(props.weekStart);
    const selectedDay: Date = new Date(props.selectedDay);

    for (let i = 0; i < 7; i++) {
        days.push( new Date( startWeekDate.valueOf() + (i * 24 * 60 * 60 * 1000) ) );
    }

    return days.map((day, i) => {

        const selected: boolean = day.getDate() == selectedDay.getDate();

        return <>
            <div style={{

                position: "absolute",
                left: (45 * i) + "px",
                top: (props.maxHeight + 25) + "px",
                width: 45 + "px",
            }}>
                <Button
                    type={selected ? "primary" : "text"}
                    shape="circle"
                    onClick={() => props.changeSelectedDay( dateFormat(day, "yyyy-mm-dd"))}
                >
                    {["Вс","Пн","Вт","Ср","Чт","Пт","Сб",][day.getDay()]}
                </Button>
                <div
                    style={{ color: "#C6C6C6", fontSize: "16px", }}
                >{day.getDate()}/{day.getMonth()}</div>
            </div>
        </>
    });
}