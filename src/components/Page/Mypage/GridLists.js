import React from 'react';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import { useMediaQuery } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    root: {
        cursor: 'pointer',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        borderBottom: '4px solid gray',
    },
    gridList: {
        flexWrap: 'nowrap',
        '&::-webkit-scrollbar': {
            display: 'none',
        },
    },
    title: {
        background: 'gray',
        color: 'black',
        float: 'left',
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
}));
function GridLists({ test }) {
    const categoryCount = {
        big: 5.5,
        medium: 4.5,
        medismall: 3.5,
        small: 2.5,
        smallest: 1.5,
    };
    const matchFull = useMediaQuery('(min-width:1401px)');
    const match1200 = useMediaQuery('(min-width:1200px)');
    const match1000 = useMediaQuery('(min-width:1000px)');
    const match768 = useMediaQuery('(min-width:768px)');
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <GridList
                className={classes.gridList}
                cols={
                    matchFull
                        ? categoryCount.big
                        : match1200
                        ? categoryCount.medium
                        : match1000
                        ? categoryCount.medismall
                        : match768
                        ? categoryCount.small
                        : categoryCount.smallest
                }
            >
                {test.map((tile, index) => (
                    <GridListTile key={index}>
                        <img
                            src="https://placeimg.com/700/700/anys"
                            alt={tile.title}
                        />
                        <GridListTileBar
                            title={tile.title}
                            classes={{
                                root: classes.titleBar,
                                title: classes.title,
                            }}
                        />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}

export default GridLists;
