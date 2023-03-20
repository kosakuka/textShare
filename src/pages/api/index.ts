// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ShareData } from "@/utils/interface";
import type { NextApiRequest, NextApiResponse } from "next";

let title = "";
let text = "";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ShareData>
) {
  if (req.method === "GET") {
    res.status(200).json({ title, text });
  } else if (req.method === "POST") {
    const result: ShareData = req.body;
    title = result.title;
    text = result.text;
    res.status(200).json({ title, text });
  } else {
    res.status(404).end();
  }
}
