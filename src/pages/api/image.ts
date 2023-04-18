import { NextApiRequest, NextApiResponse } from "next";
import path from 'path';
import fs from 'fs';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const imagesPath = path.join(process.cwd(), 'public', 'highlights');
  const imageNames = fs.readdirSync(imagesPath);
  const randomImageName = imageNames[Math.floor(Math.random() * imageNames.length)];
  const imagePath = path.join('/', 'highlights', randomImageName);
  // delay 1 second to simulate a slow API
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return res.status(200).json({ imagePath });
};
