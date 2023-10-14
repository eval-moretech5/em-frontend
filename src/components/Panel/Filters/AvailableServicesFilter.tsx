import React from "react";
import {
    AvailableServicesFilterType,
    Filters,
    FilterType,
    PanelFilterValueType
} from "components/Panel/types";
import PanelSelect from "components/Panel/Filters/PanelSelect";

interface AvailableServicesFilterProps {
    filters: Filters;
    setFilter: (type: FilterType, value: PanelFilterValueType) => void;
}

export const AvailableServicesFilter = (props: AvailableServicesFilterProps) => (
    <PanelSelect
        values={props.filters.services}
        changeValue={(value: AvailableServicesFilterType) => {
            props.setFilter("services", value);
        } }
        items={[
            {key: "GET_CREDIT",     label: "Взять кредит"},
            {key: "GET_MORTGAGE",   label: "Взять ипотеку"},
            {key: "GET_CAR_CREDIT", label: "Взять автокредит"},
            {key: "PAY_LOAN",       label: "Оплатить кредит"},
            {key: "GET_CASH",       label: "Снять наличные"},
            {key: "PUT_CASH",       label: "Внести наличные"},
            {key: "SAFE_BOX",       label: "Сейфовая ячейка"},
            {key: "INVESTMENT",     label: "Инвестиции"},
        ]}
        multiple={true}
        renderLabel={(items, selected) => {
            if (selected.length == 0) {
                return "Услуги";
            }
            const labels: Array<string> = [];
            for (let i in items) {
                if (selected.includes(items[i].key as string)) {
                    labels.push(items[i].label as string);
                }
            }
            return labels.join(" / ");
        }}
        width="100%"
    />
);