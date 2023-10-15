import React, {Component} from "react";
import {Button, Space, Typography} from "antd";
import LineStatistic from "components/Panel/LineStatistic/LineStatistic";
import {PlaceCardType} from "components/Panel/types";

interface PersonTypeTabProps {
    schedule: string;
    key: string;
    placeCard: PlaceCardType;
    branch?: boolean;

    changeWeekStart: (weekStart: string) => void;
    changeSelectedDay: (selectedDay: string) => void;
}

export default class PersonTypeTab extends Component<PersonTypeTabProps> {
    render() {
        return <>
            {
                (this.props.schedule.length > 0)
                    ?   <>
                        <Space style={{ display: "inline-flex", justifyContent: "space-between", width: "100%", marginBottom: "15px" }}>
                            <Typography.Title level={5} style={{ marginTop: "5px" }}>Режим работы отделения</Typography.Title>
                            { this.props.branch ? <Button shape="round" style={{ borderColor: "#336AF7", }}>Записаться</Button> : null }
                        </Space>
                        <Typography.Paragraph type="secondary">{this.props.schedule}</Typography.Paragraph>
                    </>
                    : null
            }


            {
                this.props.branch
                ? <LineStatistic
                    placeCard={this.props.placeCard}
                    changeWeekStart={this.props.changeWeekStart}
                    changeSelectedDay={this.props.changeSelectedDay}
                />
                : null
            }

        </>;
    }
}