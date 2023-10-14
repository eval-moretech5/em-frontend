import {CSSProperties} from "react";

export type PanelType = "overviewFilter" | "placeDetails";

export type FilterType = "transport" | "personType" | "lowMobility" | "premium" | "services";

export type TransportFilterType = "CAR" | "WALK" | "SCOOTER";
export type PersonFilterType = "PHYSICAL" | "LEGAL" | "PREMIUM" | "PRIVILEGE";
export type LowMobilityFilterType = boolean;
export type ServiceValueType = "GET_CREDIT" | "GET_MORTGAGE" | "GET_CAR_CREDIT" | "PAY_LOAN" | "GET_CASH" | "PUT_CASH" | "SAFE_BOX" | "INVESTMENT";
export type AvailableServicesFilterType = Array<ServiceValueType>;
export type StatisticWeekType = string;

export type PanelFilterValueType = TransportFilterType | PersonFilterType | LowMobilityFilterType | AvailableServicesFilterType | StatisticWeekType;

export interface FilterActionPayload {
    type: FilterType;
    value: PanelFilterValueType;
}

export type AtmBanks = { [alias in string]: string }

export interface Filters {
    transport: TransportFilterType;
    premium: boolean;
    lowMobility: boolean;
    personType: PersonFilterType;
    services: AvailableServicesFilterType;
}

export interface TransportTypeIconProps {
    color: string;
    style: CSSProperties;
}

export interface PlaceCardType {
    personTypeTab: PersonFilterType;
    weekStart: string;
    selectedDay: string;
}