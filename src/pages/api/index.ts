// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

let hoge = "";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    res.status(200).json({ name: hoge });
  } else if (req.method === "POST") {
    hoge = req.body.name;
    res.status(200).json({ name: hoge });
  } else {
    res.status(404).end();
  }
}
