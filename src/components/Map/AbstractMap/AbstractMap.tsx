import {Component} from "react";
import {Place, CommonMapProps, Point, Route} from "components/Map/types";

abstract class AbstractMap extends Component<CommonMapProps> {


    protected static INACTIVE_BRANCH_RADIUS: number = 8;
    protected static BRANCH_COLOR: string = "#008AD8";
    protected static BRANCH_BORDER_WIDTH: number = 3;
    protected static BRANCH_BORDER_LITTLE_BUSY_COLOR: string = "#00CC00";
    protected static BRANCH_BORDER_MEDIUM_BUSY_COLOR: string = "#f1c232";
    protected static BRANCH_BORDER_VERY_BUSY_COLOR: string = "#ff0000";
    protected static ACTIVE_BRANCH_RADIUS: number = 13;

    protected static INACTIVE_PATH_COLOR: string = "#8f8f8f";
    protected static PATH_WIDTH: number = 5;

    protected static USER_POSITION_RADIUS: number = 13;
    protected static USER_POSITION_COLOR: string = "#20d800";
    protected static USER_POSITION_BORDER_WIDTH: number = 2;
    protected static USER_POSITION_BORDER_COLOR: string = "#ffffff";

    protected static MAP_CONTAINER_ID: string = "map-container";

    render() {
        return <div id={AbstractMap.MAP_CONTAINER_ID} style={{ width: "100%", height: "100%" }}></div>
    }

    shouldComponentUpdate(nextProps: Readonly<CommonMapProps>) {

        switch (nextProps.event) {
            case "loaded" :
                this.processMapLoaded();
                break;
            case "positionSet" :
                this.processPositionSet(nextProps.userPoint);
                break;
            case "userPointDraggableChanged" :
                this.displayUserPosition(nextProps.userPoint, nextProps.userPointType == "manual");
                break;
            case "fetchedBranches" :
                this.displayBranches(nextProps.branches);
                break;
            case "selectedBranch" :
                this.selectBranch(this.props.selectedBranch, nextProps.selectedBranch);
                break;
            case "fetchedRoutes" :
                this.displayRoutes(nextProps.routes);
                this.selectRoute(-1, nextProps.selectedRoute, nextProps.routes);
                break;
            case "selectedRoute" :
                this.selectRoute(this.props.selectedRoute, nextProps.selectedRoute, this.props.routes);
                break;
        }
        return false;
    }

    processMapLoaded() {
        if (this.props.userPoint != null) {
            if (this.props.branches == undefined || this.props.branches.length == 0) {
                this.props.loadBranches();
            } else {
                this.displayUserPosition(this.props.userPoint, this.props.userPointType == "manual");
                this.displayBranches(this.props.branches);
                this.selectBranch(-1, this.props.selectedBranch);
                this.displayRoutes(this.props.routes);
                this.selectRoute(-1, this.props.selectedRoute, this.props.routes);
            }
        }
    }

    getLineCoords(route: Route): Array<Array<number>> {
        const lineCoords: Array<Array<number>> = [];
        route.maneuvers.forEach((maneuver) => {
            if (maneuver.chunks == null) return;
            maneuver.chunks.forEach((chunk) => {
                if (chunk.points == null) return;
                chunk.points.forEach((point) => {
                    lineCoords.push([point.lon, point.lat]);
                });
            });
        });
        return lineCoords;
    }

    processPositionSet(position: Point | null) {
        if (this.props.loaded && position != null) {
            this.setMapCenter(position);
            this.displayUserPosition(position, false);
            this.props.loadBranches();
        }
    }

    getBranchBorderColor(lineTime: number) {
        if (lineTime < 60 * 10) {
            return AbstractMap.BRANCH_BORDER_LITTLE_BUSY_COLOR;
        }
        if (lineTime < 60 * 30) {
            return AbstractMap.BRANCH_BORDER_MEDIUM_BUSY_COLOR;
        }
        return AbstractMap.BRANCH_BORDER_VERY_BUSY_COLOR;
    }

    abstract setMapCenter(position: Point): void

    abstract displayUserPosition(point: Point | null, draggable: boolean): void;

    abstract displayBranches(branches: Array<Place>): void;

    abstract selectBranch(old: number, selected: number): void;

    abstract displayRoutes(routes: Array<Route>): void;

    abstract selectRoute(old: number, selected: number, routes: Array<Route>): void;
}

export default AbstractMap;
