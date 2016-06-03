var express = require('express');
var _ = require('lodash');
var router = express.Router();
var multer = require('multer');
var videoUpload = multer({dest: 'api/video/uploads/'});
var videos = [];
var nextId = 0;
var ffmpeg = require('fluent-ffmpeg');
const exec = require('child_process').exec;
var fs = require('fs');

var sendFileOpts = {
    root: __dirname
};

router.route('/')
    .get(function (req, res) {
        res.json(videos);
    });
router.route('/:id')
    .get(function (req, res) {
        var video = _.filter(videos, function (v) {
            return v.id == req.params.id;
        }).pop();
        res.json(video);
    });

router.route('/:id/download')
    .get(function (req, res) {
        var video = _.filter(videos, function (v) {
            return v.id == req.params.id;
        }).pop();
        // res.set
        res.sendFile(video.path, sendFileOpts);
        // fs.createReadStream(video.path).pipe(res);
        // fs.res.json(video);
    });
router.route('/:id/frame/:frame')
    .get(function (req, res) {
        var id = req.params.id;
        var frame = req.params.frame;

        var video = _.filter(videos, function (v) {
            return v.id == req.params.id;
        }).pop();
        console.log(`Get video ${id}, frame ${frame}`);

        res.sendFile(`uploads/${id}/frame-${frame}.jpg`, sendFileOpts);
    });

router.route('/upload')
    .post(videoUpload.array('file', 10), function (req, res) {
        var files = _.map(req.files, function (f) {
            var v = {};
            v.id = nextId++;
            v.path = f.path;
            v.contentType = f.mimetype;
            v.name = f.originalname;
            v.estado = 'PENDIENTE';
            videos.push(v);
            ffmpeg.ffprobe(v.path, function (err, metadata) {
                console.log(metadata);
                v.metadata = metadata;
            });
            processVideo(v);
            return v;
        });
        res.json(files);

    });

function processVideo(video) {
    video.estado = 'GENERATING_FRAMES';
    fs.mkdir(`${__dirname}/uploads/${video.id}`, () => {
        console.log(`Frames directory for video ${video.id} created.`);
        var child = exec('ffmpeg -i ' + video.path + ` -r 1/1 ${__dirname}/uploads/${video.id}/frame-%d.jpg`,
            function (error, stdout, stderr) {
                // console.log(`stdout: ${stdout}`);
                // console.log(`stderr: ${stderr}`);
                fs.readdir(`${__dirname}/uploads/${video.id}`, function (err, fileNames) {
                    fileNames = _.isArray(fileNames) ? fileNames : [];
                    video.framesSaved = fileNames.length;
                    video.estado = 'GENERATING_FRAMES_COMPLETE';

                });
                if (error !== null) {
                    console.log(`exec error: ${error}`);
                }
            });
    });

}

module.exports = router;