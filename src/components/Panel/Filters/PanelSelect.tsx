import {MenuItemType} from "antd/es/menu/hooks/useItems";
import React, {Component} from "react";
import {Button, Dropdown} from "antd";
import "utils/ant.css"

export interface PanelSelectProps {
    values: Array<any>;
    changeValue: (event: any) => void;
    items: Array<MenuItemType>;
    multiple?: boolean;
    renderLabel?: (items: Array<MenuItemType>, values: Array<string>) => string | undefined;
    renderIcon?: (items: Array<MenuItemType>, values: Array<string>) => string | undefined;
    width?: string;
}

export default class PanelSelect extends Component<PanelSelectProps> {

    getIcon() {
        if (this.props.renderIcon != undefined) {
            return this.props.renderIcon(this.props.items, this.props.values)
        }
        for (let i in this.props.items) {
            if (this.props.items[i]?.key == this.props.values[0]) {
                return this.props.items[i]?.icon;
            }
        }
    }

    getLabel() {
        if (this.props.renderLabel != undefined) {
            return this.props.renderLabel(this.props.items, this.props.values)
        }
        for (let i in this.props.items) {
            if (this.props.items[i]?.key == this.props.values[0]) {
                return this.props.items[i]?.label;
            }
        }
    }

    render() {

        return <>
            <Dropdown
                menu={{
                    items: this.props.items,
                    selectable: true,
                    multiple: this.props.multiple != undefined && this.props.multiple,
                    onSelect: (e) => {
                        this.props.multiple ? this.props.changeValue(e.selectedKeys) : this.props.changeValue(e.key)
                    },
                    onDeselect: (e) => {
                        if (this.props.multiple) {
                            this.props.changeValue(e.selectedKeys);
                        }
                    },
                    selectedKeys: this.props.values,
                }}
                trigger={["click"]}
            >
                <Button
                    shape="round"
                    icon={this.getIcon()}
                    style={{
                        borderColor: "#336AF7",
                        maxWidth: "100%",
                        width: this.props.width ? this.props.width : "auto",
                }}
                >
                    <span style={{
                        whiteSpace: "nowrap",
                        verticalAlign: "middle",
                        textOverflow: "ellipsis",
                        maxWidth: "100%",
                        overflow: "hidden"
                    }}>{this.getLabel()}</span></Button>
            </Dropdown>
        </>;
    }
}