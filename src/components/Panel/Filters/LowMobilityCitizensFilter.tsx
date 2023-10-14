import React, {Component} from "react";
import {Space, Switch} from "antd";
import {FilterType, PanelFilterValueType} from "components/Panel/types";

interface LowMobilityCitizensFilterProps {
    setFilter: (type: FilterType, value: PanelFilterValueType) => void;
}

export default class LowMobilityCitizensFilter extends Component<LowMobilityCitizensFilterProps> {
    render() {
        return (
            <Space style={{ marginBottom: "10px", marginTop: "10px", width: "100%", display: "inline-flex", justifyContent: "space-between" }}>
                <Switch onChange={checked => this.props.setFilter("lowMobility", checked)} />
                Доступно для маломобильных граждан
            </Space>
        );
    }
}