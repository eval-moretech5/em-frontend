import {List, Space} from "antd";
import React from "react";
import {Place} from "components/Map/types";
import {AtmBanks} from "components/Panel/types";

interface PlaceProps {
    id: number | string;
    selected: boolean;
    lineTime: number;
    address: string;
    type: Place['type'];
    distance: number;
    atmBanks: AtmBanks;
    ownerBank: string;
    company: string;

    onClick: () => void;
    onMouseOver: () => void;
}
export const PlaceElement = (props: PlaceProps) => (
    <List.Item
        key={props.id}
        style={{ cursor: "pointer", background: props.selected ? "#DFF0FF" : "transparent", borderRadius: "20px", padding: "0 5px", display: "block" }}
        onMouseOver={() => props.onMouseOver()}
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
                {props.type == "BRANCH" ? <BankOfficeIcon /> : <BankAtmIcon />}
            </div>
            <div style={{ padding: "5px 0" }}>
                <Space style={{ marginBottom: "0", width: "100%", display: "inline-flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#2456F6" }}>{`Очередь ${Math.round(props.lineTime / 60)} мин`}</span>
                    <span style={{ color: "#979292" }}>{ props.distance < 1000 ? `${props.distance} м` : `${ Math.round(props.distance / 100) / 10 } км` }</span>
                </Space>
                <Space style={{ marginBottom: "0", width: "100%", maxWidth: "100%", display: "inline-flex", justifyContent: "left", overflow: "hidden" }}>
                    <span style={{ whiteSpace: "nowrap", overflow: "hidden" }}>{ props.type == "BRANCH" || props.ownerBank == "VTB" ? "ВТБ" : props.company }</span>
                    <span style={{ whiteSpace: "nowrap", color: "#979292", overflow: "hidden", textOverflow: "ellipsis" }}>{
                        props.type == "BRANCH" ? "Отделение" : `Банкомат ${props.atmBanks[props.ownerBank]}`
                    }</span>
                </Space>
                <Space style={{ width: "100%", maxWidth: "100%", display: "inline-flex", justifyContent: "left", overflow: "hidden", }}>
                    <span style={{ fontSize: "14px", overflow: "hidden", position: "relative", textOverflow: "ellipsis" }}>{props.address}</span>
                </Space>
            </div>
        </Space>
    </List.Item>
);

export const BankOfficeIcon = () => (
    <svg width="26px" height="26px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" style={{ margin: "7px" }}>
        <path fill="white" d="M192 128v704h384V128H192zm-32-64h448a32 32 0 0 1 32 32v768a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32z"/>
        <path fill="white" d="M256 256h256v64H256v-64zm0 192h256v64H256v-64zm0 192h256v64H256v-64zm384-128h128v64H640v-64zm0 128h128v64H640v-64zM64 832h896v64H64v-64z"/>
        <path fill="white" d="M640 384v448h192V384H640zm-32-64h256a32 32 0 0 1 32 32v512a32 32 0 0 1-32 32H608a32 32 0 0 1-32-32V352a32 32 0 0 1 32-32z"/>
    </svg>
);

export const BankAtmIcon = () => (

    <svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" width="26px" height="26px" viewBox="0 0 512 512" style={{ margin: "7px" }}>
        <g>
            <path fill="white" className="st0" d="M469.922,0H42.078C23.156,0,7.859,15.313,7.844,34.219v102.688c0.016,18.906,15.313,34.219,34.234,34.234
                h47.75v-34.234h-47.75V34.219h427.844v102.688h-47.75v34.234h47.75c18.906-0.016,34.219-15.328,34.234-34.234V34.219
                C504.141,15.313,488.828,0,469.922,0z"/>
            <rect fill="white" x="189.891" y="181.125" className="st0" width="51.344" height="51.344"/>
            <rect fill="white" x="224.125" y="296.656" className="st0" width="25.672" height="128.344"/>
            <rect fill="white" x="172.781" y="296.656" className="st0" width="25.672" height="94.125"/>
            <path fill="white" className="st0" d="M111.969,512h288.094v-12.844V95.563H111.969V512z M374.391,486.328h-33.344V121.234h33.344V486.328z M137.641,121.234h160.625v365.094H137.641V121.234z"/>
        </g>
    </svg>
);