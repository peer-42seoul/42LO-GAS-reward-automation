function makeMonthSpreadSheet() {
    const masterSheet = SpreadsheetApp.openById('1k6CHGmwGTel1UDLrYTqDkszuvkXEj94XxRXuYyHGv-Q'); //master sheet
    const sheet1 = masterSheet.getSheetByName('master');
    let range = sheet1.getDataRange();
    return makeMonthFile(range.getValues()[0][0]);
  }

function makeMonthFile(date) {
    const rootfolder = DriveApp.getFolderById('1NV_J9Rc7VMr7i0tggO26vmeylkmDkHat'); //2023folder
    const data = new String(date);
    const month = data.split(' ')[1];
    const year = data.split(' ')[3];
    var i = 0;
    var monthLists = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');
    for (i; i < 12; i++)
    {
      if (month == monthLists[i]) {
        break ;
      }
    }
    var folder = DriveApp.getFolderById('1o2TGpEqq7srf0ptoc8WAQ8u28yn17nr9');
    if (i == 1) { //2월이면 새로운 년도 폴더 생성
      folder = rootfolder.createFolder(`${year}`);
      i = 12;
    }
    var newSheet = SpreadsheetApp.create(`${folder.getName()}-${i}월`);
    var fileId = newSheet.getId();
    var file = DriveApp.getFileById(fileId);
    file.moveTo(folder);
    add_newsheet(fileId);
    return newSheet;
  }
  
  function add_newsheet(fileId) {
    const monthSheet = SpreadsheetApp.openById(fileId);
    monthSheet.insertSheet('1');
    monthSheet.insertSheet('2');
    monthSheet.insertSheet('3');
    var deletesheet = monthSheet.getSheetByName('시트1');
    monthSheet.deleteSheet(deletesheet);
  }