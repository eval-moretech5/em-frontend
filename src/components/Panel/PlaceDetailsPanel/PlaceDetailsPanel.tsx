import React, {Component} from "react";
import {Place, Route, UserPointType} from "components/Map/types";
import {Button, Collapse, Divider, Space, Typography} from "antd";
import {AiOutlineClose} from "react-icons/ai";
import {AtmBanks, Filters, FilterType, PanelFilterValueType} from "components/Panel/types";
import {FaUser, FaUserTie} from "react-icons/fa6";
import {FaWheelchair} from "react-icons/fa";
import {FindRoutesButton} from "components/Panel/Filters/FindRoutesButton";
import {WhereFromFilter} from "components/Panel/Filters/WhereFromFilter";
import TransportTypeSwitcher from "components/Panel/Filters/TransportTypeSwitcher/TransportTypeSwitcher";
import {ItemType} from "rc-collapse/es/interface";
import RouteList from "components/Panel/OverviewFilterPanel/Routes/RouteList";
import LineStatistic from "components/Panel/PlaceDetailsPanel/LineStatistic";

interface PlaceDetailsPanelProps {
    place: Place;
    atmBanks: AtmBanks;
    userPointType: UserPointType;
    filters: Filters;
    expanded: Array<string>;
    routes: Array<Route>;
    selectedRoute: number;

    buildRoute: () => void;
    closeDetails: () => void;
    setUserPointType: (userPointType: UserPointType) => void;
    setFilter: (type: FilterType, value: PanelFilterValueType) => void;
    expand: (items: Array<string>) => void;
    routeClick: (i: number) => void;
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

            <Typography.Title level={5} style={{ marginTop: "5px" }}>Обслуживание</Typography.Title>

            {
                this.props.place.serviceLegalEntity
                    ? <Space style={{ display: "inline-flex", justifyContent: "space-between", width: "100%", marginBottom: "15px" }}>
                        <Typography.Text style={{ verticalAlign: "middle" }}>
                            <FaUserTie color="#336AF7" size={20} style={{ marginRight: "20px" }} /> Юридические лица
                        </Typography.Text>
                        <Button shape="round" style={{ borderColor: "#336AF7", }}>Записаться</Button>
                    </Space>
                    : null
            }

            {
                this.props.place.type == "ATM" || this.props.place.serviceNaturalEntity
                    ? <Space style={{ display: "inline-flex", justifyContent: "space-between", width: "100%" }}>
                        <Typography.Text style={{ verticalAlign: "middle",  }}>
                            <FaUser color="#336AF7" size={20} style={{ marginRight: "20px" }} /> Физические лица
                        </Typography.Text>
                        <Button shape="round" style={{ borderColor: "#336AF7", }}>Записаться</Button>
                    </Space>
                    : null
            }

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

            <Divider style={{ margin: "5px 0" }} />

            {
                this.props.place.type == "BRANCH"
                    ? <LineStatistic />
                    : null
            }

            <Divider style={{ margin: "5px 0" }} />
            <Typography.Title level={5} style={{ marginTop: "5px" }}>Режим работы отделения</Typography.Title>

            {
                this.props.place.type == "BRANCH"
                    ? <>
                        {
                            this.props.place.serviceLegalEntity
                                ? <>
                                    <Typography.Paragraph strong>Для юридических лиц</Typography.Paragraph>
                                    <Typography.Paragraph type="secondary">{this.props.place.textSchedule.legalEntity}</Typography.Paragraph>
                                  </>
                                : null
                        }
                        {
                            this.props.place.serviceNaturalEntity
                                ? <>
                                    <Typography.Paragraph strong>Для юридических лиц</Typography.Paragraph>
                                    <Typography.Paragraph type="secondary">{this.props.place.textSchedule.naturalEntity}</Typography.Paragraph>
                                  </>
                                : null
                        }
                    </>
                    : <>
                        <Typography.Paragraph strong>Для физических лиц</Typography.Paragraph>
                        <Typography.Paragraph type="secondary">
                            {
                                this.props.place.schedule?.from
                                    ? this.props.place.schedule?.from + "-" + this.props.place.schedule?.till
                                    : "Круглосуточно"
                            }
                        </Typography.Paragraph>
                      </>
            }

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