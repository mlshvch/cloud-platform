import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import {FormControl, FormLabel, Icon, Radio, RadioGroup, SvgIcon} from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import {useEffect, useState} from "react";

const GitLabIcon = () => {
    return (
        <SvgIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fontSize={"small"}>
            <g>
                <path fill="none" d="M0 0h24v24H0z"/>
                <path
                    d="M5.868 2.75L8 10h8l2.132-7.25a.4.4 0 0 1 .765-.01l3.495 10.924a.5.5 0 0 1-.173.55L12 22 1.78 14.214a.5.5 0 0 1-.172-.55L5.103 2.74a.4.4 0 0 1 .765.009z"/>
            </g>
        </SvgIcon>

    )
}


export const RepositoryForm = () => {

    const [repos, setRepos] = useState([]);

    const handleKeyDown = async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault()
            setRepos([])
            const username = document.getElementById('username').value
            const source = document.getElementsByName('data-source-group')
            const url = `https://api.github.com/users/${username}/repos`
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error ('User Not Found')
                    }
                    return response.json()
                } )
                .then(data => setRepos(data))
                .catch(error => alert(error))
        }
    }

const createReposList = () => {
    if (repos !== []) {
        console.log(repos)

        return (repos.map(repo =>
                <FormControlLabel value={repo.name} control={<Radio/>} label={repo.name}/>)
        )
    }
}

return (
    <React.Fragment>
        <Typography variant="h6" gutterBottom>
            Create Service From Source Code
        </Typography>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <FormControl required={true}>
                    <FormLabel id="data-source-radio-buttons">Data Source</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="data-source-group"
                    >
                        <FormControlLabel value="GitHub" control={<Radio/>}
                                          label={<span><GitHubIcon fontSize={"inherit"}/><text>GitHub</text></span>}/>
                        <FormControlLabel value="GitLab" control={<Radio/>}
                                          label={<span><GitLabIcon/><text>GitLab</text></span>}/>
                        <FormControlLabel value="other" control={<Radio/>} label="Other"/>
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    id="username"
                    name="username"
                    label="username"
                    fullWidth
                    autoComplete="shipping address-line1"
                    variant="standard"
                    onKeyPress={handleKeyDown}
                />
                <div id='repos'></div>
            </Grid>
            <Grid item xs={12}>
                <FormControl required={true}>
                    <RadioGroup id='repos-list'
                                aria-labelledby="repos-list"
                                defaultValue="female"
                                name="data-source-group">
                        {
                            createReposList()
                        }
                    </RadioGroup>
                </FormControl>
            </Grid>
        </Grid>
    </React.Fragment>
);
}