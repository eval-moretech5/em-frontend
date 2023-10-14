import React, {Component} from "react";
import {Space, Switch} from "antd";
import {FilterType, PanelFilterValueType} from "components/Panel/types";

interface PremiumServiceFilterProps {
    setFilter: (type: FilterType, value: PanelFilterValueType) => void;
}

export default class PremiumServiceFilter extends Component<PremiumServiceFilterProps> {
    render() {
        return (
            <Space style={{ marginBottom: "20px", width: "100%", display: "inline-flex", justifyContent: "space-between" }}>
                Есть зона премиального обсулуживания
                <Switch onChange={checked => this.props.setFilter("premium", checked)} />
            </Space>
        );
    }
}