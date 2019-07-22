import React from 'react';

function Footer () {
    return (
        <footer className="Footer">
            <div className="Footer-Left">
                <p className="Signature">Made by</p>
                <a href="https://github.com/BooleanPanda" target="_blank" rel="noopener noreferrer">
                    <div className="Signature-Pic"></div>
                </a>
            </div>
            <div className="Acknowledgment-Container">
                <p>Special thanks to Andrew</p>
                <div></div>
            </div>
        </footer>
    )
}
export default Footer;