var KunBptMining = artifacts.require("KunBptMining");
var path = require("path");
var fs = require("fs-extra");

module.exports = async function (deployer, network) {
    network = /([a-z]+)(-fork)?/.exec(network)[1];

    var deployenv = require(path.join(
        path.dirname(__dirname),
        "deployenv-" + network + ".json"
    ));

    await deployer.deploy(
        KunBptMining,
        deployenv.starttime,
        deployenv.kun,
        deployenv.bpt
    );

    fs.outputFileSync(
        path.join(
            path.dirname(__dirname),
            "output",
            "addresses." + network + ".json"
        ),
        JSON.stringify({ KunBptMining: KunBptMining.address }, null, 4)
    );
};
