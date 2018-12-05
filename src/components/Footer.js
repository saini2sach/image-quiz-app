import React from 'react';

function Footer() {
    return (
        <footer className="row col-10 offset-1" id="footer">
                <ul>
                    <li>Make sure to attempt answer correctly with in given time-frame.</li>
                    <li>For winnng, Accuracy >= 75% and Total Questions attempted >= Round_Of(Total Time / 5 Seconds)</li>
                    <li>After the time-lapse, it shows your result accordingly.</li>
                </ul>
        </footer>
    )
}

export default Footer;