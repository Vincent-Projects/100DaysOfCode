import React from "react";

import { ReactComponent as GreatLogo } from "../../../assets/icons/emoji/smile-beam-regular.svg";
import { ReactComponent as SmileLogo } from "../../../assets/icons/emoji/smile-regular.svg";
import { ReactComponent as MediumLogo } from "../../../assets/icons/emoji/meh-regular.svg";
import { ReactComponent as SadLogo } from "../../../assets/icons/emoji/frown-regular.svg";
import { ReactComponent as DeadLogo } from "../../../assets/icons/emoji/dizzy-regular.svg";

import classes from "./EmojiChoice.module.css";

const EmojiChoice = props => {

    const handleClick = (index) => {
        props.handleFeelingChange(index);
    }

    const class0 = props.todayFeeling !== null ? props.todayFeeling === 0 : -1;
    const class1 = props.todayFeeling !== null ? props.todayFeeling === 1 : -1;
    const class2 = props.todayFeeling !== null ? props.todayFeeling === 2 : -1;
    const class3 = props.todayFeeling !== null ? props.todayFeeling === 3 : -1;
    const class4 = props.todayFeeling !== null ? props.todayFeeling === 4 : -1;

    console.log(class0);
    return (
        <div className={classes.EmojiContainer}>
            <div className={`${classes.FeelingBtn} ${class4 === -1 ? null : class4 ? classes.Active : classes.Disabled}`} onClick={() => handleClick(4)}>
                <GreatLogo className={classes.Svg} />
            </div>
            <div className={`${classes.FeelingBtn} ${class3 === -1 ? null : class3 ? classes.Active : classes.Disabled}`} onClick={() => handleClick(3)}>
                <SmileLogo className={classes.Svg} />
            </div>
            <div className={`${classes.FeelingBtn} ${class2 === -1 ? null : class2 ? classes.Active : classes.Disabled}`} onClick={() => handleClick(2)}>
                <MediumLogo className={classes.Svg} />
            </div>
            <div className={`${classes.FeelingBtn} ${class1 === -1 ? null : class1 ? classes.Active : classes.Disabled}`} onClick={() => handleClick(1)}>
                <SadLogo className={classes.Svg} />
            </div>
            <div className={`${classes.FeelingBtn} ${class0 === -1 ? null : class0 ? classes.Active : classes.Disabled}`} onClick={() => handleClick(0)}>
                <DeadLogo className={classes.Svg} />
            </div>
        </div>
    );
}

export default EmojiChoice;