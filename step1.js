const API_KEY = "secret_zNf8uxeiYuWc4CwplyCG8DT6ofuPcqDpyQ4bF3fWaIY";
const DB_ID = "b6f7edf50677437b957079dc183dac70";

function crawlNotionDB() {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`,
      "Notion-Version": "2022-06-28",
    },
    payload: JSON.stringify({
      sorts: [
        {
          property: "생성 일시",
          direction: "ascending",
        },
      ],
    }),
  };

  const response = UrlFetchApp.fetch(
    `https://api.notion.com/v1/databases/${DB_ID}/query`,
    requestOptions
  );

  const data = JSON.parse(response.getContentText());
  const pages = data.results;

  return pages;
}


function parseCrawlingData(crawlingData) {
  if (!crawlingData) {
    throw "no data input";
  }

  const requiredProperties = {
    "✶ 이름": "teamName",
    "목표 일정": "startDate",
    "✶ 연 사람": "leader",
    "✶ 온 사람": "follower",
    "✶ 이벤트": "eventType",
    "✶ 완료날짜(완료팀만)": "endDate",
    "✶ 완료 여부": "completed",
    "✶ 후기작성자": "reviewWriter"
  }
  const requiredPropertyName = Object.keys(requiredProperties);
  const studyData = new Array();

  for (const data of crawlingData) {
    const newData = {};
    const properties = data.properties;
    
    for (const key in properties) {

      if (isValidProperty(requiredPropertyName, key)) { 
        newData[requiredProperties[key]] = properties[key];
      }
    }

    newData["pageId"] = data.id
    newData["teamName"] = newData["teamName"].title[0]?.text.content ?? "";
    newData["startDate"] = newData["startDate"].date?.start ? new Date(newData["startDate"].date.start) : null;
    newData["endDate"] = newData["endDate"].date?.start ? new Date(newData["endDate"].date.start) : null;
    newData["leader"] = newData["leader"]["rich_text"][0]?.text.content ?? "";
    newData["follower"] = newData["follower"]["rich_text"][0]?.text.content ?? "";
    newData["follower"] = newData["follower"].split(getSplitSeperator(newData["follower"])) ?? [];
    newData["completed"] = newData["completed"].checkbox;
    newData["eventType"] = newData["eventType"].select?.name ?? "error";
    newData["reviewWriter"] = newData["reviewWriter"]["rich_text"][0]?.text.content.split(",") ?? [];
    
    studyData.push(newData);
  }
  
  return studyData;
}

function isValidProperty(keys, key) {
  for (const name of keys) {
    
    if (key === name) {
      return true;
    }
  }

  return false;
}

// ,로 나눈 팀과 띄어쓰기로 나눈 팀 모두 정상 처리하기 위한 임시방편 코드
function getSplitSeperator(follower) {
  return follower.includes(",") ? "," : " ";
}

function parsingDataToTeamObject(parsingData) {
  const result = new Array();

  for (const data of parsingData) {
    const teamObject = new TeamObject(data.teamName, data.startDate, data.endDate, data.eventType, data.leader, data.follower);

    deleteLeaderInFollower(teamObject);
    result.push(teamObject);
  }

  return result;
}

function deleteLeaderInFollower(teamObject) {
  if (teamObject.leader && teamObject.follower.length) {
    const follower = teamObject.follower;

    for (let i = 0; i < follower.length; i++) {
      if (follower[i] === teamObject.leader) {
        follower.splice(i, 1);
      }
    }
  }
}