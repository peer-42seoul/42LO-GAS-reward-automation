function setTeamWalletSheetStyle(destSheet) {
	destSheet.setFrozenColumns(1);
	destSheet.getRange(7, 1).setValue("팀 이름");
	destSheet.getRange(8, 1).setValue("연 사람");
	destSheet.getRange(9, 1).setValue("온 사람");
  }
  
  function putTeamWalletValues(destSheet, data) {
	  const leaderPoints = {
		  "스터디": 10,
		  "지식품앗이": 5
		};
		const followerPoints = {
			"스터디": 5,
			"지식품앗이": 2
		}
		let k = 0; //dummy array 순회용
		let i = 2; // sheet 기준 열 번호 
		for (;k < data.length; k++) {
			let j = 7; // sheet 기준 행 번호
			destSheet.getRange(j, i).setValue(data[k].teamName);
			destSheet.getRange(j, i + 1).setValue(data[k].eventType);
			j++;
			destSheet.getRange(j, i).setValue(data[k].leader);
			destSheet.getRange(j, i + 1).setValue(leaderPoints[data[k].eventType]);
			j++;
			for (const follower of data[k].follower) {
				destSheet.getRange(j, i).setValue(follower);
				destSheet.getRange(j, i + 1).setValue(followerPoints[data[k].eventType]);
				j++;
			}
			i += 2;
		}
	}
	
	// data : 객체 array
	function calculateTeamWalletPoints(sheetID, data) {
		const destSheet = SpreadsheetApp.openById(sheetID).getSheetByName("2");
		setTeamWalletSheetStyle(destSheet);
		putTeamWalletValues(destSheet, data);
	}