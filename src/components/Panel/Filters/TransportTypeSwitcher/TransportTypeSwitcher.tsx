import {Component} from "react";
import {WalkIcon} from "components/Panel/Filters/TransportTypeSwitcher/WalkIcon";
import {ScooterIcon} from "components/Panel/Filters/TransportTypeSwitcher/ScooterIcon";
import {CarIcon} from "components/Panel/Filters/TransportTypeSwitcher/CarIcon";
import {IconCircleButton} from "components/Panel/Filters/TransportTypeSwitcher/IconCircleButton";
import {Space} from "antd";
import {Filters, FilterType, PanelFilterValueType} from "components/Panel/types";
import {Property} from "csstype";

interface TransportTypeSwitcherProps {
    filters: Filters;
    setFilter: (type: FilterType, value: PanelFilterValueType) => void;
    justify?: Property.JustifyContent;
}

export default class TransportTypeSwitcher extends Component<TransportTypeSwitcherProps> {
    render() {
        return <>
            <Space style={{ marginBottom: "10px", width: "100%", display: "inline-flex", justifyContent: this.props.justify || "center" }}>
                <IconCircleButton
                    Icon={CarIcon}
                    selected={this.props.filters.transport == "CAR"}
                    changeType={() => { this.props.setFilter("transport", "CAR") }}
                />
                <IconCircleButton
                    Icon={WalkIcon}
                    selected={this.props.filters.transport == "WALK"}
                    changeType={() => { this.props.setFilter("transport", "WALK") }}
                />
                <IconCircleButton
                    Icon={ScooterIcon}
                    selected={this.props.filters.transport == "SCOOTER"}
                    changeType={() => { this.props.setFilter("transport", "SCOOTER") }}
                />
            </Space>
        </>;
    }
}