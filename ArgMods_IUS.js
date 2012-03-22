function argModSubstrate(idSample,iteration,action){
	//Diplay the ArgModSubstrate form
	if(action == "showEmptyForm"){
	var TextForDiv = '<input type="hidden" id="delStatusArgModSubstrate_lev'+iteration+'" style="width:80px"/><table width="520px" cellspacing="0px" cellpadding="0px" border="0px" align="center"><tr height="35px" valign="middle" align="left"><td width="90px">Title</td><td width="430px"><input type="text" id="titleArgModSubstrate_lev'+iteration+'" style="width:98%; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/> </td></tr><tr height="35px" valign="middle" align="left"><td>Material</td><td><input type="text" id="materialArgModSubstrate_lev'+iteration+'" style="width:120px; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/> </td></tr><tr height="35px" valign="middle" align="left"><td>Thickness (nm)</td><td><input type="text" id="thicknessArgModSubstrate_lev'+iteration+'" style="width:120px; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/> </td></tr><tr height="35px" valign="middle" align="left"><td>BatchNumber</td><td><input type="text" id="batchNumberArgModSubstrate_lev'+iteration+'" style="width:180px; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/> </td></tr><tr height="35px" valign="middle" align="left"><td> Size (inch) </td><td><input type="text" id="sizeArgModSubstrate_lev'+iteration+'" style="width:120px; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/> </td></tr><tr height="35px" valign="middle" align="left"><td valign="top">Details</td><td><textarea style="width:100%; height: 50px; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;"  onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'" id="detailsArgModSubstrate_lev'+iteration+'"> </textarea></td></tr></table>';
	return TextForDiv;
	}
	else if(action == "insert" || action == "update" || action == "downLevel"){
	var titleValue = document.getElementById("titleArgModSubstrate_lev"+iteration).value;
	var materialValue =  document.getElementById("materialArgModSubstrate_lev"+iteration).value;
	var thicknessValue = document.getElementById("thicknessArgModSubstrate_lev"+iteration).value;
	var detailsValue =  document.getElementById("detailsArgModSubstrate_lev"+iteration).value;
	var batchNumberValue =  document.getElementById("batchNumberArgModSubstrate_lev"+iteration).value;
	var sizeValue =  document.getElementById("sizeArgModSubstrate_lev"+iteration).value;
	var delStatusValue =  document.getElementById("delStatusArgModSubstrate_lev"+iteration).value;
	if(action == "insert"){
	var delStatusValue = 0;
	var insertSqlArg = "INSERT INTO ModSubstrate (idSample, ModLevel, title, material, thickness, details, batchNumber, size, delStatus) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
	db.transaction(function(tx) {
		tx.executeSql(insertSqlArg, [idSample, iteration, titleValue, materialValue, thicknessValue, detailsValue, batchNumberValue, sizeValue, delStatusValue], null, onError);
		});
	}
	else if(action ==  "update"){
	var updateSqlArg = "UPDATE ModSubstrate SET title = ?, material = ?, thickness = ?, details = ?, batchNumber = ?, size = ?, delStatus = ? WHERE idSample = ? AND ModLevel = ?";
	db.transaction(function(tx) {
	tx.executeSql(updateSqlArg, [titleValue,  materialValue, thicknessValue, detailsValue, batchNumberValue, sizeValue, delStatusValue, idSample, iteration], null, onError);		
    });
	}
	else if(action == "downLevel"){
		var downlevelSqlArg = "UPDATE ModSubstrate SET ModLevel = ? WHERE idSample = ? AND ModLevel = ?";
		var newLevel = iteration -1;
	db.transaction(function(tx) {
		tx.executeSql(downlevelSqlArg, [newLevel, idSample, iteration], null, onError);
	});
	}
	return null;
	}
	else if(action == "edit"){
		argModSubstrate(idSample, iteration, "showEmptyForm");
		db.transaction(function(tx){
		var selectArgModSubSQL = "SELECT * FROM ModSubstrate WHERE idSample = ? AND ModLevel = ? AND delStatus = ?";
		var dataset;
		tx.executeSql(selectArgModSubSQL, [idSample, iteration, 0], function(tx, result) {
		dataset = result.rows;
			datasetArgSubstrate = result.rows;
			var argSubstrate;
			// Fill up the input of SampleArg
			argSubstrate = datasetArgSubstrate.item(0);
			document.getElementById("titleArgModSubstrate_lev"+iteration).value = argSubstrate['title'];
			document.getElementById("materialArgModSubstrate_lev"+iteration).value = argSubstrate['material'];
			document.getElementById("thicknessArgModSubstrate_lev"+iteration).value = argSubstrate['thickness'];
			document.getElementById("detailsArgModSubstrate_lev"+iteration).value = argSubstrate['details'];
			document.getElementById("batchNumberArgModSubstrate_lev"+iteration).value = argSubstrate['batchNumber'];
			document.getElementById("sizeArgModSubstrate_lev"+iteration).value = argSubstrate['size'];
			document.getElementById("delStatusArgModSubstrate_lev"+iteration).value = argSubstrate['delStatus'];
		}, onError);
		});
	}
}
////////////////////////////////////////////////////////////
///////    INSERT ARGUMENT VALUES OF MODULE SINGLE LAYER  //
////////////////////////////////////////////////////////////
function argModSL(idSample,iteration,action){
	//Diplay the ArgModSL form
	if(action == "showEmptyForm"){
	var TextForDiv = '<input type="hidden" id="delStatusArgModSL_lev'+iteration+'" style="width:80px" value="0"/><table width="520px" cellspacing="0px" cellpadding="0px" border="0px solid #00000" align="center"><tr height="35px" valign="middle" align="left"><td width="120px">Title</td><td width="400px"><input type="text" id="titleArgModSL_lev'+iteration+'" style="width:98%; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/></td></tr><tr height="35px" valign="middle"><td width="120px">Material</td><td width="400px"><input type="text" id="materialArgModSL_lev'+iteration+'" style="width:98%; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/></td></tr><tr height="35px" valign="middle" align="left"><td width="120px">Thickness (nm)</td><td width="400px"><input type="text" id="thicknessArgModSL_lev'+iteration+'" style="width:150px; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/></td></tr><tr height="35px" valign="middle" align="cell"><td width="120px">Tool</td><td width="400px"><div id="containerListTool_ModSL'+iteration+'" style="width:380px"></div><input type="hidden" id="idToolArgModSL_lev'+iteration+'" value=""/></td></tr><tr height="35px" valign="middle"><td valign="top">Details</td><td><textarea style="width:98%; height: 80px; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'" id="detailsArgModSL_lev'+iteration+'"></textarea></td></tr></table>';
	listTools_form("ModSL", iteration);
	return TextForDiv;
	}
	else if(action == "insert" || action == "update" || action == "downLevel"){
		var titleValue = document.getElementById("titleArgModSL_lev"+iteration).value;
		var materialValue =  document.getElementById("materialArgModSL_lev"+iteration).value;
		var thicknessValue = document.getElementById("thicknessArgModSL_lev"+iteration).value;
		var detailsValue =  document.getElementById("detailsArgModSL_lev"+iteration).value;
		var idToolValue =  document.getElementById("idToolArgModSL_lev"+iteration).value;
		var delStatusValue =  document.getElementById("delStatusArgModSL_lev"+iteration).value;
		if(action == "insert"){
			var delStatusValue = 0;
			var insertSqlArg = "INSERT INTO ModSL (idSample, ModLevel, title, material, thickness, details, idTool, delStatus) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
		db.transaction(function(tx) {
			tx.executeSql(insertSqlArg, [idSample, iteration, titleValue, materialValue, thicknessValue, detailsValue, idToolValue, delStatusValue], null, onError);
			});
		}
		else if(action == "update"){
			var updateSqlArg = "UPDATE ModSL SET title = ?, material = ?, thickness = ?, details = ?, idTool = ?, delStatus = ? WHERE idSample = ? AND ModLevel = ?";
			db.transaction(function(tx) {
			tx.executeSql(updateSqlArg, [titleValue,  materialValue, thicknessValue, detailsValue, idToolValue, delStatusValue, idSample, iteration], null, onError);
    });
	}
	else if(action == "downLevel"){
		var downlevelSqlArg = "UPDATE ModSL SET ModLevel = ? WHERE idSample = ? AND ModLevel = ?";
		var newLevel = iteration -1;
	db.transaction(function(tx) {
		tx.executeSql(downlevelSqlArg, [newLevel, idSample, iteration], null, onError);
	});
	}
	return null;
	}
	else if(action == "edit"){
		argModSL(idSample, iteration, "showEmptyForm");
		db.transaction(function(tx){
		var selectArgModSLSQL = "SELECT * FROM ModSL WHERE idSample = ? AND ModLevel = ? AND delStatus = ?";
		var datasetArgSL;
		tx.executeSql(selectArgModSLSQL, [idSample, iteration, 0], function(tx, result) {
		datasetArgSL = result.rows;
		var argSL;
			// Fill up the input of SampleArg
			argSL = datasetArgSL.item(0);
			document.getElementById("titleArgModSL_lev"+iteration).value = argSL['title'];
			document.getElementById("materialArgModSL_lev"+iteration).value = argSL['material'];
			document.getElementById("thicknessArgModSL_lev"+iteration).value = argSL['thickness'];
			document.getElementById("detailsArgModSL_lev"+iteration).value = argSL['details'];
			document.getElementById("idToolArgModSL_lev"+iteration).value = argSL['idTool'];
			document.getElementById("delStatusArgModSL_lev"+iteration).value = argSL['delStatus'];
			var selectBox = document.getElementById("listToolSelect_ModSL"+iteration);
			if(selectBox != null){
				var items = selectBox.getElementsByTagName("option");
				for (var x = 0; x < items.length; x++) { 
					if (selectBox.options[x].value == argSL['idTool']) { 
						selectBox.options[x].selected = true; 
					} 
				}
			}
		}, onError);
		});
	}
}
////////////////////////////////////////////////////////////
///////    INSERT ARGUMENT VALUES OF MODULE MULTILAYER    //
////////////////////////////////////////////////////////////
function argModML(idSample,iteration,action){
	console.log('This is the action:'+action+' ML.');
	//Diplay the ArgModML form
	if(action == "showEmptyForm"){
	var TextForDiv = '<input type="hidden" id="delStatusArgModML_lev'+iteration+'" style="width:80px" value="0"/><table width="520px" cellspacing="0px" cellpadding="0px" border="0px solid #00000" align="center"><tr height="35px" valign="middle" align="left"><td width="120px">Title</td><td width="400px"><input type="text" id="titleArgModML_lev'+iteration+'" style="width:98%; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/></td></tr><tr height="35px" valign="middle" align="left"><td>Material 1</td><td><input type="text" id="material1ArgModML_lev'+iteration+'" style="width:150px; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/></td></tr><tr height="35px" valign="middle" align="left"><td>Thickness 1 (nm)</td><td><input type="text" id="thickness1ArgModML_lev'+iteration+'" style="width:150px; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/></td></tr><tr height="35px" valign="middle" align="left"><td>Material 2</td><td><input type="text" id="material2ArgModML_lev'+iteration+'" style="width:150px; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/></td></tr><tr height="35px" valign="middle" align="left"><td>Thickness 2 (nm)</td><td><input type="text" id="thickness2ArgModML_lev'+iteration+'" style="width:150px; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/></td></tr><tr height="35px" valign="middle" align="left"><td>Number of repeats</td><td><input type="text" id="repeatArgModML_lev'+iteration+'" style="width:150px; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/></td></tr><tr height="35px" valign="middle" align="left"><td>Tool</td><td><div id="containerListTool_ModML'+iteration+'"   style="width:380px"></div><input type="hidden" id="idToolArgModML_lev'+iteration+'" value=""/></td></tr><tr height="35px" valign="middle" align="left"><td  valign="top">Details</td><td><textarea style="width:98%; height: 70px; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'" id="detailsArgModML_lev'+iteration+'"></textarea></td></tr></table>';
	listTools_form("ModML",iteration);
	return TextForDiv;
	}
	else if(action == "insert" || action == "update" || action == "downLevel"){
	var titleValue = document.getElementById("titleArgModML_lev"+iteration).value;
	var material1Value =  document.getElementById("material1ArgModML_lev"+iteration).value;
	var thickness1Value = document.getElementById("thickness1ArgModML_lev"+iteration).value;
	var material2Value =  document.getElementById("material2ArgModML_lev"+iteration).value;
	var thickness2Value = document.getElementById("thickness2ArgModML_lev"+iteration).value;
	var repeatValue = document.getElementById("repeatArgModML_lev"+iteration).value;
	var detailsValue =  document.getElementById("detailsArgModML_lev"+iteration).value;
	var idToolValue =  document.getElementById("idToolArgModML_lev"+iteration).value;
	var delStatusValue =  document.getElementById("delStatusArgModML_lev"+iteration).value;	
		if(action == "insert"){
			var delStatus = 0;
			var insertSqlArg = "INSERT INTO ModML (idSample, ModLevel, title, details, material1, thickness1, material2, thickness2, repeat, idTool, delStatus) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
		db.transaction(function(tx) {
			tx.executeSql(insertSqlArg, [idSample, iteration, titleValue, detailsValue, material1Value, thickness1Value, material2Value, thickness2Value, repeatValue, idToolValue, delStatusValue], null, onError);
		});
		}
		else if(action == "update"){
			var updateSqlArg = "UPDATE ModML SET title = ?, material1 = ?, thickness1 = ?, material2 = ?, thickness2 = ?, repeat = ?, details = ?, idTool = ?, delStatus = ? WHERE idSample = ? AND ModLevel = ?";
			db.transaction(function(tx) {
			tx.executeSql(updateSqlArg, [titleValue,  material1Value, thickness1Value, material2Value, thickness2Value, repeatValue, detailsValue, idToolValue, delStatusValue, idSample, iteration], null, onError);
			});
		}
		else if(action == "downLevel"){
		var downlevelSqlArg = "UPDATE ModML SET ModLevel = ? WHERE idSample = ? AND ModLevel = ?";
		var newLevel = iteration -1;
	db.transaction(function(tx){
		tx.executeSql(downlevelSqlArg, [newLevel, idSample, iteration], null, onError);
	});
	}
		return null;
	}
	else if(action == "edit"){
		argModML(idSample, iteration, "showEmptyForm");
		db.transaction(function(tx){
		var selectArgModMLSQL = "SELECT * FROM ModML WHERE idSample = ? AND ModLevel = ?";
		var datasetArgML;
		tx.executeSql(selectArgModMLSQL, [idSample, iteration], function(tx, result) {
		datasetArgML = result.rows;
		var argML;
			// Fill up the input of SampleArg
			argML = datasetArgML.item(0);	
			document.getElementById("titleArgModML_lev"+iteration).value = argML['title'];
			document.getElementById("material1ArgModML_lev"+iteration).value = argML['material1'];
			document.getElementById("thickness1ArgModML_lev"+iteration).value = argML['thickness1'];
			document.getElementById("material2ArgModML_lev"+iteration).value = argML['material2'];
			document.getElementById("thickness2ArgModML_lev"+iteration).value = argML['thickness2'];
			document.getElementById("repeatArgModML_lev"+iteration).value = argML['repeat'];
			document.getElementById("detailsArgModML_lev"+iteration).value = argML['details'];
			document.getElementById("idToolArgModML_lev"+iteration).value = argML['idTool'];
			document.getElementById("delStatusArgModML_lev"+iteration).value = argML['delStatus'];
			var selectBox = document.getElementById("listToolSelect_ModML"+iteration);
			if(selectBox != null){
				var items = selectBox.getElementsByTagName("option");
				for (var x = 0; x < items.length; x++) { 
					if (selectBox.options[x].value == argML['idTool']) { 
						selectBox.options[x].selected = true;
					} 
				}
			}
		}, onError);
		});
	}
}
////////////////////////////////////////////////////////////
///////    INSERT ARGUMENT VALUES OF MODULE SPIN COATING  //
////////////////////////////////////////////////////////////
function argModSpinCoat(idSample, iteration, action){
	console.log('This is the action:'+action+' Spin Coating.');
	//Diplay the ArgModSpinCoat form
	if(action == "showEmptyForm"){
	var TextForDiv = '<input type="hidden" id="delStatusArgModSpinCoat_lev'+iteration+'" style="width:80px" value="0"/><table width="520px" cellspacing="0px" cellpadding="0px" border="0px solid #00000"><tr height="35px" valign="middle" align="left"><td width="120px">Title:</td><td><input type="text" id="titleArgModSpinCoat_lev'+iteration+'" style="width:98%; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/></td></tr><tr height="35px" valign="middle" align="left"><td>Tool:</td><td><div id="containerListTool_ModSpinCoat'+iteration+'" style="width:380px"></div><input type="hidden" id="idToolArgModSpinCoat_lev'+iteration+'" value=""/></td></tr><tr height="35px" valign="middle" align="left"><td valign="top">Details</td><td><textarea style="width:98%; height: 70px; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"  id="detailsArgModSpinCoat_lev'+iteration+'"></textarea></td></tr></table>';
	listTools_form("ModSpinCoat",iteration);
	return TextForDiv;
	}
	else if(action == "insert" || action == "update" || action == "downLevel"){
	var titleValue = document.getElementById("titleArgModSpinCoat_lev"+iteration).value;
	var detailsValue =  document.getElementById("detailsArgModSpinCoat_lev"+iteration).value;
	var idToolValue =  document.getElementById("idToolArgModSpinCoat_lev"+iteration).value;
	var delStatusValue =  document.getElementById("delStatusArgModSpinCoat_lev"+iteration).value;	
		if(action == "insert"){
			var insertSqlArg = "INSERT INTO ModSpinCoat (idSample, ModLevel, title, details, idTool, delStatus) VALUES (?, ?, ?, ?, ?, ?)";
			db.transaction(function(tx) {
			tx.executeSql(insertSqlArg, [idSample, iteration, titleValue, detailsValue, idToolValue, delStatusValue], null, onError);
			});
		}
		else if(action == "update"){
			var updateSqlArg = "UPDATE ModSpinCoat SET title = ?, details = ?, idTool = ?, delStatus = ? WHERE idSample = ? AND ModLevel = ?";
			db.transaction(function(tx) {
			tx.executeSql(updateSqlArg, [titleValue, detailsValue, idToolValue, delStatusValue, idSample, iteration], null, onError);
			});
		}
		else if(action == "downLevel"){
		var downlevelSqlArg = "UPDATE ModSpinCoat SET ModLevel = ? WHERE idSample = ? AND ModLevel = ?";
		var newLevel = iteration -1;
	db.transaction(function(tx) {
		tx.executeSql(downlevelSqlArg, [newLevel, idSample, iteration], null, onError);
	});
	}
		return null;
	}
	else if(action == "edit"){
		argModSpinCoat(idSample, iteration, "showEmptyForm");
		db.transaction(function(tx){
		var selectArgModSpinCoatSQL = "SELECT * FROM ModSpinCoat WHERE idSample = ? AND ModLevel = ?";
		var datasetArgSpinCoat;
		tx.executeSql(selectArgModSpinCoatSQL, [idSample, iteration], function(tx, result) {
		datasetArgSpinCoat = result.rows;
		var argSpinCoat;
			// Fill up the input of SampleArg
			argSpinCoat = datasetArgSpinCoat.item(0);
			document.getElementById("titleArgModSpinCoat_lev"+iteration).value = argSpinCoat['title'];
			document.getElementById("idToolArgModSpinCoat_lev"+iteration).value = argSpinCoat['idTool']
			document.getElementById("detailsArgModSpinCoat_lev"+iteration).value = argSpinCoat['details'];
			document.getElementById("delStatusArgModSpinCoat_lev"+iteration).value = argSpinCoat['delStatus'];
			var selectBox = document.getElementById("listToolSelect_ModSpinCoat"+iteration);
			if(selectBox != null){
				var items = selectBox.getElementsByTagName("option");
				for (var x = 0; x < items.length; x++) { 
					if (selectBox.options[x].value == argSpinCoat['idTool']) { 
						selectBox.options[x].selected = true;
					} 
				}
			}
		}, onError);
		});
	}
}

