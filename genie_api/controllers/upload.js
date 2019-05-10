const IncomingForm = require('formidable').IncomingForm;
// const fs = require('fs');

// const runPy = (filepath) => {

//     return new Promise((success, nosuccess) => {

//         const { spawn } = require('child_process');
//         console.log(filepath)
//         const pyprog = spawn('python3', ['./script.py']);

//         pyprog.stdout.on('data', (data) => {
//             success(data);
//         });

//         pyprog.stderr.on('data', (data) => {
//             nosuccess(data);
//         });
//     }).catch(err => console.log);
// }

// export callback function
module.exports = function upload(req, res) {
    var form = new IncomingForm();
    form.on('file', (field, file) => {
        // do something with file
        // e.g. save to database
        // access it using file.path
        // console.log(file.name);
        // const filepath = file.path.toString();
        // runPy(filepath).then(fromRunPy => {
        //     console.log(fromRunPy.toString());
        //     console.log("SUCCESS")
        //     res.end(fromRunPy);
        // }).catch(err => console.log);
        const process = require('process');
        console.log(`Starting directory: ${process.cwd()}`);
        try {
            process.chdir('blast/');
            console.log(`New directory: ${process.cwd()}`);
        } catch (err) {
            // cwd is already blast/
            console.error(`chdir: ${err}`);
        }
        const { spawn } = require('child_process');
        console.log(file.path);

        const filepath = file.path;
        const filepath_fa = file.path.slice(5) + '.fasta';

        const rename = spawn('mv', [filepath, filepath_fa])
        rename.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        rename.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`);
        });

        rename.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        });

        const pyprog = spawn('python3', ['./script.py', filepath_fa]);

        pyprog.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        pyprog.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`);
        });

        pyprog.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        });
    });
    form.on('end', () => {
        res.json();
    })
    form.parse(req);
}