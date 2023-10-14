import React, {Component} from "react";
import {List} from "antd";
import {Place} from "components/Map/types";
import {AtmBanks} from "components/Panel/types";
import {PlaceElement} from "components/Panel/OverviewFilterPanel/Places/PlaceElement";

export interface PlaceListProps {
    branches: Array<Place>;
    selectedBranch: number;
    atmBanks: AtmBanks;

    branchClick: (i: number) => void;
    branchMouseOver: (i: number) => void;
}

export default class PlaceList extends Component<PlaceListProps> {

    render() {
        return <List
            style={{ maxHeight: "250px", overflowY: "scroll", overflowX: "hidden" }}
            dataSource={this.props.branches}
            // itemLayout={"vertical"}
            renderItem={(item, i) =>
                <PlaceElement
                    id={item.id}
                    selected={i == this.props.selectedBranch}
                    lineTime={item.lineTime}
                    distance={item.distance}
                    address={item.address}
                    type={item.type}
                    onClick={() => this.props.branchClick(i)}
                    onMouseOver={() => this.props.branchMouseOver(i)}
                    atmBanks={this.props.atmBanks}
                    ownerBank={item.ownerBank}
                    company={item.organization}
                />
        }
        />;
    }
}