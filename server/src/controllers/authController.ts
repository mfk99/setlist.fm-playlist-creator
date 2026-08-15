import type { Request, Response } from "express";

export default async function authentication(req: Request, res: Response) {
  const session = req.cookies.session;

  console.log("cookies:", req.cookies);

  if (!session) {
    return res.json({
      authenticated: false,
    });
  }

  return res.json({
    authenticated: true,
  });
}
