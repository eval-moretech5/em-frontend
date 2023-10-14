import {Button} from "antd";

interface IconCircleButtonProps {
    // @ts-ignore
    Icon: typeof JSX.Element;
    selected: boolean;
    changeType: () => void
}

export const IconCircleButton = (props: IconCircleButtonProps) => (
    <Button
        type="text"
        shape="circle"
        style={{
            verticalAlign: "text-bottom",
            width: "33px",
            height: "33px",
            padding: "2px 0 2px",
            backgroundColor: props.selected ? "#2456F6" : undefined,
        }}
        onClick={props.changeType}
    >
        <props.Icon color={props.selected ? "white" : "black"} />
    </Button>
);
