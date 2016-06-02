var express = require('express');
var _ = require('lodash');
var router = express.Router();
var multer = require('multer');
var videoUpload = multer({dest: 'api/video/uploads/'});
var videos = [];
var nextId = 0;
var ffmpeg = require('fluent-ffmpeg');
var fs = require('fs');
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
router.route('/upload')
    .post(videoUpload.array('file', 10), function (req, res) {
        var files = _.map(req.files, function (f) {
            var v = {};
            v.id = nextId++;
            v.path = f.path;
            v.contentType = f.mimetype;
            v.name = f.originalname;
            videos.push(v);
            ffmpeg.ffprobe(v.path, function (err, metadata) {
                console.log(metadata);
                v.metadata = metadata;
            })
            ;
            return v;
        });
        res.json(files);

    });


module.exports = router;