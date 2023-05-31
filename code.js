// 단계별 정리 
/*
1.1 예약 날짜 확인
1.2 날짜 확인 시 크롤링 시작 
1.3 지정된 클래스 형태에 각 팀별로 파싱 
1.4 유효성 검사 
2. 파일 생성 및 시트 생성
3. 배열 객체의 데이터 생성 
4.1 팀별 이벤트 종류 확인 / 팀별 리더, 팀원 구분하여 넣기 
4.2 인트라 ID별 입력, 신규 ID는 추가  / 내용 가산 
4.3 가산 결과 30 이상이면, 30으로 고정 
4.4 개인 전체 계산 마무리 & 기존 전체 참여 리스트 참고, 신규 참여자 확인
5.1 시트 정리 완료 알림, 사람 검토 -> 확인
5.2 메일 발송
*/

var TypeoOfData = {
  TEAMNAME: 0,
  START: 1, 
  END: 2, 
  EVENT: 3,
  LEADER: 4,
  FOLLOWER: 5,
  REVIEWER: 6, 
  IDEALSTART: 7, 
  IDEALEND: 8, 
  PAGEID: 9
};

class TeamObject {
  constructor (dataArr) {
    this.teamName = dataArr[TypeoOfData];
    this.startDate = dataArr[TypeoOfData.TEAMNAME];
    this.endDate = dataArr[TypeoOfData.TEAMNAME];
    this.eventType = dataArr[TypeoOfData.TEAMNAME];
    this.leader = dataArr[TypeoOfData.TEAMNAME];
    this.follwer = dataArr[TypeoOfData.TEAMNAME];
	this.reviewer = dataArr[TypeoOfData.TEAMNAME];
	this.idealStart = dataArr[TypeoOfData.TEAMNAME];
	this.idealEnd = dataArr[TypeoOfData.TEAMNAME];
  };

  getData(type) {
    switch(type) {
      case TypeoOfData.TEAMNAME:
        return (this.teamName);
      case TypeoOfData.START:
        return (this.startDate);
      case TypeoOfData.END:
        return (this.endDate);
      case TypeoOfData.EVENT:
        return (this.eventType);
      case TypeoOfData.LEADER:
        return (this.leader);
      case TypeoOfData.FOLLOWER:
        return (this.follwer);	
      case TypeoOfData.REVIEWER:
        return (this.reviewer);
      case TypeoOfData.IDEALSTART:
        return (this.idealStart);
      case TypeoOfData.IDEALEND:
        return (this.idealEnd);

      default:
        throw new Error("Type is not part of Type of Data");
    }  
  };

  setData(type, data) {
    switch(type) {
      case TypeoOfData.TEAMNAME:
       this.teamName = data;
       break;
      case TypeoOfData.START:
       this.startDate = data;
       break;
      case TypeoOfData.END:
       this.endDate = data;
       break;
      case TypeoOfData.EVENT:
       this.eventType = data;
       break;
      case TypeoOfData.LEADER:
       this.leader = data;
       break;
      case TypeoOfData.FOLLOWER:
       this.follwer = data;
       break;
      case TypeoOfData.REVIEWER:
        this.reviewer = data;
        break;
      case TypeoOfData.IDEALSTART:
        this.idealStart = data;
        break;
      case TypeoOfData.IDEALEND:
        this.teamObjectData = data;
      default:
        throw new Error("Type is not part of Type of Data");
    }  
    return;
  };
};

function mainFunction() {

// Part 1
  const crawlingData = crawlNotionDB(); // 필터를 생각 해야하는 
  const parsingData = parseCrawlingData(crawlingData);
  const teamObjectData = parsingDataToTeamObject(parsingData);
  const validateData = getValidatedData(teamObjectData, 5);

// Part 2
  const newSheet = makeMonthSpreadSheet();

// Part 4
	// 1시트에 넣기 

  

}