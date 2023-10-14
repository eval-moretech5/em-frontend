import {Place, Point, Route} from "components/Map/types";
import AbstractMap from "components/Map/AbstractMap/AbstractMap";
import {YMap, YMapMarker, YMapListener, YMapFeature} from "@yandex/ymaps3-types";
import {DrawingStyle} from "@yandex/ymaps3-types/common/types";
import {StrokeStyle} from "@yandex/ymaps3-types/common/types/graphics";
import {YMapLocationRequest} from "@yandex/ymaps3-types/imperative/YMap";

class YandexMapV3 extends AbstractMap {


    private map: YMap | null = null;
    private zIndex: number = 1;

    private markers: Array<YMapMarker> = [];
    private inactivePaths: Array<YMapFeature> = [];
    private activePath: Array<YMapFeature> = [];
    private userPositionMarker: YMapMarker | null = null;


    componentDidMount() {

        ymaps3.ready.then(() => {

            const mapContainer = document.getElementById(AbstractMap.MAP_CONTAINER_ID);
            if (mapContainer == null) {
                return;
            }

            this.map = new YMap(
                mapContainer,
                {
                    location: {
                        zoom: this.props.mapZoom,
                        center: [this.props.mapCenter.lon, this.props.mapCenter.lat]
                    },
                    // behaviors: ['drag', 'scrollZoom', 'pinchZoom', 'dblClick', 'mouseTilt'],
                    mode: "vector",
                },
                [
                    // @ts-ignore
                    new ymaps3.YMapDefaultSchemeLayer(),
                    // @ts-ignore
                    new ymaps3.YMapDefaultFeaturesLayer(),
                ],
            );

            this.map.addChild(
                new YMapListener({
                    onActionEnd: (o) => {
                        switch (o.type) {
                            case "drag" :
                                this.props.saveCenter({
                                    lon: o.location.center[0],
                                    lat: o.location.center[1]
                                });
                                break;
                            case "scrollZoom":
                                this.props.saveZoom(Math.floor(o.location.zoom));
                                break;
                        }

                    },
                })
            );

            this.props.setLoaded();
        });
    }

    componentWillUnmount() {
        this.map != null && this.map.destroy();
    }

    displayBranch(point: Point, radius: number, i: number, lineTime: number): YMapMarker {
        const element = document.createElement('div');
        element.style.width = (radius * 2) + "px";
        element.style.height = (radius * 2) + "px";
        element.style.marginLeft = "-" + (radius + AbstractMap.BRANCH_BORDER_WIDTH) + "px";
        element.style.marginTop = "-" + (radius + AbstractMap.BRANCH_BORDER_WIDTH) + "px";
        element.style.borderRadius = (radius + AbstractMap.BRANCH_BORDER_WIDTH) + "px";
        element.style.backgroundColor = AbstractMap.BRANCH_COLOR;
        element.style.borderWidth = AbstractMap.BRANCH_BORDER_WIDTH + "px";

        element.style.borderColor = this.getBranchBorderColor(lineTime);
        element.style.borderStyle = "solid";
        element.style.cursor = "pointer";

        element.onmouseover = () => {
            if (this.props.displayType == "overviewFilter") {
                this.props.branchMouseOver(i);
                this.props.expand(["branches"]);
            }
        };

        const marker: YMapMarker = new YMapMarker({
            coordinates: [point.lon, point.lat],
            onClick: () => {
                this.props.branchClick(i);
            }
        }, element);

        this.map?.addChild(marker);

        return marker;
    }

    //TODO Refactor with method above
    displayUserPosition(point: Point, draggable: boolean): void {
        const radius = AbstractMap.USER_POSITION_RADIUS;
        const element = document.createElement('div');
        element.style.width = (radius * 2) + "px";
        element.style.height = (radius * 2) + "px";
        element.style.marginLeft = "-" + (radius + AbstractMap.BRANCH_BORDER_WIDTH) + "px";
        element.style.marginTop = "-" + (radius + AbstractMap.BRANCH_BORDER_WIDTH) + "px";
        element.style.borderRadius = (radius + AbstractMap.BRANCH_BORDER_WIDTH) + "px";
        element.style.backgroundColor = AbstractMap.USER_POSITION_COLOR;
        element.style.borderWidth = AbstractMap.USER_POSITION_BORDER_WIDTH + "px";
        element.style.borderColor = AbstractMap.USER_POSITION_BORDER_COLOR;
        element.style.borderStyle = "solid";
        element.style.cursor = "pointer";

        const marker: YMapMarker = new YMapMarker({
            coordinates: [point.lon, point.lat],
            draggable,
            onDragEnd: (coordinates) => {
                this.props.setManualPosition({
                    lon: coordinates[0],
                    lat: coordinates[1]
                });
            }
        }, element)

        if (this.userPositionMarker != null) {
            this.map?.removeChild(this.userPositionMarker);
        }

        this.userPositionMarker = marker;

        this.map?.addChild(marker);
    }

