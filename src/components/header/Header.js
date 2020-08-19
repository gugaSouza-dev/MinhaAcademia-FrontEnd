import "./Header.css";
import React from 'react';

function burgerSlide() {
    var burger = document.querySelector('.burger');
    var hLink = document.querySelector('.headerLinks');
    var headerLinks = document.querySelectorAll('.headerLinks li');


    hLink.classList.toggle('headerLinksAtivo');

    headerLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = 
            `headerLinksFade 0.5s ease forwards ${index / 7}s`;
        }
    });
    burger.classList.toggle('toggle');
}

window.addEventListener("scroll",function () {
    const header = document.querySelector(".header");
    header.classList.toggle("fixo", window.scrollY > 0);
})

function Header() {
    return (
        <div className="header">
            <div className="headerLogo">
                <h2>Logo</h2>
            </div>

            <ul className="headerLinks">
                <li>
                    <a href="#">qualquercoisa</a>
                </li>
                <li>
                    <a href="#">qualquercoisa</a>
                </li>
                <li>
                    <a href="#">qualquercoisa</a>
                </li>
                <li>
                    <a href="#">qualquercoisa</a>
                </li>
            </ul>
            <div className="burger" onClick={burgerSlide}>
                <div className="linha1"></div>
                <div className="linha2"></div>
                <div className="linha3"></div>
            </div>
        </div>
    );
}
export default Header;