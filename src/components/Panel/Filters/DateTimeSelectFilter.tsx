import PanelSelect from "components/Panel/Filters/PanelSelect";
import React from "react";
import {BiRun} from "react-icons/bi";
import {BsCalendarDate} from "react-icons/bs";

export const DateTimeSelectFilter = () => (
    <PanelSelect
        values={["now"]}
        changeValue={(key: string) => console.log(key) }
        items={[
            {
                key: "now",
                label: "Сейчас",
                icon: <BiRun />,
            },
            {
                key: "date",
                label: "Выбрать дату",
                icon: <BsCalendarDate />,
            },
        ]}
        width="120px"
    />
)
