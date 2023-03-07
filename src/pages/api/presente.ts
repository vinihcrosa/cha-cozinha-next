import ListaPresenteModel from "@/models/listaPresentes";
import dbConnection from "@/services/dbConnection";
import { NextApiRequest, NextApiResponse } from "next";

dbConnection();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const listaPresentes = await ListaPresenteModel.find({});
        console.log(listaPresentes);
        return res.status(200).json({ success: true, data: listaPresentes });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      create(req, res);
      break;
    
    case "PUT":
      return await update(req, res);
    default:
      res.status(400).json({ success: false, message: "Method not allowed" });
      break;
  }
}

async function create(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body;
  console.log(body);

  if (body?.token != '123') {
    return res.status(400).json({ success: false });
  }

  try {
    const listaPresentes = await ListaPresenteModel.create(req.body);
    listaPresentes.save();
    console.log(listaPresentes);

    res.status(201).json({ success: true, data: listaPresentes });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}

async function update(req: NextApiRequest, res: NextApiResponse) {
  const { nome, presentes } = req.body;
  for(const presente of presentes){
    try {
      const presenteExists = await ListaPresenteModel.findOne({_id: presente});
      if(!presenteExists){
        console.log(`Presente ${presente} não existe`);
      } else {
        presenteExists.nome = nome;
        const updated = await ListaPresenteModel.updateOne({_id: presente}, {nome});
        console.log(updated);
      }
    } catch (error) {
      console.log("error -> ", error);
      res.status(400).json({ success: false });
    }
  }
  return res.status(200).json({ success: true });
}