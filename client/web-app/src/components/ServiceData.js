import * as React from 'react';
import Grid from '@mui/material/Grid';
import Container from "@mui/material/Container";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import {Label} from "@mui/icons-material";

const ServiceData = () => {
    return (
        <React.Fragment>
            <Grid container spacing={3} direction={"column"} alignItems={"center"} >
                <Grid item xs={12} sm={6}>
                    <TextField label={"Service Name"}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputLabel>Technology</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Service type"
                    >
                        <MenuItem value={"rails"}>Ruby on Rails</MenuItem>
                        <MenuItem value={"node"}>Node.js</MenuItem>
                        <MenuItem value={"go"}>Go</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputLabel>Type</InputLabel>

                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Age"
                    >
                        <MenuItem value={10}>FullStack Application</MenuItem>
                        <MenuItem value={20}>API</MenuItem>
                        <MenuItem value={30}>Front-end</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputLabel>Database</InputLabel>
                    <Select
                        required
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Age"
                    >
                        <MenuItem value={10}>PostgreSQL</MenuItem>
                        <MenuItem value={20}>MySQL</MenuItem>
                        <MenuItem value={30}>None</MenuItem>
                    </Select>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default ServiceData;