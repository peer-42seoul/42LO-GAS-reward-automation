var TypeoOfData = {
  TEAMNAME: 0,
  START: 1, 
  END: 2, 
  EVENT: 3,
  LEADER: 4,
  FOLLOWER: 5
};

class TeamObject {
  constructor (teamName, startDate, endDate, eventType, leader, follower) {
    this.teamName = teamName;
    this.startDate = startDate;
    this.endDate = endDate;
    this.eventType = eventType;
    this.leader = leader;
    this.follwer = follower;
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
      default:
        throw new Error("Type is not part of Type of Data");
    }  
    return;
  };
};


function makeListFromSheet1(id){
  const target = SpreadsheetApp.openById(id).getSheetByName("1");
  let range = target.getDataRange();
  let values = range.getValues(); // 리스트를 반환 받음 
  let listOfTarget = [];
  let j = 0;

  for (let row = 6; row < values.length; row++) {
    if (values[row][1] == "")
      break ;
    let memberList = values[row][9].split(',');
    listOfTarget[j++] = new TeamObject(values[row][1], values[row][4], values[row][5], values[row][3], values[row][8], memberList);
  }  
  return (listOfTarget);
}

function myFunction() {
  // let startDate = Date("2023-05-27");
  // let endDate = Date("2023-05-28");
  // let dataTest = new TeamObject("hello-world-뿌수기", startDate, endDate, "스터디", "haryu", [ "hyna", "jujeon", "juhyelee" ]);

  // console.log(dataTest.getData(0));
  // console.log(dataTest.getData(1));
  // console.log(dataTest.getData(2));
  // console.log(dataTest.getData(3));
  // console.log(dataTest.getData(4));
  // console.log(dataTest.getData(5)[0]);
  // console.log(dataTest.getData(5).length);
  // console.log(dataTest.getData(6));

  // const target = SpreadsheetApp.openById("15xLY697OPLqfQhPtg164Pk-jV0tirxtUkFANkW0sJmU").getSheetByName("1");
  // let range = target.getDataRange();
  // let values = range.getValues(); // 리스트를 반환 받음 
  // let listOfTarget = [];
  // let j = 0;

  // for (let row = 6; row < values.length; row++) {
  //   if (values[row][1] == "")
  //     break ;
  //   let memberList = values[row][9].split(',');
  //   listOfTarget[j++] = new TeamObject(values[row][1], values[row][4], values[row][5], values[row][3], values[row][8], memberList);
  // }
  listOfTarget = makeListFromSheet1("15xLY697OPLqfQhPtg164Pk-jV0tirxtUkFANkW0sJmU");
  console.log(listOfTarget.length);
  for(let i = 0; i < listOfTarget.length; i++) {
    console.log(listOfTarget[i].getData(0));
    console.log(listOfTarget[i].getData(1));
    console.log(listOfTarget[i].getData(2));
    console.log(listOfTarget[i].getData(3));
    console.log(listOfTarget[i].getData(4));
    console.log(listOfTarget[i].getData(5));
  }
}