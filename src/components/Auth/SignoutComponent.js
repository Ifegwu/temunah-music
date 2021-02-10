import React from 'react';
import { withApollo } from 'react-apollo';
import { gql } from 'apollo-boost';

// import { IS_LOGGED_IN_QUERY } from '../../utils/client'
const LOGOUT_MUTATION = gql`
    mutation {
        isLoggedIn 
    }
`


class SignoutComponent extends React.Component {
    async componentDidMount() {
        const { client } = this.props;
        await client.mutate({
            mutation: LOGOUT_MUTATION

        });
        client.resetStore();
    }

    render()  {
        return <div>You logged out </div>
    }
}

export default withApollo(SignoutComponent);