import React, {Component} from "react";
import {Collapse, Space} from "antd";
import {Place, Route, UserPointType} from "components/Map/types";
import {ItemType} from "rc-collapse/es/interface";
import {AtmBanks, Filters, FilterType, PanelFilterValueType} from "components/Panel/types";
import PlaceList from "components/Panel/OverviewFilterPanel/Places/PlaceList";
import RouteList from "components/Panel/OverviewFilterPanel/Routes/RouteList";
import LowMobilityCitizensFilter from "components/Panel/Filters/LowMobilityCitizensFilter";
import {AvailableServicesFilter} from "components/Panel/Filters/AvailableServicesFilter";
import {PersonTypeSwitchFilter} from "components/Panel/Filters/PersonTypeSwitchFilter";
import {WhereFromFilter} from "components/Panel/Filters/WhereFromFilter";
import {VtbLogo} from "components/Panel/OverviewFilterPanel/VtbLogo";
import {DateTimeSelectFilter} from "components/Panel/Filters/DateTimeSelectFilter";
import TransportTypeSwitcher from "components/Panel/Filters/TransportTypeSwitcher/TransportTypeSwitcher";
import {FindRoutesButton} from "components/Panel/Filters/FindRoutesButton";

export interface OverviewFilterPanelProps {
    branches: Array<Place>;
    selectedBranch: number;
    expanded: Array<string>;
    routes: Array<Route>;
    requestRoutes: () => void;
    selectedRoute: number;
    atmBanks: AtmBanks;
    userPointType: UserPointType;
    filters: Filters;

    expand: (items: Array<string>) => void;
    branchMouseOver: (i: number) => void;
    branchClick: (i: number) => void;
    routeClick: (i: number) => void;
    setFilter: (type: FilterType, value: PanelFilterValueType) => void;
    setUserPointType: (userPointType: UserPointType) => void;
    fetchAtmBankTitles: () => void;
}

class OverviewFilterPanel extends Component<OverviewFilterPanelProps> {

    render() {

        const items: Array<ItemType> = [
            {
                key: 'branches',
                label: 'Отделения / Банкоматы',
                children: <PlaceList {...this.props} />,
            },
            {
                key: 'routes',
                label: 'Маршруты',
                children: <RouteList {...this.props} />,
            },
        ];

        return (
            <>
                <Space style={{ marginBottom: "10px", width: "100%", display: "inline-flex", justifyContent: "space-between" }}>
                    <WhereFromFilter {...this.props} />
                    <VtbLogo />
                </Space>

                <Space style={{ marginBottom: "10px", width: "100%", display: "inline-flex", justifyContent: "space-between" }}>
                    <DateTimeSelectFilter />
                    <PersonTypeSwitchFilter {...this.props} />
                </Space>

                <AvailableServicesFilter {...this.props} />

                <LowMobilityCitizensFilter {...this.props} />

                <TransportTypeSwitcher {...this.props} />

                <Space style={{ marginBottom: "20px", width: "100%", display: "inline-flex", justifyContent: "center" }}>
                    <FindRoutesButton caption="Найти кратчайшие маршруты" buildRoute={this.props.requestRoutes} />
                </Space>

                <Collapse
                    style={{ paddingLeft: 0, paddingRight: 0 }}
                    activeKey={ this.props.expanded }
                    ghost
                    items={items}
                    onChange={(items) => {
                        this.props.expand(typeof items == "string" ? [items] : items)
                    }}
                    accordion={true}
                />
            </>
        )
    }

    componentDidMount() {
        this.props.fetchAtmBankTitles();
    }
}

export default OverviewFilterPanel;