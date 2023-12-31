import React, {Component} from "react";
import {Place, Route, UserPointType} from "components/Map/types";
import {Button, Collapse, Divider, Space, Tabs, Typography} from "antd";
import {AiOutlineClose} from "react-icons/ai";
import {
    AtmBanks,
    Filters,
    FilterType,
    PanelFilterValueType,
    PersonFilterType,
    PlaceCardType
} from "components/Panel/types";
import {FaWheelchair} from "react-icons/fa";
import {FindRoutesButton} from "components/Panel/Filters/FindRoutesButton";
import {WhereFromFilter} from "components/Panel/Filters/WhereFromFilter";
import TransportTypeSwitcher from "components/Panel/Filters/TransportTypeSwitcher/TransportTypeSwitcher";
import {ItemType} from "rc-collapse/es/interface";
import RouteList from "components/Panel/OverviewFilterPanel/Routes/RouteList";
import PersonTypeTab from "components/Panel/PlaceDetailsPanel/PersonTypeTab";

interface PlaceDetailsPanelProps {
    place: Place;
    atmBanks: AtmBanks;
    userPointType: UserPointType;
    filters: Filters;
    expanded: Array<string>;
    routes: Array<Route>;
    selectedRoute: number;
    placeCard: PlaceCardType;

    buildRoute: () => void;
    closeDetails: () => void;
    setUserPointType: (userPointType: UserPointType) => void;
    setFilter: (type: FilterType, value: PanelFilterValueType) => void;
    expand: (items: Array<string>) => void;
    routeClick: (i: number) => void;
    changeWeekStart: (weekStart: string) => void;
    changeSelectedDay: (selectedDay: string) => void;
    setPlaceCardPersonTypeTab: (personType: PersonFilterType) => void;
}

export default class PlaceDetailsPanel extends Component<PlaceDetailsPanelProps> {
    render() {

        const items: Array<ItemType> = [
            {
                key: 'routes',
                label: 'Маршруты',
                children: <RouteList
                    routes={this.props.routes}
                    atmBanks={this.props.atmBanks}
                    routeClick={this.props.routeClick}
                    selectedRoute={this.props.selectedRoute}
                />,
            },
        ];

        let tabs;

        if (this.props.place.type == "BRANCH") {
            tabs = [
                {
                    key: "PHYSICAL" as PersonFilterType,
                    label: "Физические лица",
                    children: <PersonTypeTab
                        key="PHYSICAL"
                        schedule={this.props.place.textSchedule.naturalEntity}
                        placeCard={this.props.placeCard}
                        changeWeekStart={this.props.changeWeekStart}
                        changeSelectedDay={this.props.changeSelectedDay}
                        branch={true}
                    />,
                    disabled: !this.props.place.serviceNaturalEntity
                },
                {
                    key: "LEGAL" as PersonFilterType,
                    label: "Юридические лица",
                    children: <PersonTypeTab
                        key="LEGAL"
                        schedule={this.props.place.textSchedule.legalEntity}
                        placeCard={this.props.placeCard}
                        changeWeekStart={this.props.changeWeekStart}
                        changeSelectedDay={this.props.changeSelectedDay}
                        branch={true}
                    />,
                    disabled: !this.props.place.serviceLegalEntity
                },
            ];
        } else {
            let schedule = "";
            if (this.props.place.schedule != null && this.props.place.schedule.from != null && this.props.place.schedule.till != null) {
                schedule = this.props.place.schedule.from + "-" + this.props.place.schedule.till;
            }
            tabs = [
                {
                    key: "PHYSICAL" as PersonFilterType,
                    label: "Физические лица",
                    children: <PersonTypeTab
                        key="PHYSICAL"
                        schedule={schedule}
                        placeCard={this.props.placeCard}
                        changeWeekStart={this.props.changeWeekStart}
                        changeSelectedDay={this.props.changeSelectedDay}
                    />,
                    disabled: !this.props.place.serviceNaturalEntity
                }
            ];
        }

        return <>
            <Button
                type="text"
                icon={<AiOutlineClose color="#ACB6C3" size={19} />}
                onClick={this.props.closeDetails}
                style={{ position: "absolute", right: "5px", top: "5px" }}
            />
            <Typography.Title level={4} style={{ marginTop: 0, }}>{this.getName()}</Typography.Title>
            <Typography.Paragraph type="secondary">{this.props.place.address}</Typography.Paragraph>
            <Typography.Paragraph style={{ color: "#2456F6" }}><GraphIcon />  Очередь {Math.round(this.props.place.lineTime / 60)} мин</Typography.Paragraph>

            <Space style={{ marginBottom: "10px" }}>
                <WhereFromFilter userPointType={this.props.userPointType} setUserPointType={this.props.setUserPointType} />
            </Space>
            <TransportTypeSwitcher filters={this.props.filters} setFilter={this.props.setFilter} justify="left" />
            <Space>
                <FindRoutesButton caption="Построить маршрут" buildRoute={this.props.buildRoute} />
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

            <Tabs
                defaultActiveKey="1"
                items={tabs}
                onChange={(type: string) => this.props.setPlaceCardPersonTypeTab(type as PersonFilterType)}
            />

            {
                this.props.place.serviceLowMobility
                    ? <>
                        <Divider style={{ margin: "5px 0" }} />
                        <Typography.Title level={5} style={{ margin: "5px 0" }}>Доступная среда</Typography.Title>
                        <Typography.Paragraph style={{ verticalAlign: "middle" }}>
                            <FaWheelchair color="#336AF7" size={20} style={{ marginRight: "20px" }} /> Доступно для маломобильных граждан
                        </Typography.Paragraph>
                      </>
                    : null
            }

            <Space><a href="/swagger-ui/index.html" target="_blank"><img src="https://netshaper.ru/site/theme/images/ban1.png" style={{ width: "100%" }} /></a></Space>
            <Space><a href="/swagger-ui/index.html" target="_blank"><img src="https://netshaper.ru/site/theme/images/ban2.png" style={{ width: "100%" }} /></a></Space>


        </>;
    }

    getName(): string {

        if (this.props.place == null || this.props.place.type == null) {
            console.log(this.props);
            return "";
        }

        if (this.props.place.type == "BRANCH") {
            return this.props.place.name;
        }

        const atmName = `Банкомат ${this.props.atmBanks[this.props.place.ownerBank]}`;

        if (this.props.place.organization != undefined && this.props.place.organization.length > 0) {
            return atmName + " / " + this.props.place.organization;
        }

        return atmName;
    }
}

export const GraphIcon = () => (
    <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.5 9L3.5 7.5L0.5 7.5L0.5 9L3.5 9ZM0.5 9L0.5 16L3.5 16L3.5 9L0.5 9Z" fill="#336AF7"/>
        <path d="M9 2L9 0.5L6 0.5L6 2L9 2ZM6 2L6 16L9 16L9 2L6 2Z" fill="#336AF7"/>
        <path d="M14.7144 6.28564V4.78564H11.7144V6.28564H14.7144ZM11.7144 6.28564V15.9999H14.7144V6.28564H11.7144Z" fill="#336AF7"/>
    </svg>
);