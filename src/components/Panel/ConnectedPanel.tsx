import {connect} from "react-redux";
import {Panel} from "components/Panel/Panel";
import {PanelType} from "components/Panel/types";

const mapStateToProps = (storeState: any) => {
    return {
        type: storeState.panel.displayType as PanelType,
    }
}

export const ConnectedPanel = connect(mapStateToProps)(Panel);