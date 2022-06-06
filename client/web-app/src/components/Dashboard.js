import Button from "@mui/material/Button";

import * as React from 'react';
import {styled, createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
// import {gql, useMutation} from "@apollo/client";
import {useNavigate} from "react-router-dom";
import routes from "../Routes";
import {useEffect, useState} from "react";
import {
    Add,
    Check,
    Close,
    CloudDone,
    CloudOff, Delete,
    DiamondSharp,
    DiamondTwoTone,
    Javascript,
    StopCircle, Update
} from "@mui/icons-material";
import {green, red, yellow} from "@mui/material/colors";
import {CircularProgress, LinearProgress, Skeleton, ToggleButton} from "@mui/material";
import IOSSwitch from "./iosToggleSwitch";
import CustomCircularProgress from "./CustomCircularProgress";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

let new_service = {
    name: "",
    technology: "",
    type: '',
    state: "",
    endpoint: ""
}

const pending_services = [{
    name: "demo_app",
    technology: "Ruby on Rails",
    type: 'FullStack Application',
    state: "creating images",
    creating: true
},]


const services_list = [
    {
        name: "test_app",
        technology: "Ruby on Rails",
        type: 'FullStack Application',
        state: "suspended",
        endpoint: "10.106.119.102:30090"
    },
    {
        name: "news_portal",
        technology: "Ruby on Rails",
        type: 'FullStack Application',
        state: "suspended",
        endpoint: "10.106.114.122:32343"

    },
    {
        name: "social_app",
        technology: "Node.js",
        type: 'FullStack Application',
        state: "running",
        endpoint: "10.106.108.100:31540"

    }
]


const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(0),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(0),
                },
            }),
        },
    }),
);

const LOGOUT = '' /* gql`
    mutation UserLogout() {
        SignOutUser {
            status
        }
    }
`;
*/
const SERVICES = '' /* gql`
    mutation GetServices() {
        GetServices {
            status
        }
    }
`;
*/

let theme_options = {};

const current_date = new Date();
const hour = current_date.getHours()

if (hour >= 20 && hour < 7) {
    theme_options = {
        palette: {
            mode: 'dark',
        },
    }
} else {
    theme_options = {}
}

const mdTheme = createTheme(theme_options);


