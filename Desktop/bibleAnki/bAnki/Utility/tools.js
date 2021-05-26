const fs = require('fs');
const path = require('path');
const uuid = require('uuid').v4;
const multer = require('multer');
// const connection = require('../model/model');
const query = require('../model/queries');
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, `${uuid()}${path.extname(file.originalname)}`);
    }
});
const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        const approvedFileTypes = ['.jpeg', '.jpg', '.png', '.pdf', '.docx', '.odt'];
        const fileExt = path.extname(file.originalname);
        let approved = false;
        for (const type of approvedFileTypes) {
            if (fileExt === type) {
                approved = true;
                break;
            }
        }
        if (approved) {
            // console.log('approved...');
            cb(null, true);
        } else {
            // console.log('rejected...');
            cb(null, false);
        }
    }
});

function isEmpty(input) {
    if (input === '' || input === null || input === undefined) {
        return true;
    } else {
        return false;
    }
}

function isBetween(input, min, max) {
    if (min < input && input < max) {
        return true;
    } else {
        return false;
    }
}

function logError(errMsg) {
    fs.access(path.join(__dirname, 'errors'), fs.constants.F_OK, err => {
        if (err) {
            fs.mkdir(path.join(__dirname, 'errors'), {}, err => {
                fs.appendFile(
                    path.join(__dirname, 'errors', 'errors.txt'),
                    `DATE: ${new Date()}\nERROR: ${errMsg}\n\n`,
                    err => { }
                );
            });
        } else {
            fs.appendFile(
                path.join(__dirname, 'errors', 'errors.txt'),
                `DATE: ${new Date()}\nERROR: ${errMsg}\n\n`,
                err => { }
            );
        }
    });
}

async function executeSchedule(schedule, io) {
    for (const row of schedule) {
        for (const col of row) {
            // if (col.jobseeker !== null && col.employer !== null) {
            //     // const sqlStmt = 'SELECT socket_id FROM rooms JOIN sessions ON rooms.session_id = sessions.session_id JOIN users ON sessions.user_id = users.user_id WHERE users.user_id = ?';
            //     const sqlStmt = `SELECT socket_id FROM sessions WHERE `
            //     connection.query(sqlStmt, [col.jobseeker], (err, jobseeker) => {
            //         if (err) {
            //             logError(err);
            //         } else {
            //             connection.query(sqlStmt, [col.employer], (err, employer) => {
            //                 console.log(jobseeker);
            //                 console.log(employer);
            //                 // io.to(jobseeker).emit('change-room', col.roomID);
            //                 // io.to(employer).emit('change-room', col.roomID);
            //             });
            //         }
            //     });
            //     // io.to(col.jobseeker).emit('change-room', col.roomID);
            //     // io.to(col.employer).emit('change-room', col.roomID);
            // }
            if (col.jobseeker !== null && col.employer !== null) {
                const jobseekerSocket = await query.getSocketID(col.jobseeker);
                const employerSocket = await query.getSocketID(col.employer);
                io.to(jobseekerSocket).emit('change-room', col.roomID);
                io.to(employerSocket).emit('change-room', col.roomID);
            }
        }
        await sleep(15000);
    }
}

function sleep(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}

module.exports = {
    logError,
    upload,
    isEmpty,
    isBetween,
    executeSchedule
};