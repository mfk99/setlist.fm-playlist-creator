import cors from "cors";

const allowedOrigins = [
  "http://localhost:5173",
  "https://setlist-fm-playlist-creator-front.vercel.app",
];

export default cors({
  origin: function (origin: any, callback: any) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error("Not allowed by CORS"));
    }

    return callback(null, true);
  },
  credentials: true,
});