function DashboardContent() {
    const navigate = useNavigate()
    const [open, setOpen] = React.useState(() => {
            return (services_list.length !== 0)
        }
    );
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const [notifications, setNotifications] = React.useState(true)
    const toggleList = () => {
        setNotifications(!notifications)
    }

    const [currentService, setCurrentService] = useState(new_service)

// useEffect(async () => {
//     setInterval(getData, 5000);
//     }
// )

    const chooseService = (service) => {
        setCurrentService(service)
    }


// const [exit] = useMutation(LOGOUT);

// const logout = () => {
//     exit()
//         .then(() => localStorage.removeItem('cred'))
//         .then(navigate(routes.home))
// }

    const [services, setServices] = useState([]);

    async function getData() {
        try {
            const res = await fetch('https://api.apijson.com/...'); // TODO create mutation
            const blocks = await res.json();
            setServices(prevState => {
                    if (prevState !== services) {
                        return res
                    }
                }
            )
        } catch
            (e) {
            console.log(e);
        }
    }


    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{display: 'flex'}}>
                <CssBaseline/>
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && {display: 'none'}),
                            }}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{flexGrow: 1}}
                        >
                            <IconButton href={routes.landing}>ArtCloud</IconButton>
                        </Typography>
                        <IconButton color="inherit" href={routes.create_service}>
                            <Add/>
                        </IconButton>
                        <IconButton color="inherit">
                            <Badge color="secondary">
                                <NotificationsIcon/>
                            </Badge>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{flexGrow: 1}}
                        >User Services</Typography>

                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon/>
                        </IconButton>
                    </Toolbar>
                    <Divider/>
                    <List component="nav">
                        <Divider sx={{my: 1}}/>
                    </List>
                    {services_list.map((service) => (
                        (service.name === currentService.name &&
                            <Button disableElevation variant="contained">{service.name}</Button>) ||
                        <Button variant={"outlined"}
                                onClick={() => chooseService(service)}
                        >{service.name}

                            {service.state === 'suspended' && <CloudOff sx={{color: red[500], fontSize: "large"}}/>}
                            {service.state === 'running' && <CloudDone sx={{color: green[500], fontSize: "large"}}/>}
                        </Button>
                    ))}

                    <Divider color={mdTheme.palette.common.black}/>
                    <Divider color={mdTheme.palette.common.black}/>
                    <Divider color={mdTheme.palette.common.black}/>
                    <Divider color={mdTheme.palette.common.black}/>
                    <Divider color={mdTheme.palette.common.black}/>
                    <Divider color={mdTheme.palette.common.black}/>


                    {pending_services.map((service) => (
                        (service === currentService &&
                            <Button disableElevation variant="contained">{service.name}</Button>) ||
                        <Button variant={"outlined"}
                                onClick={() => chooseService(service)}
                        >{service.name} <CircularProgress size={15}/>

                        </Button>
                    ))}

                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                ><Toolbar/>
                    <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6} lg={6}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'row',
                                        height: 240,
                                    }}
                                >
                                    {currentService.creating &&
                                        <Grid container alignItems={"center"} justifyContent={"center"}>
                                            <Typography
                                                component="h1"
                                                variant="h6"
                                                color="inherit"
                                                noWrap
                                                sx={{flexGrow: 1}}>
                                                {currentService.state}
                                            </Typography>
                                            <CircularProgress/>

                                        </Grid>}

                                    {(!currentService.creating && currentService.name !== null &&
                                        <Box>
                                            <ul>
                                                <Typography
                                                    component="h1"
                                                    variant="h6"
                                                    color="inherit"
                                                    noWrap
                                                    sx={{flexGrow: 1}}
                                                ><u>Name</u>: {currentService.name} </Typography>
                                            </ul>
                                            <ul>
                                                <Typography
                                                    component="h1"
                                                    variant="h6"
                                                    color="inherit"
                                                    noWrap
                                                    sx={{flexGrow: 1}}
                                                ><u>Technology</u>: {currentService.technology} {(currentService.technology === "Ruby on Rails" &&
                                                        <DiamondSharp
                                                            sx={{color: red[500], fontSize: "large"}}/>) ||
                                                    <Javascript sx={{color: green[500], fontSize: 20}}/>} </Typography>
                                            </ul>
                                            <ul>
                                                <Typography
                                                    component="h1"
                                                    variant="h6"
                                                    color="inherit"
                                                    noWrap
                                                    sx={{flexGrow: 1}}
                                                ><u>Type</u>: {currentService.type} </Typography>
                                            </ul>
                                            <ul>
                                                <Typography
                                                    component="h1"
                                                    variant="h6"
                                                    color="inherit"
                                                    noWrap
                                                    sx={{flexGrow: 1}}
                                                ><u>State</u>: {currentService.state} {currentService.state === 'active' &&
                                                    <CloudDone sx={{color: green[500], fontSize: "large"}}/>}
                                                    {currentService.state === 'suspend' &&
                                                        <CloudOff sx={{color: red[500], fontSize: "large"}}/>}
                                                </Typography>
                                            </ul>
                                        </Box>)}
                                    {services_list.length === 0 &&
                                        <Typography>There are no any services yet :(</Typography> ||

                                        currentService.name === null &&
                                        <Container>
                                            <Skeleton variant="rectangular"/>
                                            <Skeleton variant="text"/>
                                            <Skeleton variant="text"/>
                                            <Skeleton variant="text"/>
                                            <Skeleton variant="text"/>
                                        </Container>
                                    }


                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6} lg={6}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 240,
                                    }}
                                >
                                    {currentService.name !== null && !currentService.creating &&
                                        <Container>
                                            <Typography component="h1"
                                                        variant="h6"
                                                        color="inherit"
                                                        noWrap
                                                        sx={{flexGrow: 1}}
                                            >
                                                Launch Service <IOSSwitch checked={currentService.state === "running"}/>
                                            </Typography>
                                            <Typography component="h1"
                                                        variant="h6"
                                                        color="inherit"
                                                        noWrap
                                                        sx={{flexGrow: 1}}
                                            > Endpoint:
                                                <Button
                                                    href={`https://${currentService.endpoint}`}
                                                    disabled={currentService.state === 'suspended'}
                                                >
                                                    {currentService.endpoint}
                                                </Button>
                                            </Typography>
                                            <Typography>
                                                <Button variant={"contained"} color={"warning"}>Update
                                                    Service</Button></Typography>
                                            <Typography>
                                                <Button variant={"outlined"} color={"error"}>Delete
                                                    Service</Button>
                                            </Typography>
                                        </Container>}
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default function Dashboard() {
    return <DashboardContent/>;
}