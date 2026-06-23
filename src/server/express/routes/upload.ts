import express from "express";

import { createUploadUrl } from "../s3";

const router = express.Router();

const allowedMimeTypes = ["image/", "video/"];
const maxFileSize = 50 * 1024 * 1024;

type FileInput = {
  fileName?: string;
  contentType?: string;
  fileSize?: number;
};

router.post("/", async (req, res: any) => {
  try {
    const files: FileInput[] = req.body?.files ?? [];

    if (!Array.isArray(files) || files.length === 0) {
      return res.status(400).json({ message: "No files provided" });
    }

    for (const file of files) {
      if (!file.fileName || !file.contentType || !file.fileSize) {
        return res
          .status(400)
          .json({ message: "Each file needs fileName, contentType, fileSize" });
      }

      const isAllowedType = allowedMimeTypes.some((type) =>
        file.contentType!.startsWith(type)
      );
      if (!isAllowedType) {
        return res
          .status(400)
          .json({ message: "Only image or video files are allowed" });
      }

      if (file.fileSize > maxFileSize) {
        return res
          .status(400)
          .json({ message: `File is too large. Max allowed size is ${maxFileSize / (1024 * 1024)}MB` });
      }
    }

    const uploads = await Promise.all(
      files.map((file) => createUploadUrl(file.fileName!, file.contentType!))
    );

    res.status(200).json({ uploads });
  } catch (error) {
    console.error("S3 signed url error:", error);
    res.status(500).json({ message: "Error creating upload URLs" });
  }
});

export default router;
