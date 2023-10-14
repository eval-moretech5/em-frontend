import React, {Component} from "react";
import {Segmented, Space} from "antd";
import {MapType} from "components/Map/types";

interface MapSwitcherProps {
    mapType: MapType;
    setMapSource: (source: MapType) => void;
}

export default class MapSwitcher extends Component<MapSwitcherProps> {
    render() {
        return (
            <Space style={{ marginBottom: "20px", width: "100%", display: "inline-flex", justifyContent: "space-between" }}>
                <Segmented
                    options={[
                        {
                            icon: <YandexLogo />,
                            label: "Яндекс",
                            value: "yandex3" },
                        {
                            icon: <GisLogo />,
                            label: "2GIS",
                            value: "2gis"
                        }
                    ]}
                    onChange={(value) => { this.props.setMapSource(value as MapType) }}
                    defaultValue={this.props.mapType}
                    value={this.props.mapType}
                />
            </Space>
        );
    }
}

const GisLogo = () => {
    return <span style={{ verticalAlign: "middle" }}>
        <svg width="16" height="16" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M40 0H0v40h40V0Z" fill="#19AA1E"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M0 0h40v13.125L0 6.875V0Z" fill="#FFB919"></path>
            <path fill-rule="evenodd" clip-rule="evenodd" d="m0 35.625 40-6.25V40H0v-4.375Z" fill="#82D714"></path>
            <path fill-rule="evenodd" clip-rule="evenodd" d="m0 6.084 13.962 2.182C15.7 7.166 17.768 6.563 20 6.563c3.091 0 5.868 1.157 7.89 3.189.254.256.495.524.72.803L40 12.335v1.58l-10.233-1.598a10.27 10.27 0 0 1 1.17 4.743c0 2.143-.479 4.28-1.47 6.425l-.03.065-.42.902h-.996c-2.055 0-3.418.614-4.309 1.704-.7.855-1.104 2.008-1.24 3.266l-.005.04-.02.2-.008.088-.016.17a31.28 31.28 0 0 0-.105 1.427L40 28.584v1.582l-40 6.25v-1.582l17.702-2.766-.008-.355-.003-.1-.001-.051-.003-.08c-.016-.43-.055-.982-.118-1.65l-.012-.127-.022-.22c-.127-1.265-.526-2.432-1.224-3.3-.881-1.097-2.232-1.72-4.27-1.733h-1.057l-.421-.902c-1.011-2.167-1.5-4.325-1.5-6.49 0-2.722 1.104-5.354 3.048-7.308.056-.057.112-.112.17-.167L0 7.665v-1.58Z" fill="#fff"></path>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M20 8.125c5.584 0 9.375 4.298 9.375 8.935 0 1.862-.406 3.799-1.354 5.83-5.495 0-6.851 3.934-7.108 6.41l-.016.165a31.03 31.03 0 0 0-.151 2.128l-1.488.232v-.048c-.006-.56-.06-1.346-.16-2.358l-.004-.044c-.237-2.47-1.565-6.486-7.115-6.486-.948-2.03-1.354-3.967-1.354-5.829 0-4.637 3.79-8.935 9.375-8.935Z" fill="#0070CC"></path>
        </svg>
    </span>
}

const YandexLogo = () => {
    return <span style={{ verticalAlign: "middle" }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 1C4.6862 1 2 3.6862 2 7C2 8.6563 2.6711 10.156 3.7565 11.2417C4.8422 12.328 7.4 13.9 7.55 15.55C7.57249 15.7974 7.7516 16 8 16C8.2484 16 8.42751 15.7974 8.45 15.55C8.6 13.9 11.1578 12.328 12.2435 11.2417C13.3289 10.156 14 8.6563 14 7C14 3.6862 11.3138 1 8 1Z" fill="#FF4433"/>
            <path d="M8.00002 9.10015C9.15982 9.10015 10.1 8.15994 10.1 7.00015C10.1 5.84035 9.15982 4.90015 8.00002 4.90015C6.84023 4.90015 5.90002 5.84035 5.90002 7.00015C5.90002 8.15994 6.84023 9.10015 8.00002 9.10015Z" fill="white"/>
        </svg>
    </span>
}