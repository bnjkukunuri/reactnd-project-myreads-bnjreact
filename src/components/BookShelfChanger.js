import React, { Component } from "react";
import PropTypes from "prop-types";

export default class BookShelfChanger extends Component{
    static propTypes = {
        book : PropTypes.object.isRequired,
        changeShelf : PropTypes.func.isRequired
    };

    render(){

    }
}