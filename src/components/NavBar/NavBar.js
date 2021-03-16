import React from 'react';
import Icon from '../Icon/Icon';

function NavBar() {
    return (
        <div className="navbar-wrapper">
            <div className="navbar__burger-menu" data-test="burgerMenu">
                <Icon name="burgerMenu"/>
            </div>
            <div className="navbar__location-container" data-test="location">
                <div className="app-name"> myENV </div>
                <div className="location"> Current Location </div>
            </div>
            <div className="navbar__notification" data-test="notification">
                <Icon name="bell" />
            </div>
        </div>
    )
}

export default NavBar
