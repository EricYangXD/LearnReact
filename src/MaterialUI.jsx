/*
 * @Author: Eric YangXinde
 * @Date: 2019-10-30 11:19:56
 * @LastModifiedBy: Eric YangXinde
 * @LastEditTime: 2019-10-30 20:37:40
 * @Description:
 */

import React, { Component, Fragment } from "react";

import { AccessAlarm, ThreeDRotation } from "@material-ui/icons";
import { Button, ButtonBase, createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
    props: {
        // Name of the component ⚛️
        MuiButtonBase: {
            // The properties to apply
            disableRipple: true // No more ripple, on the whole application 💣!
        }
    }
});
class MaterialUI extends Component {
    render() {
        return (
            <Fragment>
                <Button variant="contained" color="primary">
                    你好，世界&nbsp;&nbsp;
                    <AccessAlarm />
                </Button>
                <ButtonBase variant="contained" color="primary">
                    你好，世界
                </ButtonBase>
                <div>
                    <i>
                        <ThreeDRotation />
                    </i>
                </div>
            </Fragment>
        );
    }
}
export default MaterialUI;
