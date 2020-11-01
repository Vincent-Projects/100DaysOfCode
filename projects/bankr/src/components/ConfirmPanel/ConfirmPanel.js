import { useRef, useEffect } from 'react';

const ConfirmPanel = props => {
    const btnClassName = props.error ? "Input Error" : "Input";
    const inputRef = useRef(null); // Ref are use to store a reference to a component
    const panelRef = useRef(null);

    useEffect(() => {
        if (inputRef.current)
            inputRef.current.focus();
    });

    if (props.isActive) {

        return (
            <div
                className="ConfirmPanel PanelActive"
                onClick={event => event.stopPropagation()}
                ref={panelRef}
            >
                <h1>Transaction</h1>
                <input
                    ref={inputRef}
                    className={btnClassName}
                    type="number"
                    value={props.newTrans}
                    onChange={(event) => props.setNewTrans(event.target.value)}
                    onKeyDown={event => {
                        if (event.code === "Enter") {
                            props.confirmHandler();
                        }
                    }}
                />
                <button className="Button Dark" onClick={props.confirmHandler}>Add</button>
            </div>
        );
    } else {
        return null;
    }
}

export default ConfirmPanel;