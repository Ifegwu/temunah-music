import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

export const ME_QUERY = gql`
    {
        me {
          id
          username
          email
          likeSet {
            track {
              id
            }
          }
        }
    }
` 

export default function User(props) {
    return (
        <Query {...props} query={ME_QUERY}>
            {payload => props.children(payload)}
        </Query>
  )
};

User.propTypes = {
  children: PropTypes.func.isRequired,
};