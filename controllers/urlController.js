// import { v4 as uuidv4 } from 'uuid';
import { nanoid } from "nanoid";
import URL from "../models/urlSchema.js";

async function handleGenerateShortURL(req, res) {
  const { originalURL } = req.body;


  if (!originalURL) {
    return res.status(400).json({ error: "redirectURL is required" });
  }

// const shortId = uuidv4();
const shortId = nanoid(8);

  try {
    //new URL
    const newURL = await URL.create({
      shortId: shortId,
      originalURL:originalURL,
      visitHistory: [],
    });

    return res.status(201).json({
      message: "short url created successfully",
      shortId: newURL.shortId,
    });
  } catch (error) {
    console.error("error:", error);
    return res.status(500).json({ error: "server error" });
  }
}

export default handleGenerateShortURL;

export async function handleVisitHistory(req, res) {
  const { shortId } = req.params;

  try {
    const entry = await URL.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      },
      { new: true }
    );

    if (!entry) {
      return res.status(404).json({ error: "URL not found" });
    }

    return res.redirect(entry.originalURL);

  } catch (error) {
    console.error("error", error);
    return res.status(500).json({ error: "server error" });
  }
}

export async function handleGetAnalytics(req, res) {
    const { shortId } = req.params; 

    try {
        const result = await URL.findOne({ shortId }); 

        if (!result) {
           
            return res.status(404).json({ error: "URL not found" });
        }
        return res.json({
            totalClicks: result.visitHistory.length,
            analytics: result.visitHistory
        });
    } catch (error) {
        console.error("error", error);
        return res.status(500).json({ error: "server error" });
    }
}
