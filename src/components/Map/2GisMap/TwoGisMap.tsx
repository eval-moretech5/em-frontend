import { load } from '@2gis/mapgl';
import {Place, Point, Route} from "components/Map/types";
import {CircleMarker, Polyline, Map} from "@2gis/mapgl/global";
import {PolylineOptions} from "@2gis/mapgl/types/types";
import AbstractMap from "components/Map/AbstractMap/AbstractMap";

class TwoGisMap extends AbstractMap {

    private mapService: any;
    // @ts-ignore
    private map: Map;
    private zIndex: number = 1;

    private markers: Array<CircleMarker> = [];

    private inactivePaths: Array<Polyline> = [];
    private activePath: Array<Polyline> = [];
    // @ts-ignore
    private userPositionMarker: CircleMarker | null;

        componentDidMount() {

        load().then((mapService) => {

            this.mapService = mapService;

            this.map = new this.mapService.Map(AbstractMap.MAP_CONTAINER_ID, {
                center: [this.props.mapCenter.lon, this.props.mapCenter.lat],
                zoom: this.props.mapZoom,
                //TODO parametrize this key
                key: "9f38f583-42e5-4435-b5ee-30690705118a",

            });
            this.map?.on("moveend", () => {
                const center: Array<number> | undefined = this.map?.getCenter();
                this.props.saveCenter({
                    // @ts-ignore
                    lon: center[0], lat: center[1],
                });
            });
            this.map?.on("zoom", () => {
                this.props.saveZoom(this.map.getZoom());
            });

            this.props.setLoaded();
        });

    }

    componentWillUnmount() {
        this.markers.forEach((m) => m.destroy());
        this.inactivePaths.forEach((p) => p.destroy());
        this.activePath.forEach((p) => p.destroy());
        this.map?.destroy();
    }

    setMapCenter(position: Point) {
        this.map?.setCenter(
            [position.lon, position.lat],
            {
                animate: true,
                duration: 1000
            }
        );
    }

    displayBranches(branches: Array<Place>) {
        this.markers.forEach((marker: CircleMarker) => { marker.destroy()});
        this.markers = [];

        let i: number = 0;
        branches.forEach((branch) => {
            this.markers.push(this.displayBranch(branch.point, AbstractMap.INACTIVE_BRANCH_RADIUS, i, branch.lineTime));
            i++;
        });
    }

    displayUserPosition(point: Point, draggable: boolean) {
        const marker: CircleMarker = new mapgl.CircleMarker(this.map, {
            coordinates: [point.lon, point.lat],
            radius: AbstractMap.USER_POSITION_RADIUS * 2, //Баг, параметр назван radius, а по факту это диаметр
            color: AbstractMap.USER_POSITION_COLOR,
            strokeWidth: AbstractMap.USER_POSITION_BORDER_WIDTH,
            strokeColor: AbstractMap.USER_POSITION_BORDER_COLOR,
            zIndex: 1,
            interactive: true
        });

        /*marker.on("touchstart", (e) => {
            console.log(e);
        }).on("mousedown", (e) => {
            console.log(e);
        }).on("touchend", (e) => {
            console.log(e);
        }).on("mouseup", (e) => {
            console.log(e);
        }).on("mousemove", (e) => {
            console.log(e);
        })*/

        this.userPositionMarker = marker;
    }

    displayBranch(point: Point, radius: number, i: number, lineTime: number): CircleMarker {
        // @ts-ignore
        const marker: CircleMarker = new mapgl.CircleMarker(this.map, {
            coordinates: [point.lon, point.lat],
            radius: radius * 2, //Баг, параметр назван radius, а по факту это диаметр
            color: AbstractMap.BRANCH_COLOR,
            strokeWidth: AbstractMap.BRANCH_BORDER_WIDTH,
            strokeColor: this.getBranchBorderColor(lineTime),
            zIndex: 1,
        });

        marker.on("click", () => {
            this.props.branchClick(i);
            this.props.expand(["branches"]);
        });

        marker.on("mouseover", () => {
            if (this.props.displayType == "overviewFilter") {
                this.props.branchMouseOver(i);
                this.props.expand(["branches"]);
            }
        });

        return marker;
    }

    selectBranch(old: number, selected: number) {
        if (old > -1) {
            this.markers[old].destroy();
            this.markers[old] = this.displayBranch(this.props.branches[old].point, AbstractMap.INACTIVE_BRANCH_RADIUS, old, this.props.branches[old].lineTime);
        }
        if (selected > -1) {
            this.markers[selected].destroy();
            this.markers[selected] = this.displayBranch(this.props.branches[selected].point, AbstractMap.ACTIVE_BRANCH_RADIUS, selected, this.props.branches[selected].lineTime);
        }
    }

    displayRoutes(routes: Array<Route>) {

        this.inactivePaths.forEach((p) => {
            p.destroy();
        });
        this.inactivePaths = [];

        this.activePath.forEach((p) => {
            p.destroy();
        });
        this.activePath = [];

        let i: number = 0;
        routes.forEach((route) => {
            this.inactivePaths.push(this.drawInactivePath(route, i));
            i++;
        });
    }

    drawInactivePath(route: Route, i: number): Polyline {
        this.zIndex++;
        const polyline = new mapgl.Polyline(this.map, {
            coordinates: this.getLineCoords(route),
            width: AbstractMap.PATH_WIDTH,
            zIndex: this.zIndex,
            color: AbstractMap.INACTIVE_PATH_COLOR
        });

        polyline.on("click", () => {
            this.props.routeClick(i);
            this.props.expand(["routes"]);
        })

        return polyline;
    }

    selectRoute(old: number, selected: number, routes: Array<Route>) {
        if (old > -1) {
            this.inactivePaths[old] = this.drawInactivePath(this.props.routes[old], old);
        }

        if (selected < 0) {
            return;
        }
        this.activePath.forEach((p) => {
            p.destroy();
        });
        this.activePath = [];

        this.inactivePaths[selected].destroy();
        routes[selected].maneuvers.forEach((maneuver) => {
            if (maneuver.chunks == null) return;

            const lineCoords: Array<Array<number>> = [];

            maneuver.chunks.forEach((chunk) => {
                if (chunk.points == null) return;
                chunk.points.forEach((point) => {
                    lineCoords.push([point.lon, point.lat]);
                })

                this.zIndex++;

                let polylineOptions: PolylineOptions = {
                    coordinates: lineCoords,
                    width: 5,
                    zIndex: this.zIndex
                }
                let color;
                switch (chunk.color) {
                    case "fast":
                    case "no-traffic" :
                    default: color = "#32cd32";
                        break;
                    case "normal" : color = "#ffdE00";
                        break;
                    case "slow" : color = "#ff0000";
                        break;
                    case "slow-jams" : color = "#800000";
                        break;
                    case "ignore" : color = "#5b5b5b";
                        break;
                }
                polylineOptions.color = color;

                if (maneuver.type == "pedestrian") {
                    polylineOptions = {
                        ...polylineOptions,
                        color: '#696969',
                        dashLength: 10,
                        gapLength: 10,
                    };
                }

                // @ts-ignore
                const polyline = new mapgl.Polyline(this.map, polylineOptions);
                this.activePath.push(polyline);

            });

        });

    }
}

export default TwoGisMap;
