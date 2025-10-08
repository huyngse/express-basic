import chalk from "chalk";

function logger(req, res, next) {
  let methodColor;

  switch (req.method) {
    case "GET":
      methodColor = chalk.green(req.method);
      break;
    case "POST":
      methodColor = chalk.blue(req.method);
      break;
    case "PUT":
      methodColor = chalk.yellow(req.method);
      break;
    case "DELETE":
      methodColor = chalk.red(req.method);
      break;
    default:
      methodColor = chalk.white(req.method);
      break;
  }

  console.log(`${methodColor} ${chalk.cyan(req.url)}`);
  next();
}

export default logger;
