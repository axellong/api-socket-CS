const { Pool } = require("pg");

import { Router, Request, Response } from "express";

// esto es para conectarme a la base de datos asignando los atributos
const cliente = new Pool({
  user: "adminpg",
  host: "localhost",
  database: "db1pg",
  password: "admin123",
  port: 5300,
});

// esto es para ver si si me conecto a la base de datos
cliente
  .connect()
  .then((result: any) => {
    console.log("conectado exitosamente");
  })
  .catch((err: any) => {
    console.log("no se conecto");
  });

const router = Router();

router.post("/savemensaje", (req: Request, res: Response) => {
  const mensaje = req.body.mensaje;
  const autor = req.body.de;
  const query =
    "insert into mensajes (de , mensaje ) VALUES ('" +
    autor +
    "','" +
    mensaje +
    "');";

  let respuesta = cliente.query(query, (err: any, resp: any) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send("todo funcional");
    }
  });

  // este debe de estar aca afuera porque como node es asic entonces antes de imprimir la respuesta del back lo que hace es cerrar la conexion y por eso no da ningun feedback

  cliente.end();
});

router.get("/mensajesgit", (req: Request, res: Response) => {
  res.json({
    ok: true,
    mensaje: "GET cambio de git dos",
  });
});

router.get("/mensajes", (req: Request, res: Response) => {
  res.json({
    ok: true,
    mensaje: "GET cambio de git",
  });
});

router.post("/mensajes", (req: Request, res: Response) => {
  const cuerpo = req.body.cuerpo;
  const de = req.body.de;
  const ok = true;

  res.json({
    ok,
    cuerpo,
    de,
    //         // mensaje: 'POST listo!'
  });
});

router.post("/mensajes/:id", (req: Request, res: Response) => {
  const cuerpo = req.body.cuerpo;
  const de = req.body.de;
  const id = req.params.id;

  res.json({
    ok: true,
    cuerpo,
    de,
    id,
    // mensaje: 'POST listo!'
  });
});

export default router;
