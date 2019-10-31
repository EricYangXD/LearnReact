/*
 * @Author: Eric YangXinde
 * @Date: 2019-10-30 20:41:47
 * @LastModifiedBy: Eric YangXinde
 * @LastEditTime: 2019-10-30 20:58:11
 * @Description:
 */
import React, { Fragment } from "react";
import { Typography, Box, Button, Grid, Paper } from "@material-ui/core";
import { palette } from "@material-ui/system";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.text.secondary
    }
}));
export default function Color() {
    const classes = useStyles();

    function FormRow() {
        return (
            <React.Fragment>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>item</Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>item</Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>item</Paper>
                </Grid>
            </React.Fragment>
        );
    }
    return (
        <Fragment>
            <Typography component="div" variant="body1">
                <Box color="primary.main">primary.main</Box>
                <Box color="secondary.main">secondary.main</Box>
                <Box color="error.main">error.main</Box>
                <Box color="text.primary">text.primary</Box>
                <Box color="text.secondary">text.secondary</Box>
                <Box color="text.disabled">text.disabled</Box>
                <Box color="text.hint">text.hint</Box>
            </Typography>
            <Typography component="div" variant="body1">
                <Box
                    bgcolor="primary.main"
                    color="primary.contrastText"
                    p={2}
                    m={1}
                >
                    primary.main
                </Box>
                <Box
                    bgcolor="secondary.main"
                    color="secondary.contrastText"
                    p={2}
                    m={1}
                >
                    secondary.main
                </Box>
                <Box
                    bgcolor="error.main"
                    color="error.contrastText"
                    p={2}
                    m={1}
                >
                    error.main
                </Box>
                <Box
                    bgcolor="text.primary"
                    color="background.paper"
                    p={2}
                    m={1}
                >
                    text.primary
                </Box>
                <Box
                    bgcolor="text.secondary"
                    color="background.paper"
                    p={2}
                    m={1}
                >
                    text.secondary
                </Box>
                <Box
                    bgcolor="text.disabled"
                    color="background.paper"
                    p={2}
                    m={1}
                >
                    text.disabled
                </Box>
                <Box bgcolor="text.hint" color="background.paper" p={2} m={1}>
                    text.hint
                </Box>
            </Typography>
            <Box component="div" m={1}>
                <Button>123</Button>
            </Box>
            <Grid container spacing={1}>
                <Grid container item xs={12} spacing={3}>
                    <FormRow />
                </Grid>
                <Grid container item xs={12} spacing={3}>
                    <FormRow />
                </Grid>
                <Grid container item xs={12} spacing={3}>
                    <FormRow />
                </Grid>
            </Grid>
        </Fragment>
    );
}
