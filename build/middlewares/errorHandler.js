import fs from 'fs';
const writeErrorStream = fs.createWriteStream('./errorLogs.txt');
let errorRecordNumber = 1;
function errorHandler(err, _req, res, next) {
    const { statusCode } = res;
    const { name, message, stack } = err;
    res.status(statusCode).json({ statusCode, message });
    const errorRecord = `
  Recording №    ${errorRecordNumber}
  status code:   ${statusCode}
  errorName:     ${name}
  errorMessage:  ${message}
  errorStack:    ${stack}\n`;
    writeErrorStream.write(errorRecord);
    console.error(errorRecord);
    errorRecordNumber += 1;
    next();
}
export { errorHandler };
