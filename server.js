import fs from "fs/promises";
import fsn from "fs";
import path from "path";

// Get directory path from command-line arguments
const basepath = process.argv[2]; // Default path if not provided

// Check if the path exists
if (!fsn.existsSync(basepath)) {
  console.error("Error: Directory does not exist:", basepath);
  process.exit(1);
}

(async () => {
  try {
    let files = await fs.readdir(basepath);

    for (const item of files) {
      console.log("Processing:", item);

      let ext = item.split(".").pop(); // Get file extension

      // Skip directories
      if ((await fs.stat(path.join(basepath, item))).isDirectory()) {
        continue;
      }

      let folderPath = path.join(basepath, ext); // Directory for extension

      // Create folder if it doesn't exist
      if (!fsn.existsSync(folderPath)) {
        fsn.mkdirSync(folderPath, { recursive: true });
      }

      // Move the file into the extension-based folder
      fsn.renameSync(path.join(basepath, item), path.join(folderPath, item));
    }

    console.log("File organization completed!");
  } catch (error) {
    console.error("Error:", error);
  }
})();