    displayBranches(branches: Array<Place>): void {
        this.markers.forEach((marker: YMapMarker) => {
            this.map?.removeChild(marker);
        });
        this.markers = [];

        let i: number = 0;
        branches.forEach((branch) => {
            this.markers.push( this.displayBranch(branch.point, AbstractMap.INACTIVE_BRANCH_RADIUS, i, branch.lineTime) );
            i++;
        });
    }

    displayRoutes(routes: Array<Route>): void {
        this.inactivePaths.forEach((p) => {
            this.map?.removeChild(p);
        });
        this.inactivePaths = [];
        this.activePath.forEach((p) => {
            this.map?.removeChild(p);
        });
        this.activePath = [];

        let i: number = 0;
        routes.forEach((route) => {
            this.inactivePaths.push(this.drawInactivePath(route, i));
            i++;
        });
    }

    drawInactivePath(route: Route, i: number): YMapFeature {

        this.zIndex++;
        const polyline: YMapFeature = new YMapFeature({
            draggable: false,
            geometry: {
                type: "LineString",
                // @ts-ignore
                coordinates: this.getLineCoords(route)
            },
            style: {
                zIndex: this.zIndex,
                stroke: [
                    {
                        color: AbstractMap.INACTIVE_PATH_COLOR,
                        width: AbstractMap.PATH_WIDTH,
                    }
                ],
                cursor: "pointer",
            } as DrawingStyle,
            onClick: () => {
                this.props.routeClick(i);
                this.props.expand(["routes"]);
            }
        });
        this.map?.addChild(polyline);

        return polyline;
    }

    setMapCenter(position: Point) {
        const centerLocation: YMapLocationRequest = {
            center: [position.lon, position.lat],
            duration: 3,
            easing: "ease"
        };
        this.map?.setLocation(centerLocation);
    }

    selectBranch(old: number, selected: number): void {
        if (old > -1) {
            this.map?.removeChild(this.markers[old]);
            this.markers[old] = this.displayBranch(this.props.branches[old].point, AbstractMap.INACTIVE_BRANCH_RADIUS, old, this.props.branches[old].lineTime);
        }
        if (selected > -1) {
            this.map?.removeChild(this.markers[selected]);
            this.markers[selected] = this.displayBranch(this.props.branches[selected].point, AbstractMap.ACTIVE_BRANCH_RADIUS, selected, this.props.branches[selected].lineTime);
        }
    }

    selectRoute(old: number, selected: number, routes: Array<Route>): void {
        if (old > -1) {
            this.inactivePaths[old] = this.drawInactivePath(this.props.routes[old], old);
        }

        if (selected < 0) {
            return;
        }
        this.activePath.forEach((p) => {
            this.map?.removeChild(p);
        });
        this.activePath = [];

        this.map?.removeChild(this.inactivePaths[selected]);

        routes[selected].maneuvers.forEach((maneuver) => {
            if (maneuver.chunks == null) return;

            const lineCoords: Array<Array<number>> = [];

            maneuver.chunks.forEach((chunk) => {
                if (chunk.points == null) return;
                chunk.points.forEach((point) => {
                    lineCoords.push([point.lon, point.lat]);
                })

                this.zIndex++;

                let strokeStyle: StrokeStyle = {
                    width: AbstractMap.PATH_WIDTH,
                }
                let color;
                //TODO Refactor this
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
                strokeStyle.color = color;

                if (maneuver.type == "pedestrian") {
                    strokeStyle = {
                        ...strokeStyle,
                        color: "#696969",
                        dash: [10, 10]
                    };
                }

                const polyline: YMapFeature = new YMapFeature({
                    draggable: false,
                    geometry: {
                        type: "LineString",
                        // @ts-ignore
                        coordinates: lineCoords
                    },
                    style: {
                        zIndex: this.zIndex,
                        stroke: [strokeStyle],
                        cursor: "pointer"
                    } as DrawingStyle,
                });
                this.map?.addChild(polyline);

                this.activePath.push(polyline);

            });

        });
    }
}

export default YandexMapV3;
