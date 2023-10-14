import {Route} from "components/Map/types";
import {AtmBanks} from "components/Panel/types";
import {List, Space} from "antd";
import React from "react";
import {BankAtmIcon, BankOfficeIcon} from "components/Panel/OverviewFilterPanel/Places/PlaceElement";

interface RouteElementProps {
    selected: boolean;
    atmBanks: AtmBanks;
    route: Route;

    onClick: () => void;
}

//TODO Зарефакторить. Перетащить общее с PlaceElement в общий компонент
export const RouteElement = (props: RouteElementProps) => (
    <List.Item
        key={props.route.id}
        style={{ cursor: "pointer", background: props.selected ? "#DFF0FF" : "transparent", borderRadius: "20px", padding: "5px", display: "block" }}
        onClick={() => props.onClick()}
    >
        <Space style={{ marginBottom: "0", width: "100%", display: "inline-flex", justifyContent: "left" }}>
            <div style={{
                width: "40px",
                height: "40px",
                borderRadius: "24px",
                border: "3px solid #1CCF63",
                backgroundColor: "#2456F6"
            }}>
                {props.route.place.type == "BRANCH" ? <BankOfficeIcon /> : <BankAtmIcon />}
            </div>
            <div style={{ padding: "5px 0" }}>
                <Space style={{ marginBottom: "0", width: "100%", display: "inline-flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#2456F6" }}>{`Очередь ${Math.round(props.route.place.lineTime / 60)} мин / в пути ${Math.round(props.route.duration / 60)} мин`}</span>
                    <span style={{ color: "#979292" }}>{ props.route.distance < 1000 ? `${props.route.distance} м` : `${ Math.round(props.route.distance / 100) / 10 } км` }</span>
                </Space>
                <Space style={{ marginBottom: "0", width: "100%", maxWidth: "100%", display: "inline-flex", justifyContent: "left", overflow: "hidden" }}>
                    <span style={{ whiteSpace: "nowrap", overflow: "hidden" }}>{ props.route.place.type == "BRANCH" || props.route.place.ownerBank == "VTB" ? "ВТБ" : props.route.place.organization }</span>
                    <span style={{ whiteSpace: "nowrap", color: "#979292", overflow: "hidden", textOverflow: "ellipsis" }}>{
                        props.route.place.type == "BRANCH" ? "Отделение" : `Банкомат ${props.atmBanks[props.route.place.ownerBank]}`
                    }</span>
                </Space>
                <Space style={{ width: "100%", maxWidth: "100%", display: "inline-flex", justifyContent: "left", overflow: "hidden", }}>
                    <span style={{ fontSize: "14px", overflow: "hidden", position: "relative", textOverflow: "ellipsis" }}>{props.route.place.address}</span>
                </Space>
                {/*<Space style={{ width: "100%", display: "inline-flex", justifyContent: "left" }}>
                    <Button icon={<TbRoute />} onClick={props.buildRoute} />
                </Space>*/}
            </div>
        </Space>
    </List.Item>
);