'use strict'

export default class BtcProps {
    addr;
    pkey;

    constructor(data) {
        this.addr = data.addr;
        this.pkey = data.pkey;
    }
}