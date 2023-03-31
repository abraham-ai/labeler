import { NextApiRequest, NextApiResponse } from "next";
import fs from 'fs'
import path from 'path'
import { stringify } from 'csv-stringify';


export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, image, rating } = req.body
  try {
    const newRow = { name, image, rating }
    const filePath = path.join(process.cwd(), 'data.csv')
    const writeStream = fs.createWriteStream(filePath, { flags: 'a' })
    stringify([newRow], { header: false }).pipe(writeStream)
    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: error.response.data });
  }
};
