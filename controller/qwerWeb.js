import Qwerdata from "../schemas/qwerdata.js";
import data from "../data.json" assert { type: "json" };
import Axios from "axios";
export default async function getListData(req, res) {
  const { page = 1, limit = 10 } = req.query; // 기본값 설정
  const skip = (page - 1) * limit;
  try {
    console.log("HI QWER!");
    console.log("HI QWER!");
    const findQwer = await Qwerdata.find()
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ uploadDate: 1 })
      .lean();
    return res.json(findQwer);
    // return res.json(findQwer);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function dataFilter(req, res) {
  const { title, body } = req.body;
  console.log(data[1]);
  const qwerDt = data;
  let url;
  let vd = 0;
  let sh = 0;
  for (let i = 0; i < data.length; i++) {
    try {
      url = "https://www.youtube.com/shorts/" + data[i].id.videoId;
      const response = await Axios.get(
        "https://www.youtube.com/shorts/" + data[i].id.videoId,
        {
          maxRedirects: 0, // 리다이렉트를 따르지 않도록 설정
          validateStatus: function (status) {
            return status >= 200 && status < 400; // 상태 코드가 2xx 또는 3xx인 경우에만 유효한 응답으로 간주
          },
        }
      );
      console.log(`URL: ${url} - 응답 상태: ${response.status}`);
      if (response.status == "200") {
        sh++;
      } else if (response.status == "303") {
        vd++;
        let dburl = "https://youtu.be/" + data[i].id.videoId;
        let insertData = await Qwerdata.create({
          title: data[i].snippet.title,
          url: dburl,
          iconImg: data[i].snippet.thumbnails.high.url,
          uploadDate: data[i].snippet.publishedAt,
        });
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status >= 300 && error.response.status < 400) {
          console.log(
            `URL: ${url} - 리다이렉트 감지: ${error.response.status} - ${error.response.headers.location}`
          );
        } else {
          console.log(`URL: ${url} - 오류 상태: ${error.response.status}`);
        }
      } else if (error.request) {
        console.log(`URL: ${url} - 응답 없음`);
      } else {
        console.log(`URL: ${url} - 오류 발생: ${error.message}`);
      }
    }
  }
  console.log("긴거", vd);
  console.log("짧", sh);
}
