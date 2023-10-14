import React, {Component} from "react";
import {List} from "antd";
import {Route} from "components/Map/types";
import {RouteElement} from "components/Panel/OverviewFilterPanel/Routes/RouteElement";
import {AtmBanks} from "components/Panel/types";

export interface RouteListProps {
    routes: Array<Route>;
    atmBanks: AtmBanks;
    selectedRoute: number;

    routeClick: (i: number) => void;
}

export default class RouteList extends Component<RouteListProps> {
    render() {
        return <List
            style={{ maxHeight: "250px", width: "", overflowY: "scroll", overflowX: "hidden" }}
            dataSource={this.props.routes}
            renderItem={(item, i) =>
                <RouteElement
                    route={item}
                    onClick={() => this.props.routeClick(i)}
                    atmBanks={this.props.atmBanks}
                    selected={i == this.props.selectedRoute}
                />
        }
        />;
    }
}