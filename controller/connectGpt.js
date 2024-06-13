import OpenAI from "openai";
import mtr from "../utils/multer.js";
import info from "../utils/photoapp.json" assert { type: "json" };
const openai = new OpenAI({
  apiKey: "yourKey",
});

const iosPhotoApp = "";
export default async function connectAi(req, res) {
  const { tool, firstUrl } = req.body;
  try {
    console.log(tool);
    let useProgram;
    let iosAppData;
    let aosAppData;
    let prompt;

    const spritFirst = firstUrl.split("/");
    const getFirst =
      "https://drive.google.com/uc?export=download&id=" + spritFirst[5];
    console.log("ddddsadasdf");
    if (tool == "iOS") {
      useProgram = "iPhone default photo app";
      console.log(info[0].appSet.length);
      for (let i = 0; i < info[0].appSet.length; i++) {
        iosAppData += info[0].appSet[i];
      }
      prompt = iosAppData;
      console.log("ddd");
    }
    if (tool == "Galaxy") {
      useProgram = "Samsung Galaxy Smartphone Series Basic Gallery App";
      for (let i = 0; i < info[1].appSet.length; i++) {
        aosAppData += info[1].appSet[i];
      }
      prompt = aosAppData;

      console.log("ddd");
    }

    // const img1 = req.files["original"][0].buffer.toString("base64");
    // const img2 = req.files["gpt"][0].buffer.toString("base64");
    // const img1Description = `이미지 1: ${img1}`;
    // const img2Description = `이미지 2: ${img2}`;
    console.log("spritFirst", getFirst);

    const callGPT = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text:
                "Given data: There is one image that needs to be calibrated on the link sent by the user\
              What to do:\
              - First, analyze the image. This is to help you with the photo correction work in the future.\
              - Now you need to calibrate your image to the style that's trending on Instagram.\
              The following are the conditions.\
              1). Photo calibration will proceed with :" +
                useProgram +
                ", Please suggest the calibration method according to the function of the program.\
              2). Analysis Method: You should focus on the atmosphere, color, and feeling of the photograph, rather than changing the shape. If there is a person in the photograph, the person is not subject to correction. However, it is recommended to recommend the correction value in a way that avoids some of the phenomenon in which the skin color of the person becomes weird due to correction, but if there is no person in the photograph, you can ignore the analysis method mentioned earlier.\
              3)Description of the calibration items and items supported by the program\
              1. The following items can be calibrated in your program." +
                prompt +
                "2.Note that each item is described, but do not recommend calibration values based on this only.\
              4). How to answer:\
              1. Exclude easy steps to retrieve and save images from the answer.\
              2. Omit how to access the menu.\
              3. The name of the item that needs to be calibrated is written in a form such as 'Korean(English)''.\
              4. Write the calibration figures in as much detail as possible.\
              5. Sometimes the same item adjustment is suggested in duplicate. Please avoid this case.\
              6. Sometimes the name of the item that needs to be corrected is wrong. Please check it again" +
                "7.The description of the item is not output as an answer.\
                8.All calibration values are between 3 and 5 and do not use decimal units.\
                9.You have to answer in Korean\
                10.It would be nice if you had a short but witty result of analyzing the picture (put the line change in a moderate way so that it's easy to see at a glance).",
            },
            {
              type: "image_url",
              image_url: {
                url: getFirst,
              },
            },
          ],
        },
      ],
    });
    console.log("callGPT", callGPT);
    console.log("dsadasdasfhghgfhh");
    return res.json(callGPT);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function connectAis(req, res) {
  const { title, body } = req.body;
  try {
    console.log(title, body);
    console.log("Hello GPT!ddsdsdsd");
    return res.json("HELLOdd");
  } catch (err) {
    res.status(500).send(err.message);
  }
}
