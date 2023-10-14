import {TbRoute} from "react-icons/tb";
import {Button} from "antd";

interface FindRoutesButtonProps {
    caption: string;
    buildRoute: () => void;
}

export const FindRoutesButton = (props: FindRoutesButtonProps) => (
    <Button
        type="primary"
        shape="round"
        icon={<TbRoute size="20" />}
        size="large"
        style={{ verticalAlign: "middle", backgroundColor: "#336AF7" }}
        onClick={props.buildRoute}
    >{props.caption}</Button>
);