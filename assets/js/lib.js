'use strict'
// const log = console.log;
import {inner} from './main.js';

// отрисовка HTML блока
export function display(data, htmlBlock) {
    inner.scrollTop = inner.scrollHeight;

    if (typeof data === 'object') {
        let entries = Object.entries(data);
        let msgsContainer = `<div class="message">`;
        let i = 1;
        let name = '';
        for (const [key, value] of entries) {
            if (key === 'addr') {
                name = 'Адрес';
            } else if (key === 'pkey') {
                name = 'Ключ';
            }
            const msgContent = `
                <p>${name}: ${value}</p>
            `;
            if (i < entries.length) {
                msgsContainer += msgContent;
            } else {
                msgsContainer += msgContent + '</div>';
            }
        }
        htmlBlock.insertAdjacentHTML('beforeend', msgsContainer);
    } else {
        const htmlBlockContainer = `
                <p class="message error">${data}</p>
            `;
        htmlBlock.insertAdjacentHTML('beforeend', htmlBlockContainer);
    }
}