import {PanelType} from "components/Panel/types";
import {ConnectedOverviewFilterPanel} from "components/Panel/OverviewFilterPanel/ConnectedOverviewFilterPanel";
import {ConnectedPlaceDetailsPanel} from "components/Panel/PlaceDetailsPanel/ConnectedPlaceDetailsPanel";

interface PanelProps {
    type: PanelType;
}

export const Panel = (props: PanelProps) => {
    switch (props.type) {
        case "overviewFilter": return <ConnectedOverviewFilterPanel />;
        case "placeDetails": return <ConnectedPlaceDetailsPanel />;
    }
    return null;
}