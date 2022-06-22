import {Grid, List, ListItemButton, ListItemText} from "@mui/material";
import Cookies from "js-cookie"
import {makeStyles} from '@mui/styles';
import '../App.css';
import Logo from "../assets/media/image/Logo.png"
import {useEffect, useState} from "react";
import {CalendarBlank, ChatText, CirclesFour, SignOut} from "phosphor-react";
import {useNavigate} from "react-router-dom";

const useStyles = makeStyles({
    root: {
        "&$selected": {
            backgroundColor: "black",
            color: "blue",
            "&:hover": {
                backgroundColor: "red"
            }
        }
    },
    selected: {}
});

const Layout = (props) => {
    const navigate = useNavigate()
    const [selectedIndex, setSelectedIndex] = useState(0);
    const styles = useStyles();

    useEffect(() => {
        console.log(Cookies.get('id'))
    }, []);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
        switch (index) {
            case 0:
                navigate('/')
                break
            case 1:
                navigate('/form')
                break
            case 2:
                navigate('/chats')
        }
    };

    const handleLogout = () => {
        Cookies.remove('token')
        navigate('/login')
    }

    return (
        <>
            <Grid container spacing={0}>
                <Grid item xs={2}>
                    <div style={{height: "100vh"}}>
                        <img src={Logo} alt="" className="my-3 mx-auto d-block"/>
                        <List component="nav" aria-label="main mailbox folders">
                            <ListItemButton
                                // classes={{
                                //     root: styles.root,
                                //     selected: styles.selected
                                // }}
                                selected={selectedIndex === 0}
                                onClick={(event) => handleListItemClick(event, 0)}
                            >
                                <ListItemText style={{color: "#A6ACB8"}}>
                                    <CirclesFour size={24} weight="fill" style={{marginRight: 12, marginLeft: 30}}/>
                                    Dashboard
                                </ListItemText>
                            </ListItemButton>

                            {Cookies.get('id') !== "1" ? <>
                                <ListItemButton
                                    selected={selectedIndex === 1}
                                    onClick={(event) => handleListItemClick(event, 1)}
                                >
                                    <ListItemText style={{color: "#A6ACB8"}}>
                                        <CalendarBlank size={24} weight="fill"
                                                       style={{marginRight: 12, marginLeft: 30}}/>
                                        Form Pelaporan
                                    </ListItemText>
                                </ListItemButton>
                            </> : ""}

                            <ListItemButton
                                selected={selectedIndex === 2}
                                onClick={(event) => handleListItemClick(event, 2)}
                            >
                                <ListItemText style={{color: "#A6ACB8"}}>
                                    <ChatText size={24} weight="fill" style={{marginRight: 12, marginLeft: 30}}/>
                                    Chats
                                </ListItemText>
                            </ListItemButton>
                            <ListItemButton
                                selected={selectedIndex === 3}
                                onClick={(event) => handleLogout()}
                            >
                                <ListItemText style={{color: "#fb4c4c"}}>
                                    <SignOut size={24} weight="fill" style={{marginRight: 12, marginLeft: 30}}/>
                                    Logout
                                </ListItemText>
                            </ListItemButton>
                        </List>
                    </div>
                </Grid>
                <Grid item xs={10} style={{backgroundColor: "#F6F6F6"}}>
                    <div style={{padding: 50}}>
                        {props.content}
                    </div>
                </Grid>
            </Grid>

        </>
    )
}

export default Layout