////////////////////////////////////////////////////////////
///////    INSERT ARGUMENT VALUES OF MODULE STEPPER       //
////////////////////////////////////////////////////////////
function argModStepper(idSample, iteration, action){
	console.log('This is the action:'+action+' Stepper.');
	//Diplay the ArgModStepper form
	if(action == "showEmptyForm"){
	var TextForDiv = '<input type="hidden" id="delStatusArgModStepper_lev'+iteration+'" style="width:80px" value="0"/><table width="520px" cellspacing="0px" cellpadding="0px" border="0px solid #00000"><tr height="35px" valign="middle" align="left"><td width="120px">Title:</td><td><input type="text" id="titleArgModStepper_lev'+iteration+'" style="width:98%; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/></td></tr><tr height="35px" valign="middle" align="left"><td>Tool:</td><td><div id="containerListTool_ModStepper'+iteration+'" style="width:380px"></div><input type="hidden" id="idToolArgModStepper_lev'+iteration+'" value=""/></td></tr><tr height="35px" valign="middle" align="left"><td valign="top">Details</td><td><textarea style="width:98%; height:80px; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'" id="detailsArgModStepper_lev'+iteration+'"></textarea></td></tr></table>'; 
	listTools_form("ModStepper",iteration);
	return TextForDiv;
	}

	else if(action == "insert" || action == "update" || action == "downLevel"){
	var titleValue = document.getElementById("titleArgModStepper_lev"+iteration).value;
	var detailsValue =  document.getElementById("detailsArgModStepper_lev"+iteration).value;
	var idToolValue =  document.getElementById("idToolArgModStepper_lev"+iteration).value;
	var delStatusValue =  document.getElementById("delStatusArgModStepper_lev"+iteration).value;	
		if(action == "insert"){
			var insertSqlArg = "INSERT INTO ModStepper (idSample, ModLevel, title, details, idTool, delStatus) VALUES (?, ?, ?, ?, ?, ?)";
			db.transaction(function(tx) {
			tx.executeSql(insertSqlArg, [idSample, iteration, titleValue, detailsValue, idToolValue, delStatusValue], null, onError);
			});
		}
		else if(action == "update"){
			var updateSqlArg = "UPDATE ModStepper SET title = ?, details = ?, idTool = ?, delStatus = ? WHERE idSample = ? AND ModLevel = ?";
			db.transaction(function(tx) {
			tx.executeSql(updateSqlArg, [titleValue, detailsValue, idToolValue, delStatusValue, idSample, iteration], null, onError);
		});
		}
		else if(action == "downLevel"){
		var downlevelSqlArg = "UPDATE ModStepper SET ModLevel = ? WHERE idSample = ? AND ModLevel = ?";
		var newLevel = iteration -1;
	db.transaction(function(tx) {
		tx.executeSql(downlevelSqlArg, [newLevel, idSample, iteration], null, onError);
	});
	}
		return null;
	}
	else if(action == "edit"){
		argModStepper(idSample, iteration, "showEmptyForm");
		db.transaction(function(tx){
		var selectArgModStepperSQL = "SELECT * FROM ModStepper WHERE idSample = ? AND ModLevel = ?";
		var datasetArgStepper;
		tx.executeSql(selectArgModStepperSQL, [idSample, iteration], function(tx, result) {
		datasetArgStepper = result.rows;
		var argStepper;
			// Fill up the input of SampleArg
			argStepper = datasetArgStepper.item(0);		
			document.getElementById("titleArgModStepper_lev"+iteration).value = argStepper['title'];
			document.getElementById("idToolArgModStepper_lev"+iteration).value = argStepper['idTool'];
			document.getElementById("delStatusArgModStepper_lev"+iteration).value = argStepper['delStatus'];
			document.getElementById("detailsArgModStepper_lev"+iteration).value = argStepper['details'];			
			var selectBox = document.getElementById("listToolSelect_ModStepper"+iteration);
			if(selectBox != null){
				var items = selectBox.getElementsByTagName("option");
				for (var x = 0; x < items.length; x++) { 
					if (selectBox.options[x].value == argStepper['idTool']) { 
					selectBox.options[x].selected = true;
					} 
				}
			}
		}, onError);
		});
	}
}
////////////////////////////////////////////////////////////
///////    INSERT ARGUMENT VALUES OF MODULE EBEAMWRITE    //
////////////////////////////////////////////////////////////
function argModEbeamWrite(idSample, iteration, action){
	console.log('This is the action:'+action+' Ebeam Write.');
	//Diplay the ArgModEbeamWrite form
	if(action == "showEmptyForm"){
	var TextForDiv = '<input type="hidden" id="delStatusArgModEbeamWrite_lev'+iteration+'" style="width:80px" value="0"/><table width="520px" cellspacing="0px" cellpadding="0px" border="0px solid #00000"><tr height="35px" valign="middle" align="left"><td width="120px">Title</td><td width="400px"><input type="text" id="titleArgModEbeamWrite_lev'+iteration+'" style="width:98%; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/></td></tr><tr height="35px" align="left" valign="middle"><td>Tool</td><td><div id="containerListTool_ModEbeamWrite'+iteration+'" style="width:380px"></div><input type="hidden" id="idToolArgModEbeamWrite_lev'+iteration+'" value=""/></td></tr><tr height="35px" align="left" valign="middle"><td  valign="top">Details</td><td><textarea style="width:98%; height:80px; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'" id="detailsArgModEbeamWrite_lev'+iteration+'"></textarea></td></tr></table>';
	listTools_form("ModEbeamWrite",iteration);
	return TextForDiv;
	}
	else if(action == "insert" || action == "update" || action == "downLevel"){
	var titleValue = document.getElementById("titleArgModEbeamWrite_lev"+iteration).value;
	var detailsValue =  document.getElementById("detailsArgModEbeamWrite_lev"+iteration).value;
	var idToolValue =  document.getElementById("idToolArgModEbeamWrite_lev"+iteration).value;
	var delStatusValue =  document.getElementById("delStatusArgModEbeamWrite_lev"+iteration).value;	
		if(action == "insert"){
			var insertSqlArg = "INSERT INTO ModEbeamWrite (idSample, ModLevel, title, details, idTool, delStatus) VALUES (?, ?, ?, ?, ?, ?)";
			db.transaction(function(tx) {
			tx.executeSql(insertSqlArg, [idSample, iteration, titleValue, detailsValue, idToolValue, delStatusValue], null, onError);
			});
		}
		else if(action == "update"){
			var updateSqlArg = "UPDATE ModEbeamWrite SET title = ?, details = ?, idTool = ?, delStatus = ? WHERE idSample = ? AND ModLevel = ?";
			db.transaction(function(tx) {
			tx.executeSql(updateSqlArg, [titleValue, detailsValue, idToolValue, delStatusValue, idSample, iteration], null, onError);
			});
		}
			else if(action == "downLevel"){
		var downlevelSqlArg = "UPDATE ModEbeamWrite SET ModLevel = ? WHERE idSample = ? AND ModLevel = ?";
		var newLevel = iteration -1;
	db.transaction(function(tx) {
		tx.executeSql(downlevelSqlArg, [newLevel, idSample, iteration], null, onError);
	});
	}
		return null;
	}
	else if(action == "edit"){
		argModStepper(idSample, iteration, "showEmptyForm");
		db.transaction(function(tx){
		var selectArgModEbeamWriteSQL = "SELECT * FROM ModEbeamWrite WHERE idSample = ? AND ModLevel = ?";
		var datasetArgEbeamWrite;
		tx.executeSql(selectArgModEbeamWriteSQL, [idSample, iteration], function(tx, result) {
		datasetArgEbeamWrite = result.rows;
		var argEbeamWrite;
			// Fill up the input of SampleArg
			argEbeamWrite = datasetArgEbeamWrite.item(0);
			document.getElementById("titleArgModEbeamWrite_lev"+iteration).value = argEbeamWrite['title'];
			document.getElementById("idToolArgModEbeamWrite_lev"+iteration).value = argEbeamWrite['idTool'];
			document.getElementById("delStatusArgModEbeamWrite_lev"+iteration).value = argEbeamWrite['delStatus'];
			document.getElementById("detailsArgModEbeamWrite_lev"+iteration).value = argEbeamWrite['details'];			
			var selectBox = document.getElementById("listToolSelect_ModEbeamWrite"+iteration);
			if(selectBox != null){
				var items = selectBox.getElementsByTagName("option");
				for (var x = 0; x < items.length; x++) { 
					if (selectBox.options[x].value == argEbeamWrite['idTool']) { 
						selectBox.options[x].selected = true;
					} 
				}
			}
		}, onError);
		});
	}
}
////////////////////////////////////////////////////////////
///////    INSERT ARGUMENT VALUES OF MODULE ION MILL      //
////////////////////////////////////////////////////////////
function argModIonMill(idSample, iteration, action){
	console.log('This is the action:'+action+' Ion Mill.');
//Diplay the ArgModIonMill form
	if(action == "showEmptyForm"){
	var TextForDiv = '<input type="hidden" id="delStatusArgModIonMill_lev'+iteration+'" style="width:80px" value="0"/><table width="520px" cellspacing="0px" cellpadding="0px" border="0px solid #00000"><tr height="35px" valign="middle" align="left"><td width="120px">Title</td><td width="400px"><input type="text" id="titleArgModIonMill_lev'+iteration+'" style="width:98%; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/></td></tr><tr height="35px" valign="middle" align="left"><td>Tilt Angle (degree)</td><td><input type="text" id="tiltAngleArgModIonMill_lev'+iteration+'" style="width:98%; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/></td></tr><tr height="35px" valign="middle" align="left"><td>Pressure</td><td> <input type="text" id="pressureArgModIonMill_lev'+iteration+'" style="width:350px; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/> <input type="text" id="unitPressureArgModIonMill_lev'+iteration+'" style="width:30px; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/></td></tr><tr height="35px" valign="middle" align="left"><td>Speed</td><td><input type="text" id="speedArgModIonMill_lev'+iteration+'" style="width:350px; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/>  <input type="text" id="unitSpeedArgModIonMill_lev'+iteration+'" style="width:30px; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/></td></tr><tr height="35px" valign="middle" align="left"><td>Temperature (K)</td><td> <input type="text" id="temperatureArgModIonMill_lev'+iteration+'" style="width:98%; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/></td></tr><tr height="35px" valign="middle" align="left"><td>Tool </td><td><div id="containerListTool_ModIonMill'+iteration+'" style="width:380px"></div><input type="hidden" id="idToolArgModIonMill_lev'+iteration+'" value=""/></td></tr><tr height="35px" align="left" valign="middle"><td valign="top">Details</td><td><textarea style="width:98%; height: 80px; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'" id="detailsArgModIonMill_lev'+iteration+'"></textarea></td></tr></table>';
	listTools_form("ModIonMill",iteration);
	return TextForDiv;
	}
	else if(action == "insert" || action == "update" || action == "downLevel"){
	var titleValue = document.getElementById("titleArgModIonMill_lev"+iteration).value;
	var tiltAngleValue = document.getElementById("tiltAngleArgModIonMill_lev"+iteration).value;
	var pressureValue = document.getElementById("pressureArgModIonMill_lev"+iteration).value;
	var unitPressureValue = document.getElementById("unitPressureArgModIonMill_lev"+iteration).value;
	var speedValue = document.getElementById("speedArgModIonMill_lev"+iteration).value;
	var unitSpeedValue = document.getElementById("unitSpeedArgModIonMill_lev"+iteration).value;
	var temperatureValue = document.getElementById("temperatureArgModIonMill_lev"+iteration).value;
	var detailsValue =  document.getElementById("detailsArgModIonMill_lev"+iteration).value;
	var idToolValue =  document.getElementById("idToolArgModIonMill_lev"+iteration).value;
	var delStatusValue =  document.getElementById("delStatusArgModIonMill_lev"+iteration).value;
		if(action == "insert"){
			var insertSqlArg = "INSERT INTO ModIonMill (idSample, ModLevel, title, tiltAngle, pressure, unitPressure, speed, unitSpeed, temperature, details, idTool, delStatus) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
			db.transaction(function(tx) {
			tx.executeSql(insertSqlArg, [idSample, iteration, titleValue, tiltAngleValue, pressureValue, unitPressureValue, speedValue, unitSpeedValue, temperatureValue, detailsValue, idToolValue, delStatusValue], null, onError);
			});
		}
		else if(action == "update"){
			var updateSqlArg = "UPDATE ModIonMill SET title = ?, tiltAngle = ?, pressure = ?, unitPressure = ?, speed = ?, unitSpeed = ?, temperature = ?, details = ?, idTool = ?, delStatus = ? WHERE idSample = ? AND ModLevel = ?";
			db.transaction(function(tx) {
			tx.executeSql(updateSqlArg, [titleValue, tiltAngleValue, pressureValue, unitPressureValue, speedValue, unitSpeedValue, temperatureValue, detailsValue, idToolValue, delStatusValue, idSample, iteration], null, onError);
			});
		}
		else if(action == "downLevel"){
		var downlevelSqlArg = "UPDATE ModIonMill SET ModLevel = ? WHERE idSample = ? AND ModLevel = ?";
		var newLevel = iteration -1;
	db.transaction(function(tx) {
		tx.executeSql(downlevelSqlArg, [newLevel, idSample, iteration], null, onError);
	});
	}
		return null;
	}
	else if(action == "edit"){
		argModIonMill(idSample, iteration, "showEmptyForm");
		db.transaction(function(tx){
		var selectArgModIonMillSQL = "SELECT * FROM ModIonMill WHERE idSample = ? AND ModLevel = ?";
		var datasetArgIonMill;
		tx.executeSql(selectArgModIonMillSQL, [idSample, iteration], function(tx, result) {
		datasetArgIonMill = result.rows;
		var argIonMill;
			// Fill up the input of IonMillArg
			argIonMill = datasetArgIonMill.item(0);
			document.getElementById("titleArgModIonMill_lev"+iteration).value = argIonMill['title'];
			document.getElementById("tiltAngleArgModIonMill_lev"+iteration).value = argIonMill['tiltAngle'];
			document.getElementById("pressureArgModIonMill_lev"+iteration).value = argIonMill['pressure'];
			document.getElementById("unitPressureArgModIonMill_lev"+iteration).value = argIonMill['unitPressure'];
			document.getElementById("speedArgModIonMill_lev"+iteration).value = argIonMill['speed'];
			document.getElementById("unitSpeedArgModIonMill_lev"+iteration).value = argIonMill['unitSpeed'];
			document.getElementById("temperatureArgModIonMill_lev"+iteration).value = argIonMill['temperature'];
			document.getElementById("detailsArgModIonMill_lev"+iteration).value = argIonMill['details'];
			document.getElementById("idToolArgModIonMill_lev"+iteration).value = argIonMill['idTool'];
			document.getElementById("delStatusArgModIonMill_lev"+iteration).value = argIonMill['delStatus'];
			var selectBox = document.getElementById("listToolSelect_ModIonMill"+iteration);
			if(selectBox != null){
				var items = selectBox.getElementsByTagName("option");
				for (var x = 0; x < items.length; x++) { 
					if (selectBox.options[x].value == argIonMill['idTool']) { 
						selectBox.options[x].selected = true; 
					} 
			}	}
		}, onError);
		});
	}
}
////////////////////////////////////////////////////////////
///////    INSERT ARGUMENT VALUES OF MODULE RIE           //
////////////////////////////////////////////////////////////
function argModRIE(idSample, iteration, action){
		console.log('This is the action:'+action+' RIE.');
		//Diplay the ArgModRIE form
	if(action == "showEmptyForm"){
	var TextForDiv = '<input type="hidden" id="delStatusArgModRIE_lev'+iteration+'" style="width:80px" value="0"/><table width="520px" cellspacing="0px" cellpadding="0px" border="0px solid #00000"><tr height="35px" valign="middle" align="left"><td width="120px">Title</td><td width="400px"><input type="text" id="titleArgModRIE_lev'+iteration+'" style="width:98%; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/></td></tr><tr height="35px" valign="middle" align="left"><td>Pressure</td><td><input type="text" id="pressureArgModRIE_lev'+iteration+'" style="width:350px; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/> <input type="text" id="unitPressureArgModRIE_lev'+iteration+'" style="width:30px; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/></td></tr><tr height="35px" valign="middle" align="left"><td>Gas name</td><td><input type="text" id="gasNameArgModRIE_lev'+iteration+'" style="width:98%; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/></td></tr><tr height="35px" valign="middle" align="left"><td>Gas flow:</td><td><input type="text" id="gasFlowArgModRIE_lev'+iteration+'" style="width:350px; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/> <input type="text" id="unitGasFlowArgModRIE_lev'+iteration+'" style="width:30px; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/></td></tr><tr height="35px" valign="middle" align="left"><td>Tool </td><td><div id="containerListTool_ModRIE'+iteration+'" style="width:380px"></div><input type="hidden" id="idToolArgModRIE_lev'+iteration+'" value=""/></td></tr><tr height="35px" valign="middle" align="left"><td valign="top">Details</td><td><textarea style="width:98%; height: 80px; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'" id="detailsArgModRIE_lev'+iteration+'"></textarea></td></tr></table>';
	listTools_form("ModRIE",iteration);
	return TextForDiv;
	}
	else if(action == "insert" || action == "update" || action == "downLevel"){
	var titleValue = document.getElementById("titleArgModRIE_lev"+iteration).value;
	var pressureValue = document.getElementById("pressureArgModRIE_lev"+iteration).value;
	var unitPressureValue = document.getElementById("unitPressureArgModRIE_lev"+iteration).value;
	var gasNameValue = document.getElementById("gasNameArgModRIE_lev"+iteration).value;
	var gasFlowValue = document.getElementById("gasFlowArgModRIE_lev"+iteration).value;
	var unitGasFlowValue = document.getElementById("unitGasFlowArgModRIE_lev"+iteration).value;	
	var detailsValue =  document.getElementById("detailsArgModRIE_lev"+iteration).value;
	var idToolValue =  document.getElementById("idToolArgModRIE_lev"+iteration).value;
	var delStatusValue =  document.getElementById("delStatusArgModRIE_lev"+iteration).value;
		if(action == "insert"){
			var insertSqlArg = "INSERT INTO ModRIE (idSample, ModLevel, title, pressure, unitPressure, gasName, gasFlow, unitGasFlow, details, idTool, delStatus) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
		db.transaction(function(tx) {
			tx.executeSql(insertSqlArg, [idSample, iteration, titleValue, pressureValue, unitPressureValue, gasNameValue, gasFlowValue, unitGasFlowValue, detailsValue, idToolValue, delStatusValue], null, onError);
		});
		}
		else if(action == "update"){
			var updateSqlArg = "UPDATE ModRIE SET title = ?,  pressure = ?, unitPressure = ?, gasName = ?, gasFlow = ?, unitGasFlow = ?, details = ?, idTool = ?, delStatus = ? WHERE idSample = ? AND ModLevel = ?";
			db.transaction(function(tx) {
			tx.executeSql(updateSqlArg, [titleValue, pressureValue, unitPressureValue, gasNameValue, gasFlowValue, unitGasFlowValue, detailsValue, idToolValue, delStatusValue, idSample, iteration], null, onError);
			});
		}
		else if(action == "downLevel"){
		var downlevelSqlArg = "UPDATE ModRIE SET ModLevel = ? WHERE idSample = ? AND ModLevel = ?";
		var newLevel = iteration -1;
	db.transaction(function(tx) {
		tx.executeSql(downlevelSqlArg, [newLevel, idSample, iteration], null, onError);
	});
	}
		return null;
	}
	else if(action == "edit"){
		argModRIE(idSample, iteration, "showEmptyForm");
		db.transaction(function(tx){
		var selectArgModRIESQL = "SELECT * FROM ModRIE WHERE idSample = ? AND ModLevel = ?";
		var datasetArgRIE;
		tx.executeSql(selectArgModRIESQL, [idSample, iteration], function(tx, result) {
		datasetArgRIE = result.rows;
		var argRIE;
			// Fill up the input of RIEArg
			argRIE = datasetArgRIE.item(0);
			document.getElementById("titleArgModRIE_lev"+iteration).value = argRIE['title'];
			document.getElementById("pressureArgModRIE_lev"+iteration).value = argRIE['pressure'];
			document.getElementById("unitPressureArgModRIE_lev"+iteration).value = argRIE['unitPressure'];
			document.getElementById("gasNameArgModRIE_lev"+iteration).value = argRIE['gasName'];
			document.getElementById("gasFlowArgModRIE_lev"+iteration).value = argRIE['gasFlow'];
			document.getElementById("detailsArgModRIE_lev"+iteration).value = argRIE['details'];
			document.getElementById("idToolArgModRIE_lev"+iteration).value = argRIE['idTool'];
			document.getElementById("delStatusArgModRIE_lev"+iteration).value = argRIE['delStatus'];
			var selectBox = document.getElementById("listToolSelect_ModRIE"+iteration);
			if(selectBox != null){
				var items = selectBox.getElementsByTagName("option");
				for (var x = 0; x < items.length; x++) { 
					if (selectBox.options[x].value == argRIE['idTool']) { 
						selectBox.options[x].selected = true; 
					} 
				}
			}
		}, onError);
		});
	}
}
////////////////////////////////////////////////////////////
///////    INSERT ARGUMENT VALUES OF MODULE VSM           //
////////////////////////////////////////////////////////////
function argModVSM(idSample, iteration, action){
	console.log('This is the action:'+action+' VSM.');
		//Diplay the ArgModVSM form
	if(action == "showEmptyForm"){
	var TextForDiv = '<input type="hidden" id="delStatusArgModVSM_lev'+iteration+'" style="width:80px" value="0"/><table width="520px" cellspacing="0px" cellpadding="0px" border="0px solid #00000"><tr height="35px" valign="middle" align="left"><td width="120px">Title</td><td width="400px"><input type="text" id="titleArgModVSM_lev'+iteration+'" style="width:98%; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/></td></tr><tr height="35px" valign="middle" align="top"><td>Tool</td><td><div id="containerListTool_ModVSM'+iteration+'" style="width:380px"></div><input type="hidden" id="idToolArgModVSM_lev'+iteration+'" value=""/></td></tr><tr height="35px" valign="middle" align="left"><td>Hsat</td><td><input type="text" id="HsatArgModVSM_lev'+iteration+'" style="width:200px; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/> <input type="text" id="unitHsatArgModVSM_lev'+iteration+'" style="width:30px; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/> &nbsp; &nbsp; &nbsp; &nbsp; Error <input type="text" id="errHsatArgModVSM_lev'+iteration+'" style="width:90px; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/></td></tr><tr height="35px" valign="middle" align="left"><td>Hc</td><td><input type="text" id="HcArgModVSM_lev'+iteration+'" style="width:200px; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/> <input type="text" id="unitHcArgModVSM_lev'+iteration+'" style="width:30px; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/> &nbsp; &nbsp; &nbsp; &nbsp; Error <input type="text" id="errHcArgModVSM_lev'+iteration+'" style="width:90px; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/></td></tr><tr height="35px" valign="middle" align="left"><td>Msat</td><td valign="middle"><input type="text" id="MsatArgModVSM_lev'+iteration+'" style="width:200px; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/> <input type="text" id="unitMsatArgModVSM_lev'+iteration+'" style="width:30px; background-color:#EAE9E9; margin:0px 0px 10px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/>&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; Error <input type="text" id="errMsatArgModVSM_lev'+iteration+'" style="width:90px; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/></td></tr><tr height="35px" align="left" valign="middle"><td>Temperature (K)</td><td><input type="text" id="temperatureArgModVSM_lev'+iteration+'" style="width:350px; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/></td></tr><tr height="35px" valign="middle" align="left"><td>Field direction (degree)</td><td><input type="text" id="fldDirArgModVSM_lev'+iteration+'" style="width:98%; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/></td></tr><tr height="35px" valign="middle" align="left"><td valign="top">Details</td><td><textarea style="width:98%; height: 80px; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'" id="detailsArgModVSM_lev'+iteration+'"></textarea></td></tr></table>';
	listTools_form("ModVSM",iteration);
	return TextForDiv;
	}
	else if(action == "insert" || action == "update" || action == "downLevel"){
		var titleValue = document.getElementById("titleArgModVSM_lev"+iteration).value;
		var HcValue = document.getElementById("HcArgModVSM_lev"+iteration).value;
		var unitHcValue = document.getElementById("unitHcArgModVSM_lev"+iteration).value;
		var errHcValue = document.getElementById("errHcArgModVSM_lev"+iteration).value;
		var HsatValue = document.getElementById("HsatArgModVSM_lev"+iteration).value;
		var unitHsatValue = document.getElementById("unitHsatArgModVSM_lev"+iteration).value;
		var errHsatValue = document.getElementById("errHsatArgModVSM_lev"+iteration).value;
		var MsatValue = document.getElementById("MsatArgModVSM_lev"+iteration).value;
		var unitMsatValue = document.getElementById("unitMsatArgModVSM_lev"+iteration).value;
		var errMsatValue = document.getElementById("errMsatArgModVSM_lev"+iteration).value;
		var temperatureValue = document.getElementById("temperatureArgModVSM_lev"+iteration).value;
		var fldDirValue = document.getElementById("fldDirArgModVSM_lev"+iteration).value;
		var detailsValue =  document.getElementById("detailsArgModVSM_lev"+iteration).value;
		var idToolValue =  document.getElementById("idToolArgModVSM_lev"+iteration).value;
		var delStatusValue =  document.getElementById("delStatusArgModVSM_lev"+iteration).value;
		if(action == "insert"){
			var insertSqlArg = "INSERT INTO ModVSM (idSample, ModLevel, title, Hc, unitHc, errHc, Hsat, unitHsat, errHsat, Msat, unitMsat, errMsat, temperature, fldDir, details, idTool, delStatus) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
		db.transaction(function(tx) {
			tx.executeSql(insertSqlArg, [idSample, iteration, titleValue, HcValue, unitHcValue, errHcValue, HsatValue, unitHsatValue, errHsatValue, MsatValue, unitMsatValue, errMsatValue, temperatureValue, fldDirValue, detailsValue, idToolValue, delStatusValue], null, onError);
			});
		}
		else if(action == "update"){
			var updateSqlArg = "UPDATE ModVSM SET title = ?, Hc = ?, unitHc = ?, errHc = ?, Hsat = ?, unitHsat = ?, errHsat = ?, Msat = ?, unitMsat = ?, errMsat = ?, temperature = ?, fldDir = ?, details = ?, idTool = ?, delStatus = ? WHERE idSample = ? AND ModLevel = ?";
			db.transaction(function(tx) {
			tx.executeSql(updateSqlArg, [titleValue, HcValue, unitHcValue, errHcValue, temperatureValue, fldDirValue, detailsValue, idToolValue, delStatusValue, idSample, iteration], null, onError);
			});
		}
		else if(action == "downLevel"){
		var downlevelSqlArg = "UPDATE ModVSM SET ModLevel = ? WHERE idSample = ? AND ModLevel = ?";
		var newLevel = iteration -1;
	db.transaction(function(tx) {
		tx.executeSql(downlevelSqlArg, [newLevel, idSample, iteration], null, onError);
	});
	}
	else if(action == "downLevel"){
		var downlevelSqlArg = "UPDATE ModVSM SET ModLevel = ? WHERE idSample = ? AND ModLevel = ?";
		var newLevel = iteration -1;
	db.transaction(function(tx) {
		tx.executeSql(downlevelSqlArg, [newLevel, idSample, iteration], null, onError);
	});
	}
		return null;
	}
	else if(action == "edit"){
		argModVSM(idSample, iteration, "showEmptyForm");
		db.transaction(function(tx){
		var selectArgModVSMSQL = "SELECT * FROM ModVSM WHERE idSample = ? AND ModLevel = ?";
		var datasetArgVSM;
		tx.executeSql(selectArgModVSMSQL, [idSample, iteration], function(tx, result) {
		datasetArgVSM = result.rows;
		var argVSM;
			// Fill up the input of VSMArg
			argVSM = datasetArgVSM.item(0);
			document.getElementById("titleArgModVSM_lev"+iteration).value = argVSM['title'];
			document.getElementById("HcArgModVSM_lev"+iteration).value = argVSM['Hc'];
			document.getElementById("unitHcArgModVSM_lev"+iteration).value = argVSM['unitHc'];
			document.getElementById("errHcArgModVSM_lev"+iteration).value = argVSM['errHc'];
			document.getElementById("HsatArgModVSM_lev"+iteration).value = argVSM['Hsat'];;
			document.getElementById("unitHsatArgModVSM_lev"+iteration).value = argVSM['unitHsat'];
			document.getElementById("errHsatArgModVSM_lev"+iteration).value = argVSM['errHsat'];
			document.getElementById("MsatArgModVSM_lev"+iteration).value = argVSM['Msat'];
			document.getElementById("unitMsatArgModVSM_lev"+iteration).value = argVSM['unitMsat'];
			document.getElementById("errMsatArgModVSM_lev"+iteration).value = argVSM['errMsat'];
			document.getElementById("temperatureArgModVSM_lev"+iteration).value = argVSM['temperature'];
			document.getElementById("fldDirArgModVSM_lev"+iteration).value = argVSM['fldDir'];
			document.getElementById("detailsArgModVSM_lev"+iteration).value = argVSM['details'];
			document.getElementById("idToolArgModVSM_lev"+iteration).value = argVSM['idTool'];
			document.getElementById("delStatusArgModVSM_lev"+iteration).value = argVSM['delStatus'];
			var selectBox = document.getElementById("listToolSelect_ModVSM"+iteration);
			if(selectBox != null){
				var items = selectBox.getElementsByTagName("option");
				for (var x = 0; x < items.length; x++) { 
					if (selectBox.options[x].value == argVSM['idTool']) { 
						selectBox.options[x].selected = true; 
					} 
				}
			}
		}, onError);
		});
	}
}
////////////////////////////////////////////////////////////
///////    INSERT ARGUMENT VALUES OF MODULE SQUID    //
////////////////////////////////////////////////////////////
function argModSQUID(idSample, iteration, action){
	console.log('This is the action:'+action+' SQUID.');
		//Diplay the ArgModSQUID form
	if(action == "showEmptyForm"){
		var TextForDiv = '<input type="hidden" id="delStatusArgModSQUID_lev'+iteration+'" style="width:80px" value="0"/><table width="520px" cellspacing="0px" cellpadding="0px" border="0px solid #00000"><tr height="35px" valign="middle" align="left"><td width="120px">Title</td><td width="400px"><input type="text" id="titleArgModSQUID_lev'+iteration+'" style="width:98%; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/></td></tr><tr height="35px" valign="middle" align="top"><td>Tool</td><td><div id="containerListTool_ModSQUID'+iteration+'" style="width:380px"></div><input type="hidden" id="idToolArgModSQUID_lev'+iteration+'" value=""/></td></tr><tr height="35px" valign="middle" align="left"><td>Hsat</td><td><input type="text" id="HsatArgModSQUID_lev'+iteration+'" style="width:200px; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/> <input type="text" id="unitHsatArgModSQUID_lev'+iteration+'" style="width:30px; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/> &nbsp; &nbsp; &nbsp; &nbsp; Error <input type="text" id="errHsatArgModSQUID_lev'+iteration+'" style="width:90px; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/></td></tr><tr height="35px" valign="middle" align="left"><td>Hc</td><td><input type="text" id="HcArgModSQUID_lev'+iteration+'" style="width:200px; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/> <input type="text" id="unitHcArgModSQUID_lev'+iteration+'" style="width:30px; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/> &nbsp; &nbsp; &nbsp; &nbsp; Error <input type="text" id="errHcArgModSQUID_lev'+iteration+'" style="width:90px; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/></td></tr><tr height="35px" valign="middle" align="left"><td>Msat</td><td valign="middle"><input type="text" id="MsatArgModSQUID_lev'+iteration+'" style="width:200px; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/> <input type="text" id="unitMsatArgModSQUID_lev'+iteration+'" style="width:30px; background-color:#EAE9E9; margin:0px 0px 10px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/>&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; Error <input type="text" id="errMsatArgModSQUID_lev'+iteration+'" style="width:90px; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/></td></tr><tr height="35px" align="left" valign="middle"><td>Temperature (K)</td><td><input type="text" id="temperatureArgModSQUID_lev'+iteration+'" style="width:350px; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/></td></tr><tr height="35px" valign="middle" align="left"><td>Field direction (degree)</td><td><input type="text" id="fldDirArgModSQUID_lev'+iteration+'" style="width:98%; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/></td></tr><tr height="35px" valign="middle" align="left"><td valign="top">Details</td><td><textarea style="width:98%; height: 80px; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'" id="detailsArgModSQUID_lev'+iteration+'"></textarea></td></tr></table>';
	listTools_form("ModSQUID",iteration);
	return TextForDiv;
	}
else if(action == "insert" || action == "update" || action == "downLevel"){
		var titleValue = document.getElementById("titleArgModSQUID_lev"+iteration).value;
		var HcValue = document.getElementById("HcArgModSQUID_lev"+iteration).value;
		var unitHcValue = document.getElementById("unitHcArgModSQUID_lev"+iteration).value;
		var errHcValue = document.getElementById("errHcArgModSQUID_lev"+iteration).value;
		var HsatValue = document.getElementById("HsatArgModSQUID_lev"+iteration).value;
		var unitHsatValue = document.getElementById("unitHsatArgModSQUID_lev"+iteration).value;
		var errHsatValue = document.getElementById("errHsatArgModSQUID_lev"+iteration).value;
		var MsatValue = document.getElementById("MsatArgModSQUID_lev"+iteration).value;
		var unitMsatValue = document.getElementById("unitMsatArgModSQUID_lev"+iteration).value;
		var errMsatValue = document.getElementById("errMsatArgModSQUID_lev"+iteration).value;
		var temperatureValue = document.getElementById("temperatureArgModSQUID_lev"+iteration).value;
		var fldDirValue = document.getElementById("fldDirArgModSQUID_lev"+iteration).value;
		var detailsValue =  document.getElementById("detailsArgModSQUID_lev"+iteration).value;
		var idToolValue =  document.getElementById("idToolArgModSQUID_lev"+iteration).value;
		var delStatusValue =  document.getElementById("delStatusArgModSQUID_lev"+iteration).value;
		if(action == "insert"){
			var insertSqlArg = "INSERT INTO ModSQUID (idSample, ModLevel, title, Hc, unitHc, errHc, Hsat, unitHsat, errHsat, Msat, unitMsat, errMsat, temperature, fldDir, details, idTool, delStatus) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
		db.transaction(function(tx) {
			tx.executeSql(insertSqlArg, [idSample, iteration, titleValue, HcValue, unitHcValue, errHcValue, HsatValue, unitHsatValue, errHsatValue, MsatValue, unitMsatValue, errMsatValue, temperatureValue, fldDirValue, detailsValue, idToolValue, delStatusValue], null, onError);
			});
		}
		else if(action == "update"){
			var updateSqlArg = "UPDATE ModSQUID SET title = ?, Hc = ?, unitHc = ?, errHc = ?, Hsat = ?, unitHsat = ?, errHsat = ?, Msat = ?, unitMsat = ?, errMsat = ?, temperature = ?, fldDir = ?, details = ?, idTool = ?, delStatus = ? WHERE idSample = ? AND ModLevel = ?";
			db.transaction(function(tx) {
			tx.executeSql(updateSqlArg, [titleValue, HcValue, unitHcValue, errHcValue, temperatureValue, fldDirValue, detailsValue, idToolValue, delStatusValue, idSample, iteration], null, onError);
			});
		}
		else if(action == "downLevel"){
		var downlevelSqlArg = "UPDATE ModSQUID SET ModLevel = ? WHERE idSample = ? AND ModLevel = ?";
		var newLevel = iteration -1;
	db.transaction(function(tx) {
		tx.executeSql(downlevelSqlArg, [newLevel, idSample, iteration], null, onError);
	});
	}
		return null;
	}
	else if(action == "edit"){
		argModSQUID(idSample, iteration, "showEmptyForm");
		db.transaction(function(tx){
		var selectArgModSQUIDSQL = "SELECT * FROM ModSQUID WHERE idSample = ? AND ModLevel = ?";
		var datasetArgSQUID;
		tx.executeSql(selectArgModSQUIDSQL, [idSample, iteration], function(tx, result) {
		datasetArgSQUID = result.rows;
		var argSQUID;
			// Fill up the input of SQUIDArg
			argSQUID = datasetArgSQUID.item(0);
			document.getElementById("titleArgModSQUID_lev"+iteration).value = argSQUID['title'];
			document.getElementById("HcArgModSQUID_lev"+iteration).value = argSQUID['Hc'];
			document.getElementById("unitHcArgModSQUID_lev"+iteration).value = argSQUID['unitHc'];
			document.getElementById("errHcArgModSQUID_lev"+iteration).value = argSQUID['errHc'];
			document.getElementById("HsatArgModSQUID_lev"+iteration).value = argSQUID['Hsat'];;
			document.getElementById("unitHsatArgModSQUID_lev"+iteration).value = argSQUID['unitHsat'];
			document.getElementById("errHsatArgModSQUID_lev"+iteration).value = argSQUID['errHsat'];
			document.getElementById("MsatArgModSQUID_lev"+iteration).value = argSQUID['Msat'];
			document.getElementById("unitMsatArgModSQUID_lev"+iteration).value = argSQUID['unitMsat'];
			document.getElementById("errMsatArgModSQUID_lev"+iteration).value = argSQUID['errMsat'];
			document.getElementById("temperatureArgModSQUID_lev"+iteration).value = argSQUID['temperature'];
			document.getElementById("fldDirArgModSQUID_lev"+iteration).value = argSQUID['fldDir'];
			document.getElementById("detailsArgModSQUID_lev"+iteration).value = argSQUID['details'];
			document.getElementById("idToolArgModSQUID_lev"+iteration).value = argSQUID['idTool'];
			document.getElementById("delStatusArgModSQUID_lev"+iteration).value = argSQUID['delStatus'];
			var selectBox = document.getElementById("listToolSelect_ModSQUID"+iteration);
			if(selectBox != null){
				var items = selectBox.getElementsByTagName("option");
				for (var x = 0; x < items.length; x++) { 
					if (selectBox.options[x].value == argSQUID['idTool']) { 
						selectBox.options[x].selected = true; 
					} 
				}
			}
		}, onError);
		});
	}
}
////////////////////////////////////////////////////////////
///////    INSERT ARGUMENT VALUES OF MODULE Mask Aligner  //
////////////////////////////////////////////////////////////
function argModMaskAlign(idSample, iteration, action){
	console.log('This is the action:'+action+' Mask Align.');
	//Diplay the ArgModMaskAlign form
	if(action == "showEmptyForm"){
	var TextForDiv = '<input type="hidden" id="delStatusArgModMaskAlign_lev'+iteration+'" style="width:80px" value="0"/><table width="520px" cellspacing="0px" cellpadding="0px" border="0px solid #00000"><tr height="35px" valign="middle" align="left"><td width="120px">Title</td><td width="400px"><input type="text" id="titleArgModMaskAlign_lev'+iteration+'" style="width:98%; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/></td></tr><tr height="35px" valign="middle" align="left"><td>Tool</td><td><div id="containerListTool_ModMaskAlign'+iteration+'" style="width:380px"></div><input type="hidden" id="idToolArgModMaskAlign_lev'+iteration+'" value=""/></td></tr><tr height="35px" valign="middle" align="left"><td valign="top">Details</td><td><textarea id="detailsArgModMaskAlign_lev'+iteration+'" style="width:98%; height:80px; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"></textarea></td></tr></table>';
	listTools_form("ModMaskAlign",iteration);
	return TextForDiv;
	}
	else if(action == "insert" || action == "update" || action == "downLevel"){
	var titleValue = document.getElementById("titleArgModMaskAlign_lev"+iteration).value;
	var detailsValue =  document.getElementById("detailsArgModMaskAlign_lev"+iteration).value;
	var idToolValue =  document.getElementById("idToolArgModMaskAlign_lev"+iteration).value;
	var delStatusValue =  document.getElementById("delStatusArgModMaskAlign_lev"+iteration).value;	
		if(action == "insert"){
			var insertSqlArg = "INSERT INTO ModMaskAlign (idSample, ModLevel, title, details, idTool, delStatus) VALUES (?, ?, ?, ?, ?, ?)";
			db.transaction(function(tx) {
			tx.executeSql(insertSqlArg, [idSample, iteration, titleValue, detailsValue, idToolValue, delStatusValue], null, onError);
			});
		}
		else if(action == "update"){
			var updateSqlArg = "UPDATE ModMaskAlign SET title = ?, details = ?, idTool = ?, delStatus = ? WHERE idSample = ? AND ModLevel = ?";
			db.transaction(function(tx) {
			tx.executeSql(updateSqlArg, [titleValue, detailsValue, idToolValue, delStatusValue, idSample, iteration], null, onError);
			});
		}
		else if(action == "downLevel"){
		var downlevelSqlArg = "UPDATE ModMaskAlign SET ModLevel = ? WHERE idSample = ? AND ModLevel = ?";
		var newLevel = iteration -1;
	db.transaction(function(tx) {
		tx.executeSql(downlevelSqlArg, [newLevel, idSample, iteration], null, onError);
	});
	}
		return null;
	}
	else if(action == "edit"){
		argModMaskAlign(idSample, iteration, "showEmptyForm");
		db.transaction(function(tx){
		var selectArgModMaskAlignSQL = "SELECT * FROM ModMaskAlign WHERE idSample = ? AND ModLevel = ?";
		var datasetArgMaskAlign;
		tx.executeSql(selectArgModMaskAlignSQL, [idSample, iteration], function(tx, result) {
		datasetArgMaskAlign = result.rows;
		var argMaskAlign;
			// Fill up the input of SQUIDArg
			argMaskAlign = datasetArgMaskAlign.item(0);
			document.getElementById("titleArgModMaskAlign_lev"+iteration).value = argMaskAlign['title'];
			document.getElementById("detailsArgModMaskAlign_lev"+iteration).value = argMaskAlign['details'];
			document.getElementById("idToolArgModMaskAlign_lev"+iteration).value = argMaskAlign['idTool'];
			document.getElementById("delStatusArgModMaskAlign_lev"+iteration).value = argMaskAlign['delStatus'];
			var selectBox = document.getElementById("listToolSelect_ModMaskAlign"+iteration);
			if(selectBox != null){
				var items = selectBox.getElementsByTagName("option");
				for (var x = 0; x < items.length; x++) { 
					if (selectBox.options[x].value == argMaskAlign['idTool']) { 
						selectBox.options[x].selected = true; 
					} 
				}
			}
		}, onError);
		});
	}
}
////////////////////////////////////////////////////////////
///////    INSERT ARGUMENT VALUES OF MODULE AFM          //
////////////////////////////////////////////////////////////
function argModMOKE(idSample, iteration, action){
	console.log('This is the action:'+action+' MOKE.');
	//Diplay the ArgMOKE form
	if(action == "showEmptyForm"){
	var TextForDiv = '<input type="hidden" id="delStatusArgModMOKE_lev'+iteration+'" style="width:80px" value="0"/><table width="520px" cellspacing="0px" cellpadding="0px" border="0px solid #00000"><tr height="35px" valign="middle" align="left"><td width="120px">Title</td><td width="400px"><input type="text" id="titleArgModMOKE_lev'+iteration+'" style="width:98%; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/></td></tr><tr height="35px" valign="middle" align="left"><td>Tool</td><td><div id="containerListTool_ModMOKE'+iteration+'" style="width:380px"></div><input type="hidden" id="idToolArgModMOKE_lev'+iteration+'" value=""/></td></tr><tr height="35px" valign="middle" align="left"><td valign="top">Details</td><td><textarea id="detailsArgModMOKE_lev'+iteration+'" style="width:98%; height: 80px; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"></textarea></td></tr></table>';
	listTools_form("ModMOKE",iteration);
	return TextForDiv;
	}
	else if(action == "insert" || action == "update" || action == "downLevel"){
	var titleValue = document.getElementById("titleArgModMOKE_lev"+iteration).value;
	var detailsValue =  document.getElementById("detailsArgModMOKE_lev"+iteration).value;
	var idToolValue =  document.getElementById("idToolArgModMOKE_lev"+iteration).value;
	var delStatusValue =  document.getElementById("delStatusArgModMOKE_lev"+iteration).value;	
		if(action == "insert"){
			var insertSqlArg = "INSERT INTO ModMOKE (idSample, ModLevel, title, details, idTool, delStatus) VALUES (?, ?, ?, ?, ?, ?)";
			db.transaction(function(tx) {
			tx.executeSql(insertSqlArg, [idSample, iteration, titleValue, detailsValue, idToolValue, delStatusValue], null, onError);
			});
		}
		else if(action == "update"){
			var updateSqlArg = "UPDATE ModMOKE SET title = ?, details = ?, idTool = ?, delStatus = ? WHERE idSample = ? AND ModLevel = ?";
			db.transaction(function(tx) {
			tx.executeSql(updateSqlArg, [titleValue, detailsValue, idToolValue, delStatusValue, idSample, iteration], null, onError);
			});
		}
		else if(action == "downLevel"){
		var downlevelSqlArg = "UPDATE ModMOKE SET ModLevel = ? WHERE idSample = ? AND ModLevel = ?";
		var newLevel = iteration -1;
	db.transaction(function(tx) {
		tx.executeSql(downlevelSqlArg, [newLevel, idSample, iteration], null, onError);
	});
	}
		return null;
	}
	else if(action == "edit"){
		argModMOKE(idSample, iteration, "showEmptyForm");
		db.transaction(function(tx){
		var selectArgModMOKESQL = "SELECT * FROM ModMOKE WHERE idSample = ? AND ModLevel = ?";
		var datasetArgMOKE;
		tx.executeSql(selectArgModMOKESQL, [idSample, iteration], function(tx, result) {
		datasetArgMOKE = result.rows;
		var argMOKE;
			// Fill up the input of SQUIDArg
			argMOKE = datasetArgMOKE.item(0);
			document.getElementById("titleArgModMOKE_lev"+iteration).value = argMOKE['title'];
			document.getElementById("detailsArgModMOKE_lev"+iteration).value = argMOKE['details'];
			document.getElementById("idToolArgModMOKE_lev"+iteration).value = argMOKE['idTool'];
			document.getElementById("delStatusArgModMOKE_lev"+iteration).value = argMOKE['delStatus'];
			var selectBox = document.getElementById("listToolSelect_ModMOKE"+iteration);
			if(selectBox != null){
				var items = selectBox.getElementsByTagName("option");
				for (var x = 0; x < items.length; x++) { 
					if (selectBox.options[x].value == argMOKE['idTool']) { 
						selectBox.options[x].selected = true; 
					} 
				}
			}
		}, onError);
		});
	}
}
////////////////////////////////////////////////////////////
///////    INSERT ARGUMENT VALUES OF MODULE AFM           //
////////////////////////////////////////////////////////////
function argModAFM(idSample, iteration, action){
	console.log('This is the action:'+action+' AFM.');
	//Diplay the ArgAFM form
	if(action == "showEmptyForm"){
	var TextForDiv = '<input type="hidden" id="delStatusArgModAFM_lev'+iteration+'" style="width:80px" value="0"/><table width="520px" cellspacing="0px" cellpadding="0px" border="0px solid #00000"><tr height="35px" valign="middle" align="left"><td width="120px">Title</td><td width="400px"><input type="text" id="titleArgModAFM_lev'+iteration+'" style="width:98%; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/></td></tr><tr height="35px" valign="middle" align="left"><td>Tool</td><td><div id="containerListTool_ModAFM'+iteration+'" style="width:380px"></div><input type="hidden" id="idToolArgModAFM_lev'+iteration+'" value=""/></td></tr><tr height="35px" valign="middle" align="left"><td valign="top">Details</td><td><textarea id="detailsArgModAFM_lev'+iteration+'" style="width:98%; height:80px; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"></textarea></td></tr></table>';
	listTools_form("ModAFM",iteration);
	return TextForDiv;
	}
	else if(action == "insert" || action == "update" || action == "downLevel"){
	var titleValue = document.getElementById("titleArgModAFM_lev"+iteration).value;
	var detailsValue =  document.getElementById("detailsArgModAFM_lev"+iteration).value;
	var idToolValue =  document.getElementById("idToolArgModAFM_lev"+iteration).value;
	var delStatusValue =  document.getElementById("delStatusArgModAFM_lev"+iteration).value;	
		if(action == "insert"){
			var insertSqlArg = "INSERT INTO ModAFM (idSample, ModLevel, title, details, idTool, delStatus) VALUES (?, ?, ?, ?, ?, ?)";
			db.transaction(function(tx) {
			tx.executeSql(insertSqlArg, [idSample, iteration, titleValue, detailsValue, idToolValue, delStatusValue], null, onError);
			});
		}
		else if(action == "update"){
			var updateSqlArg = "UPDATE ModAFM SET title = ?, details = ?, idTool = ?, delStatus = ? WHERE idSample = ? AND ModLevel = ?";
			db.transaction(function(tx) {
			tx.executeSql(updateSqlArg, [titleValue, detailsValue, idToolValue, delStatusValue, idSample, iteration], null, onError);
			});
		}
		else if(action == "downLevel"){
		var downlevelSqlArg = "UPDATE ModAFM SET ModLevel = ? WHERE idSample = ? AND ModLevel = ?";
		var newLevel = iteration -1;
	db.transaction(function(tx) {
		tx.executeSql(downlevelSqlArg, [newLevel, idSample, iteration], null, onError);
	});
	}
		return null;
	}
	else if(action == "edit"){
		argModAFM(idSample, iteration, "showEmptyForm");
		db.transaction(function(tx){
		var selectArgModAFMSQL = "SELECT * FROM ModAFM WHERE idSample = ? AND ModLevel = ?";
		var datasetArgAFM;
		tx.executeSql(selectArgModAFMSQL, [idSample, iteration], function(tx, result) {
		datasetArgAFM = result.rows;
		var argAFM;
			// Fill up the input of SQUIDArg
			argAFM = datasetArgAFM.item(0);
			document.getElementById("titleArgModAFM_lev"+iteration).value = argAFM['title'];
			document.getElementById("detailsArgModAFM_lev"+iteration).value = argAFM['details'];
			document.getElementById("idToolArgModAFM_lev"+iteration).value = argAFM['idTool'];
			document.getElementById("delStatusArgModAFM_lev"+iteration).value = argAFM['delStatus'];
			var selectBox = document.getElementById("listToolSelect_ModAFM"+iteration);
			if(selectBox != null){
				var items = selectBox.getElementsByTagName("option");
				for (var x = 0; x < items.length; x++) { 
					if (selectBox.options[x].value == argAFM['idTool']) { 
						selectBox.options[x].selected = true; 
					} 
				}
			}
		}, onError);
		});
	}
}					
////////////////////////////////////////////////////////////
///////    INSERT ARGUMENT VALUES OF MODULE MFM           //
////////////////////////////////////////////////////////////
function argModMFM(idSample, iteration, action){
	console.log('This is the action:'+action+' MFM.');
		//Diplay the ArgModMFM form
	if(action == "showEmptyForm"){
	var TextForDiv = '<input type="hidden" id="delStatusArgModMFM_lev'+iteration+'" style="width:80px" value="0"/><table width="520px" cellspacing="0px" cellpadding="0px" border="0px solid #00000"><tr height="35px" valign="middle" align="left"><td width="120px">Title</td><td><input type="text" id="titleArgModMFM_lev'+iteration+'" style="width:98%; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/></td></tr><tr height="35px" valign="middle" align="left"><td>Tool</td><td><div id="containerListTool_ModMFM'+iteration+'" style="width:380px"></div><input type="hidden" id="idToolArgModMFM_lev'+iteration+'" value=""/></td></tr><tr height="35px" valign="middle" align="left"><td valign="top">Details</td><td><textarea id="detailsArgModMFM_lev'+iteration+'" style="width:98%; height: 80px; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"></textarea></td></tr></table>';
	listTools_form("ModMFM",iteration);
	return TextForDiv;
	}
	else if(action == "insert" || action == "update" || action == "downLevel"){
	var titleValue = document.getElementById("titleArgModMFM_lev"+iteration).value;
	var detailsValue =  document.getElementById("detailsArgModMFM_lev"+iteration).value;
	var idToolValue =  document.getElementById("idToolArgModMFM_lev"+iteration).value;
	var delStatusValue =  document.getElementById("delStatusArgModMFM_lev"+iteration).value;	
		if(action == "insert"){
			var insertSqlArg = "INSERT INTO ModMFM (idSample, ModLevel, title, details, idTool, delStatus) VALUES (?, ?, ?, ?, ?, ?)";
			db.transaction(function(tx) {
			tx.executeSql(insertSqlArg, [idSample, iteration, titleValue, detailsValue, idToolValue, delStatusValue], null, onError);
			});
		}
		else if(action == "update"){
			var updateSqlArg = "UPDATE ModMFM SET title = ?, details = ?, idTool = ?, delStatus = ? WHERE idSample = ? AND ModLevel = ?";
			db.transaction(function(tx) {
			tx.executeSql(updateSqlArg, [titleValue, detailsValue, idToolValue, delStatusValue, idSample, iteration], null, onError);
			});
		}
		else if(action == "downLevel"){
		var downlevelSqlArg = "UPDATE ModMFM SET ModLevel = ? WHERE idSample = ? AND ModLevel = ?";
		var newLevel = iteration -1;
	db.transaction(function(tx) {
		tx.executeSql(downlevelSqlArg, [newLevel, idSample, iteration], null, onError);
	});
	}
		return null;
	}
	else if(action == "edit"){
		argModMFM(idSample, iteration, "showEmptyForm");
		db.transaction(function(tx){
		var selectArgModMFMSQL = "SELECT * FROM ModMFM WHERE idSample = ? AND ModLevel = ?";
		var datasetArgMFM;
		tx.executeSql(selectArgModMFMSQL, [idSample, iteration], function(tx, result) {
		datasetArgMFM = result.rows;
		var argMFM;
			// Fill up the input of SQUIDArg
			argMFM = datasetArgMFM.item(0);
			document.getElementById("titleArgModMFM_lev"+iteration).value = argMFM['title'];
			document.getElementById("detailsArgModMFM_lev"+iteration).value = argMFM['details'];
			document.getElementById("idToolArgModMFM_lev"+iteration).value = argMFM['idTool'];
			document.getElementById("delStatusArgModMFM_lev"+iteration).value = argMFM['delStatus'];
			var selectBox = document.getElementById("listToolSelect_ModMFM"+iteration);
			if(selectBox != null){
				var items = selectBox.getElementsByTagName("option");
				for (var x = 0; x < items.length; x++) { 
					if (selectBox.options[x].value == argMFM['idTool']) { 
						selectBox.options[x].selected = true; 
					} 
				}
			}
		}, onError);
		});
	}
}
////////////////////////////////////////////////////////////
///////    INSERT ARGUMENT VALUES OF MODULE Alfa Step     //
////////////////////////////////////////////////////////////
function argModAlfaStep(idSample, iteration, action){
	console.log('This is the action:'+action+' Alfa Step.');
	//Diplay the ArgAlfaStep form
	if(action == "showEmptyForm"){
	var TextForDiv = '<input type="hidden" id="delStatusArgModAlfaStep_lev'+iteration+'" style="width:80px" value="0"/><table width="520px" cellspacing="0px" cellpadding="0px" border="0px solid #00000"><tr height="35px" valign="middle" align="left"><td width="120px">Title</td><td><input type="text" id="titleArgModAlfaStep_lev'+iteration+'" style="width:98%; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/></td></tr><tr height="35px" valign="middle" align="left"><td>Tool</td><td><div id="containerListTool_ModAlfaStep'+iteration+'" style="width:380px"></div><input type="hidden" id="idToolArgModAlfaStep_lev'+iteration+'" value=""/></td></tr><tr height="35px" valign="middle" align="left"><td valign="top">Details</td><td><textarea id="detailsArgModAlfaStep_lev'+iteration+'" style="width:98%; height: 80px; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"></textarea></td></tr></table>';
	listTools_form("ModAlfaStep",iteration);
	return TextForDiv;
	}
	else if(action == "insert" || action == "update" || action == "downLevel"){
	var titleValue = document.getElementById("titleArgModAlfaStep_lev"+iteration).value;
	var detailsValue =  document.getElementById("detailsArgModAlfaStep_lev"+iteration).value;
	var idToolValue =  document.getElementById("idToolArgModAlfaStep_lev"+iteration).value;
	var delStatusValue =  document.getElementById("delStatusArgModAlfaStep_lev"+iteration).value;	
		if(action == "insert"){
			var insertSqlArg = "INSERT INTO ModAlfaStep (idSample, ModLevel, title, details, idTool, delStatus) VALUES (?, ?, ?, ?, ?, ?)";
			db.transaction(function(tx) {
			tx.executeSql(insertSqlArg, [idSample, iteration, titleValue, detailsValue, idToolValue, delStatusValue], null, onError);
			});
		}
		else if(action == "update"){
			var updateSqlArg = "UPDATE ModAlfaStep SET title = ?, details = ?, idTool = ?, delStatus = ? WHERE idSample = ? AND ModLevel = ?";
			db.transaction(function(tx) {
			tx.executeSql(updateSqlArg, [titleValue, detailsValue, idToolValue, delStatusValue, idSample, iteration], null, onError);
			});
		}
			else if(action == "downLevel"){
		var downlevelSqlArg = "UPDATE ModAlfaStep SET ModLevel = ? WHERE idSample = ? AND ModLevel = ?";
		var newLevel = iteration -1;
	db.transaction(function(tx) {
		tx.executeSql(downlevelSqlArg, [newLevel, idSample, iteration], null, onError);
	});
	}
		return null;
	}
	else if(action == "edit"){
		argModAlfaStep(idSample, iteration, "showEmptyForm");
		db.transaction(function(tx){
		var selectArgModAlfaStepSQL = "SELECT * FROM ModAlfaStep WHERE idSample = ? AND ModLevel = ?";
		var datasetArgAlfaStep;
		tx.executeSql(selectArgModAlfaStepSQL, [idSample, iteration], function(tx, result) {
		datasetArgAlfaStep = result.rows;
		var argAlfaStep;
			// Fill up the input of SQUIDArg
			argAlfaStep = datasetArgAlfaStep.item(0);
			document.getElementById("titleArgModAlfaStep_lev"+iteration).value = argAlfaStep['title'];
			document.getElementById("detailsArgModAlfaStep_lev"+iteration).value = argAlfaStep['details'];
			document.getElementById("idToolArgModAlfaStep_lev"+iteration).value = argAlfaStep['idTool'];
			document.getElementById("delStatusArgModAlfaStep_lev"+iteration).value = argAlfaStep['delStatus'];
			var selectBox = document.getElementById("listToolSelect_ModAlfaStep"+iteration);
			if(selectBox != null){
				var items = selectBox.getElementsByTagName("option");
				for (var x = 0; x < items.length; x++) { 
					if (selectBox.options[x].value == argAlfaStep['idTool']) { 
						selectBox.options[x].selected = true; 
					} 
				}
			}
		}, onError);
		});
	}
}
////////////////////////////////////////////////////////////
///////    INSERT ARGUMENT VALUES OF MODULE Annealing     //
////////////////////////////////////////////////////////////
function argModAnnealing(idSample, iteration, action){
	console.log('This is the action:'+action+' Annealing.');
//Diplay the ArgAnnealing form
	if(action == "showEmptyForm"){
	var TextForDiv = '<input type="hidden" id="delStatusArgModAnnealing_lev'+iteration+'" style="width:80px" value="0"/><table width="520px" cellspacing="0px" cellpadding="0px" border="0px solid #00000"><tr height="35px" valign="middle" align="left"><td width="120px">Title</td><td width="400px"><input type="text" id="titleArgModAnnealing_lev'+iteration+'" style="width:98%; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/></td></tr><tr height="35px" valign="middle" align="left"><td>Tool</td><td><div id="containerListTool_ModAnnealing'+iteration+'" style="width:380px"></div><input type="hidden" id="idToolArgModAnnealing_lev'+iteration+'" value=""/></td></tr><tr height="35px" valign="middle" align="left"><td>Temperature (K)</td><td><input type="text" id="tempArgModAnnealing_lev'+iteration+'" style="width:98%; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/></tr><tr height="35px" valign="middle" align="left"><td>Duration</td><td><input type="text" id="durationArgModAnnealing_lev'+iteration+'" style="width:320px; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/> &nbsp; <input type="text" id="unitDurationArgModAnnealing_lev'+iteration+'" style="width:50px; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/></td></tr><tr height="35px" valign="middle" align="left"><td valign="top">Details</td><td><textarea id="detailsArgModAnnealing_lev'+iteration+'" style="width:98%; height: 80px; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"></textarea></td></tr></table>';
	listTools_form("ModAnnealing",iteration);
	return TextForDiv;
	}
	else if(action == "insert" || action == "update" || action == "downLevel"){
	var titleValue = document.getElementById("titleArgModAnnealing_lev"+iteration).value;
	var detailsValue =  document.getElementById("detailsArgModAnnealing_lev"+iteration).value;
	var idToolValue =  document.getElementById("idToolArgModAnnealing_lev"+iteration).value;
	var delStatusValue =  document.getElementById("delStatusArgModAnnealing_lev"+iteration).value;
	var tempValue = document.getElementById("tempArgModAnnealing_lev"+iteration).value;
	var durationValue =  document.getElementById("durationArgModAnnealing_lev"+iteration).value;
	var unitDurationValue =  document.getElementById("unitDurationArgModAnnealing_lev"+iteration).value;	
		if(action == "insert"){
			var insertSqlArg = "INSERT INTO ModAnnealing (idSample, ModLevel, title, temperature, duration, unitDuration, details, idTool, delStatus) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
			db.transaction(function(tx) {
			tx.executeSql(insertSqlArg, [idSample, iteration, titleValue, tempValue, durationValue, unitDurationValue, detailsValue, idToolValue, delStatusValue], null, onError);
			});
		}
		else if(action == "update"){
			var updateSqlArg = "UPDATE ModAnnealing SET title = ?, temp = ?, duration = ?, unitDuration = ?, details = ?, idTool = ?, delStatus = ? WHERE idSample = ? AND ModLevel = ?";
			db.transaction(function(tx) {
			tx.executeSql(updateSqlArg, [titleValue, tempValue, durationValue, unitDurationValue, detailsValue, idToolValue, delStatusValue, idSample, iteration], null, onError);
			});
		}
			else if(action == "downLevel"){
		var downlevelSqlArg = "UPDATE ModAnnealing SET ModLevel = ? WHERE idSample = ? AND ModLevel = ?";
		var newLevel = iteration -1;
	db.transaction(function(tx) {
		tx.executeSql(downlevelSqlArg, [newLevel, idSample, iteration], null, onError);
	});
	}
		return null;
	}
	else if(action == "edit"){
		argModAnnealing(idSample, iteration, "showEmptyForm");
		db.transaction(function(tx){
		var selectArgModAnnealingSQL = "SELECT * FROM ModAnnealing WHERE idSample = ? AND ModLevel = ?";
		var datasetArgAnnealing;
		tx.executeSql(selectArgModAnnealingSQL, [idSample, iteration], function(tx, result) {
		datasetArgAnnealing = result.rows;
		var argAnnealing;
			// Fill up the input of SQUIDArg
			argAnnealing = datasetArgAnnealing.item(0);
			document.getElementById("titleArgModAnnealing_lev"+iteration).value = argAnnealing['title'];
			document.getElementById("detailsArgModAnnealing_lev"+iteration).value = argAnnealing['details'];
			document.getElementById("idToolArgModAnnealing_lev"+iteration).value = argAnnealing['idTool'];
			document.getElementById("delStatusArgModAnnealing_lev"+iteration).value = argAnnealing['delStatus'];
			var selectBox = document.getElementById("listToolSelect_ModAnnealing"+iteration);
			if(selectBox != null){
				var items = selectBox.getElementsByTagName("option");
				for (var x = 0; x < items.length; x++) { 
					if (selectBox.options[x].value == argAnnealing['idTool']) { 
						selectBox.options[x].selected = true; 
					} 
				}
			}
		}, onError);
		});
	}
}
////////////////////////////////////////////////////////////
///////    INSERT ARGUMENT VALUES OF MODULE Transport     //
////////////////////////////////////////////////////////////
function argModTransport(idSample, iteration, action){
	console.log('This is the action:'+action+' Transport.');
	//Diplay the ArgTransport form
	if(action == "showEmptyForm"){
	var TextForDiv = '<input type="hidden" id="delStatusArgModTransport_lev'+iteration+'" style="width:80px" value="0"/><table width="520px" cellspacing="0px" cellpadding="0px" border="0px solid #00000"><tr height="35px" valign="middle" align="left"><td width="120px">Title</td><td width="400px"><input type="text" id="titleArgModTransport_lev'+iteration+'" style="width:98%; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"/></td></tr><tr height="35px" valign="middle" align="left"><td>Tool</td><td><div id="containerListTool_ModTransport'+iteration+'" style="width:380px"></div><input type="hidden" id="idToolArgModTransport_lev'+iteration+'" value=""/></td></tr><tr height="35px" valign="middle" align="left"><td valign="top">Details</td><td><textarea id="detailsArgModTransport_lev'+iteration+'" style="width:98%; height: 80px; background-color:#EAE9E9; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#EAE9E9\'"></textarea></td></tr></table>';
	listTools_form("ModTransport",iteration);
	return TextForDiv;
	}
	else if(action == "insert" || action == "update" || action == "downLevel"){
	var titleValue = document.getElementById("titleArgModTransport_lev"+iteration).value;
	var detailsValue =  document.getElementById("detailsArgModTransport_lev"+iteration).value;
	var idToolValue =  document.getElementById("idToolArgModTransport_lev"+iteration).value;
	var delStatusValue =  document.getElementById("delStatusArgModTransport_lev"+iteration).value;	
		if(action == "insert"){
			var insertSqlArg = "INSERT INTO ModTransport (idSample, ModLevel, title, details, idTool, delStatus) VALUES (?, ?, ?, ?, ?, ?)";
			db.transaction(function(tx) {
			tx.executeSql(insertSqlArg, [idSample, iteration, titleValue, detailsValue, idToolValue, delStatusValue], null, onError);
			});
		}
		else if(action == "update"){
			var updateSqlArg = "UPDATE ModTransport SET title = ?, details = ?, idTool = ?, delStatus = ? WHERE idSample = ? AND ModLevel = ?";
			db.transaction(function(tx) {
			tx.executeSql(updateSqlArg, [titleValue, detailsValue, idToolValue, delStatusValue, idSample, iteration], null, onError);
			});
		}
			else if(action == "downLevel"){
		var downlevelSqlArg = "UPDATE ModTransport SET ModLevel = ? WHERE idSample = ? AND ModLevel = ?";
		var newLevel = iteration -1;
	db.transaction(function(tx) {
		tx.executeSql(downlevelSqlArg, [newLevel, idSample, iteration], null, onError);
	});
	}
		return null;
	}
	else if(action == "edit"){
		argModTransport(idSample, iteration, "showEmptyForm");
		db.transaction(function(tx){
		var selectArgModTransportSQL = "SELECT * FROM ModTransport WHERE idSample = ? AND ModLevel = ?";
		var datasetArgTransport;
		tx.executeSql(selectArgModTransportSQL, [idSample, iteration], function(tx, result) {
		datasetArgTransport = result.rows;
		var argTransport;
			// Fill up the input of SQUIDArg
			argTransport = datasetArgTransport.item(0);
			document.getElementById("titleArgModTransport_lev"+iteration).value = argTransport['title'];
			document.getElementById("detailsArgModTransport_lev"+iteration).value = argTransport['details'];
			document.getElementById("idToolArgModTransport_lev"+iteration).value = argTransport['idTool'];
			document.getElementById("delStatusArgModTransport_lev"+iteration).value = argTransport['delStatus'];
			var selectBox = document.getElementById("listToolSelect_ModTransport"+iteration);
			if(selectBox != null){
				var items = selectBox.getElementsByTagName("option");
				for (var x = 0; x < items.length; x++) { 
					if (selectBox.options[x].value == argTransport['idTool']) { 
						selectBox.options[x].selected = true; 
					} 
				}
			}
		}, onError);
		});
	}
}
/////////////////////////////////////////////////////////////////
//  List of projects for the drop/down menu in Sample Arg box  //
/////////////////////////////////////////////////////////////////
function listTools_form(ModName, level){
	db.transaction(function(tx) {
		var selectAllTools = "SELECT * FROM ToolList WHERE delStatus = ? AND archiveStatus = ?";
		tx.executeSql(selectAllTools, [0, 0], function(tx, result) {
			var dataset = result.rows;
			var tool;
			var containerListTool = document.getElementById("containerListTool_"+ModName+level);
			console.log("containerListTool_"+ModName+level);
		if( containerListTool != null){
			containerListTool.innerHTML = '';
			if(dataset.length > 0){
				containerListTool.innerHTML = '<form name="listToolForm_'+ModName+level+'" id="listToolForm_'+ModName+level+'"><select name="listToolSelect_'+ModName+level+'" id="listToolSelect_'+ModName+level+'" onChange="idToolSelectValue(eval(this.selectedIndex),\''+ModName+'\',' + level + ')" style="width:150px"><option value="0">---</option></select></form>';
				var objSelect=document.forms["listToolForm_"+ModName+level].elements["listToolSelect_"+ModName+level];
				for (var i = 0, tool = null; i < dataset.length; i++) {
					tool = dataset.item(i);
					var objOption = document.createElement("option");
					eval("document.listToolForm_"+ModName+level+".listToolSelect_"+ModName+level+".options.add(objOption)");
					objOption.text = tool['toolName'];
					objOption.value = tool['id'];
				}
			//document.getElementById("approve_tool").style.display = "block";			
			}
			else{
						containerListTool.innerHTML = '';
				containerListTool.innerHTML = ' No tool available. Go <a href="tools.html">here</a> to create a project.';
				//document.getElementById("approve_tool").style.display = "none";
			}
			}
		});
	});
}

function idToolSelectValue(index,moduleName,level){
	console.log('index = '+index+', moduleName = '+moduleName + ' and level='+level);
	console.log('idToolArg'+moduleName+'_lev'+level);
	document.getElementById("idToolArg"+moduleName+"_lev"+level).value = index;
}