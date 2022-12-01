'use strict'
import BtcProps from './btcProps.js';
import {display} from './lib.js';

// const log = console.log;

const btn = document.querySelector('.checkbox-label');
export const inner = document.querySelector('.inner')
const spinner1 = document.querySelector('.center')
const spinner2 = document.querySelector('.left')
const spinner3 = document.querySelector('.right')


class App {
    i = 0;

    constructor() {
        btn.addEventListener('click', this.sendQueryAndGetDataAPI.bind(this));
    }

    // send query to API & get data
    sendQueryAndGetDataAPI() {
        this.i++;

        if (this.i <= 3) {
            switch (this.i) {
                case 1:
                    spinner1.classList.remove('hidden');
                    break;
                case 2:
                    spinner2.classList.remove('hidden');
                    break;
                case 3:
                    spinner3.classList.remove('hidden');
                    btn.classList.remove('has-active');
                    btn.disabled = true;
                    break;
            }
        }

        fetch(`../btcaddr.php`)
            .then(
                response => {
                    return this.errorMiddleware(response);
                }
            )
            .then(
                data => {
                    const result = new BtcProps(data);
                    display(result, inner);
                }
            )
            .catch(
                error => {
                    display(`Что-то пошло не так. Попробуйте еще раз!`, inner);
                }
            )
            .finally(
                () => {
                    switch (this.i) {
                        case 1:
                            spinner1.classList.add('hidden');
                            break;
                        case 2:
                            spinner2.classList.add('hidden');
                            break;
                        case 3:
                            spinner3.classList.add('hidden');
                            btn.classList.add('has-active');
                            btn.disabled = false;
                            break;
                    }
                    this.i--;
                }
            );
    }

    errorMiddleware(response) {
        const contentType = response.headers.get('content-type');
        if (!response.ok) {
            throw new Error(response.status);
        } else if (contentType && contentType.indexOf("application/json") === -1) {
            return response.text().then(
                text => {
                    console.error(text);
                }
            );
        } else {
            return response.text().then(
                text => {
                    try {
                        const data = JSON.parse(text);
                        if (data.hasOwnProperty('addr')) {
                            return data;
                        } else {
                            console.error(data);
                        }
                    } catch (err) {
                        throw new Error(err);
                    }
                }
            );
        }
    }
}

new App();












