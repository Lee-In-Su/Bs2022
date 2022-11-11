'use strict';

/************* include library **************/
const http    = require('http');
const express = require('express');
const server  = express();
const cron = require('node-cron');
const axios = require('axios');

const serverPort = 80;

cron.schedule('*/2 * * * * *', function () {
    let nowTime = new Date();
    
     let s_idx = 1;
     let sd_value = 4;
     
     // (6) 0 <= random <= 100
     sd_value = Math.floor(Math.random() * 60);
   
   
/*      axios({
       url: 'http://localhost/recvData', // 통신할 웹문서
       method: 'post', // 통신할 방식 get/post
       data: { // 인자로 보낼 데이터
        s_idx: s_idx,
        sd_value : sd_value
       }
     }); */
   });

/************* Routing **************/
//웹페이지의 세부 주소를 지정한다.
server.use('/',            require('./server'));
server.use('/api',         require('./api'));
server.use('/arduino',     require('./arduino'));

/************* Running server **************/
const httpServer = http.createServer(server);
httpServer.listen(serverPort, () => {
    const startdate = new Date();
    console.log(`[START SERVER (port ${serverPort}) ${startdate}]`);
});