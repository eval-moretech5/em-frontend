import React from "react";
import {UserPointType} from "components/Map/types";
import {SlLocationPin} from "react-icons/sl";
import {FaLocationCrosshairs} from "react-icons/fa6";
import PanelSelect from "components/Panel/Filters/PanelSelect";

interface WhereFromFilterProps {
    userPointType: UserPointType
    setUserPointType: (userPointType: UserPointType) => void;
}

export const WhereFromFilter = (props: WhereFromFilterProps) => (
    <PanelSelect
        values={[props.userPointType]}
        changeValue={(key: UserPointType) => props.setUserPointType(key) }
        items={[
            {
                key: "auto" as UserPointType,
                label: "Моё местоположение",
                icon: <FaLocationCrosshairs />,
            },
            {
                key: "manual" as UserPointType,
                label: "Точка на карте",
                icon: <SlLocationPin />,
            },
        ]}
        width="260px"
    />
)