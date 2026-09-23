// ==UserScript==
// @name         Neptun Dark Mode
// @namespace    http://tampermonkey.net/
// @version      1.7.3
// @author       bbanfi
// @include      https://*neptun*/*hallgato*/*
// @include      https://*neptun*/*Hallgatoi*/*
// @include      https://*neptun*/*oktato*/*
// @include      https://*hallgato*.*neptun*/*
// @include      https://*oktato*.*neptun*/*
// @include      https://netw*.nnet.sze.hu/hallgato/*
// @include      https://nappw.dfad.duf.hu/hallgato/*
// @include      https://host.sdakft.hu/*
// @include      https://neptun.ejf.hu/ejfhw/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const css = `
        /* Az alap szűrő */
        html {
            filter: invert(92%) hue-rotate(180deg) brightness(105%) contrast(90%) !important;
            background-color: #ffffff !important;
            min-height: 100vh;
        }
        body {
            background-color: #ffffff !important;
        }

        /* 1. Fix sávok (lábléc, toolbar) sötétítése */
        footer, #footer, [role="contentinfo"], .mat-toolbar {
            background-color: #ffffff !important;
            color: #000000 !important;
        }
        .mat-toolbar *, .mat-toolbar a {
            color: #000000 !important;
        }

        /* 2. LEGÖRDÜLŐ MENÜK
           Kiterjesztjük az új Angular MDC osztályokra és a belső tartályokra is a fehér hátteret. */
        .cdk-overlay-pane,
        .cdk-overlay-pane .mat-menu-panel,
        .cdk-overlay-pane .mat-mdc-menu-panel,
        .cdk-overlay-pane .mat-menu-content,
        .cdk-overlay-pane .mat-mdc-menu-content,
        ul[role="menu"] {
            background-color: #ffffff !important;
        }

        /* A szöveg is biztosan fekete legyen a szűrő előtt (hogy szépen világítson a sötét háttéren) */
        .cdk-overlay-pane *, ul[role="menu"] * {
            color: #000000 !important;
            /* Ne hagyjuk, hogy a gombok saját háttere felülírja a panelt: */
            background-color: transparent !important;
        }

        .footer__version {
            color: #000000 !important;
        }

        /* Olvashatóság (árnyékok kikapcsolása) */
        * {
            text-shadow: none !important;
        }

        /* Képek megőrzése */
        img, video, iframe, canvas, svg {
            filter: invert(100%) hue-rotate(180deg) !important;
        }

        /* Sötét görgetősáv */
        ::-webkit-scrollbar {
            width: 12px;
            background: #e0e0e0;
        }
        ::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 6px;
        }
    `;

    const style = document.createElement('style');
    style.type = 'text/css';
    style.textContent = css;

    if (document.documentElement) {
        document.documentElement.appendChild(style);
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            document.documentElement.appendChild(style);
        });
    }

    // Dinamikus árnyék javító motor
    function fixShadows() {
        const els = document.querySelectorAll('div, button, li, ul, nav, header, aside, section, article, .mat-toolbar, .mat-mdc-menu-panel');

        for (let el of els) {
            if (el.dataset.dmShadowFixed) continue;

            const style = window.getComputedStyle(el);
            const shadow = style.boxShadow;

            if (shadow && shadow !== 'none') {
                el.style.setProperty('box-shadow', '0 4px 12px rgba(255, 255, 255, 0.15)', 'important');
            }
            el.dataset.dmShadowFixed = 'true';
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(fixShadows, 100);
        setTimeout(fixShadows, 500);
        setTimeout(fixShadows, 1500);
        setTimeout(fixShadows, 3000);
    });

    let timeout;
    const observer = new MutationObserver(() => {
        clearTimeout(timeout);
        timeout = setTimeout(fixShadows, 200);
    });

    window.addEventListener('load', () => {
        observer.observe(document.body, { childList: true, subtree: true });
    });

})();
