const express = require('express');
const mongoose = require('mongoose');
const queue = require('../db/Queue');
const route = express.Router();

route.post('/', async (req, res) => {
    const { queue_name, queue_create, queue_priority, queue_date, queue_about } = req.body;
    let queue = {};
    queue.queue_name = queue_name;
    queue.queue_create = queue_create;
    queue.queue_priority = queue_priority;
    queue.queue_date = queue_date;
    queue.queue_about = queue_about

    let score = sumScore(queue_create, queue_date,queue_priority);
    queue.queue_priority = checkPriority(score);

    queue.queue_score = score;

    let queueModel = new Queue(queue);
    await queueModel.save();

    res.send({ "queue_score":queue.queue_score, "queue_priority":queue.queue_priority,"difference_day":diff_day});

});

//Function คำนวนวันแแตกต่างกับ วันปัจจุบัน ขาดเคลื่อน +1, -1 ในปี อธิอสุรทิน
function difference_day(queue_date) {
    let date = new Date();
    let years = date.getFullYear();
    let months = date.getMonth() + 1;
    let dates = date.getDate();

    let dayOfMonth = { 1: 31, 2: 28, 3: 31, 4: 30, 5: 31, 6: 30, 7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31 };
    let queue_year = Number(queue_date[0] + queue_date[1] + queue_date[2] + queue_date[3]);
    let queue_month = Number(queue_date[5] + queue_date[6]);
    let queue_mydate = Number(queue_date[8] + queue_date[9]);

    let diff_year = years - queue_year;
    let diff_month = months - queue_month;
    let diff_date = dates - queue_mydate;

    var days = 0;

    days += diff_year * 365;

    var lis = [];
    let diff = queue_month + diff_month;
    for (i = queue_month; i < diff; i++) {
        if (i > 12) {
            i -= 12;
        }
        lis.push(i);
    }
    for (i in lis) {
        days += dayOfMonth[lis[i]];
    }
    days += diff_date;
    return days;
}

//Function การให้คะแนน
function sumScore(queue_create, queue_date, queue_priority){
    //ให้คะแนน
    var score = 0;

    //เช็คจาก ความสำคัญ ความสำคัญจะ * 40 คะแนน
    score += queue_priority * 40;


    //เช็คคะแนนจาก ผู้ส่งคิว
    if (queue_create == 'Customer') {
        score += 10;
    }
    if (queue_create == 'Excutive') {
        score += 8;
    }
    if (queue_create == 'Insider') {
        score += 5;
    }
    if (queue_create == 'Outsider') {
        score += 3;
    }

    //คำนวนจำนวนวันที่แตกต่างกัน
    diff_day = difference_day(queue_date);
    //วันละ 8 คะแนน
    score += (8*diff_day);
    return score;
}

//Function ในการกำหนด Priority ใหม่ โดยกำหนด จาก Score
function checkPriority(score){
     //กำหนด priority ใหม่โดยคิดจาก คะแนน
    let priority = 0;
     if (score >= 0 && score <= 40) {
        priority = 1;
    }

    if (score >= 41 && score <= 80) {
        priority = 2;
    }

    if (score >= 81 && score <= 120) {
        priority = 3;
    }

    if (score >= 121 && score <= 160) {
        priority = 4;
    }

    if (score >= 160) {
        priority = 5;
    }
    return priority;
}

module.exports = route;