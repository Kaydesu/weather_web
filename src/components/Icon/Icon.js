import React from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as BurgerMenu } from '../../assets/svg/menu.svg';
import { ReactComponent as CloudIcon } from '../../assets/svg/cloud.svg';
import { ReactComponent as Bell } from '../../assets/svg/bell.svg';
import { ReactComponent as Plus } from '../../assets/svg/plus.svg';
import { ReactComponent as Thermo } from '../../assets/svg/thermo.svg';
import { ReactComponent as WaterDrop } from '../../assets/svg/water-drop.svg';


function Icon({ name, onClick, style }) {

    switch (name) {
        case "burgerMenu":
            return <span className="wa-icon" onClick={onClick} style={style}><BurgerMenu /></span>;
        case "cloud":
            return <span className="wa-icon" onClick={onClick} style={style}><CloudIcon /></span>;
        case "bell":
            return <span className="wa-icon" onClick={onClick} style={style}><Bell /></span>;
        case "plus":
            return <span className="wa-icon" onClick={onClick} style={style}><Plus /></span>;
        case "thermo":
            return <span className="wa-icon" onClick={onClick} style={style}><Thermo /></span>;
        case "drop":
            return <span className="wa-icon" onClick={onClick} style={style}><WaterDrop /></span>;
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
