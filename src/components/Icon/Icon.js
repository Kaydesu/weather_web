import React from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as BurgerMenu } from '../../assets/svg/menu.svg';
import { ReactComponent as CloudIcon } from '../../assets/svg/cloud.svg';
import { ReactComponent as Bell } from '../../assets/svg/bell.svg';


function Icon({ name, onClick, style }) {
    switch (name) {
        case "burgerMenu":
            return <div className="wa-icon" onClick={onClick} style={style}><BurgerMenu /></div>;
        case "cloud":
            return <div className="wa-icon" onClick={onClick} style={style}><CloudIcon /></div>;
        case "bell":
            return <div className="wa-icon" onClick={onClick} style={style}><Bell /></div>;
        default:
            return null;
    }
}

Icon.propTypes = {
    name: PropTypes.string,
    onClick: PropTypes.func,
    style: PropTypes.object
}

export default Icon
