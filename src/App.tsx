import * as React from "react"
import {Card, ConfigProvider} from 'antd';
import {Provider} from "react-redux";
import {store} from "store/store";
import {ConnectedMap} from "components/Map/ConnectedMap";
import {ConnectedMapSwitcher} from "components/MapSwitcher/ConnectedMapSwitcher";
import {ConnectedPanel} from "components/Panel/ConnectedPanel";

const App: React.FC = () => {

    return (
        <Provider store={store}>
            <ConfigProvider
                theme={{
                    components: {
                        Collapse: {
                            contentPadding: "16px 0",
                            headerPadding: "12px 0"
                        },
                    },
                }}
            >
            <div style={{ position: "fixed", top: 0, right: 0, bottom: 0, left: 0, }}>
                <ConnectedMap />
            </div>
            <div style={{ position: "fixed", top: "20px", right: "50px", width: "auto" }}>
                <ConnectedMapSwitcher />
            </div>
            <div style={{ position: "fixed", top: "20px", left: "20px", width: "380px" }}>
                <Card style={{ width: '100%' }}>
                    <ConnectedPanel />
                </Card>
            </div>
            </ConfigProvider>
        </Provider>
    )
}

export default App;