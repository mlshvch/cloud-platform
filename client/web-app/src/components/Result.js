import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

const params = [
    ["Name", "demo_app"],
    ["Type", "Fullstack Application"],
    ["Tech", "Ruby on Rails"],
    ["Database", "PostgreSQL"],
    ["Repos", "www.github.com/mlshvch/cloud-platform.git"]]

export const FinalConfiguration = () => {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Order summary
            </Typography>
            <List disablePadding>
                {params.map((param) => (
                    <ListItem key={param[0]} sx={{py: 1, px: 0}}>
                        <ListItemText primary={`${param[0]}:`} />
                        <Typography variant="body1">{param[1]}</Typography>
                    </ListItem>
                ))}
            </List>
        </React.Fragment>
    );
}
