// 필요 변수 
// 피어 대표 이메일
const peerMailAddress = "42peer@gmail.com"; // 피어 이메일
const staffMailAddress = "born2code@42seoul.kr"; // 스태프 이메일

// 특정 셀에서 피어 대표 이메일 주소 가져오기
function getPeerRepresentativeMail() {
  const masterSheet = SpreadsheetApp.openById("1k6CHGmwGTel1UDLrYTqDkszuvkXEj94XxRXuYyHGv-Q").getSheetByName("master");
  const mailAddress = masterSheet.getRange(2, 2).getValue();
  return mailAddress;
}

// 특정 셀에서 피어 대표 인트라 아이디 가져오기
function getPeerRepresentativeIntraID() {
  const masterSheet = SpreadsheetApp.openById("1k6CHGmwGTel1UDLrYTqDkszuvkXEj94XxRXuYyHGv-Q").getSheetByName("master");
  const intraID = masterSheet.getRange(4, 2).getValue();
  return intraID;
}

// 스테프 메일로 파일 전송
function sendMailToStaff(staffMail = staffMailAddress, attachmentIDs) {
   const peerRepresentativeMail = getPeerRepresentativeMail(); // 피어 대표자 이메일 
//  const peerRepresentativeMail = "hyna0707@gmail.com";
  const peerRepresentativeIntraID = getPeerRepresentativeIntraID();
  const lastMonth = new Date().getMonth();
  if (lastMonth == 0)
	lastMonth = 12;

  const subject = `[42peer] 동아리원 명단 업데이트 / ${lastMonth}월 월렛, 업적 산정 결과 입니다.`;

  let body = `
    <html>
      <body>
        <p>안녕하세요, 42peer 운영진입니다.</p>
        <p>지난 한 주간 동아리원 명단 업데이트와 ${lastMonth}월 활동 결과로 부여 될 월렛, 업적, 칭호를 산정을 진행하였습니다.<\p>
        <p>그 결과물 링크를 아래 첨부합니다.</p>
        <p>자료에 문제가 있거나, 문의사항이 있을 경우 ` + peerRepresentativeIntraID + `에게 디엠 혹은 메일로 회신 부탁드립니다.</p>
        <p>감사합니다.</p>
        <br>
        <p>42peer 운영진 드림</p>
        <br>
        <ul>
  `;

  for (let i = 0; i < attachmentIDs.length; i++) {
    body += "       <li><a href='" + DriveApp.getFileById(attachmentIDs[i]).getUrl() + `'> `+ DriveApp.getFileById(attachmentIDs[i]).getName() +` </a></li>`;
  }

  body += `      </ul>
      </body>
    </html>`

  const options = {
    bcc: `${peerRepresentativeMail}`,
    name: "42peer 운영진",
    htmlBody: body
  };

  GmailApp.sendEmail(staffMail, subject, body, options);
} 