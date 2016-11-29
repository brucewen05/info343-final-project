import React from 'react';
import {Grid, Cell} from 'react-mdl';
import {Link} from 'react-router';

class MainPage extends React.Component {
    render() {
        return (
            <Grid>
                <Cell col={6}><Link to="/discussions">To discussion board</Link></Cell>
                <Cell col={6}><Link to="/FAQs">To FAQs</Link></Cell>
                <Cell col={6}><Link to="/events">To events</Link></Cell>
            </Grid>
        );
    }
}

export default MainPage;