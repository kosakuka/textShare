// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  title: string;
  text: string;
};

let title = "";
let text = "";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    res.status(200).json({ title, text });
  } else if (req.method === "POST") {
    const result: Data = req.body;
    title = result.title;
    text = result.text;
    res.status(200).json({ title, text });
  } else {
    res.status(404).end();
  }
}
