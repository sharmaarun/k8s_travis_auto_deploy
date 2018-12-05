var app = require("express")();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const dbHost = process.env.MONGO_HOST || "192.168.99.1";
const dbPort = process.env.MONGO_PORT || "27017";
const dbName = process.env.MONGO_DBNAME || "ci_cd_dev";
const dbURI = "mongodb://"+dbHost+":"+dbPort+"/"+dbName;

const appPort = process.env.PORT || 8081;
//create model to store visits
var Visits = new Schema({
    visits: {
        type: mongoose.SchemaTypes.Number,
        default: 0
    }
});

var VisitsModel = mongoose.model('visits', Visits);

app.get("/", (req, res) => {
    VisitsModel.find({}, (err, result) => {
        if (err) {
            res.status(500).send("Server Error.");
            return;
        }
        var visits = result[0];
        if (!visits) {
            visits = new VisitsModel({
                visits: 1
            });
            visits.save(() => {
                res.send("v1 First Run" + JSON.stringify(visits));
                return;
            });
        } else {
            visits.visits += 1;
            visits.save(() => {
                res.send("v1 Rerun" + JSON.stringify(visits));
                return;
            });
        }
    });

});


mongoose.connect(dbURI, (err) => {
    if (err) {
        console.log(err);
        return 1;
    }
    console.log("Connected to DB at " + dbURI);
    app.listen(appPort, () => {
        console.log("Listening at : http://localhost:" + appPort);
    });
});
