//Object = Sample, Template
//argMod(idObjectValue, iteration, action, object, levelInSample)
//idObjectValue = idSample or idProject
// action = insert, update, showEmptyForm, delete
// levelInSLL: this is required when adding a template to a sample, solve the bug when one wants to keep the values of the parameters in the Mod of the template, but the level it is now in in the sample is different than the final level they'll be added to. When levelInSLL == iteration, the Mod has the same level in the sample it is integrated to than the level it had in the Template it comes from.

function argModSubstrate(idObjectValue,iteration,action,object,levelInSLL){
		if(object == "sample"){
			var thisTableName = "ModSubstrate";
			var idObjectName = "idSample";
		}
		else{
			var thisTableName = "ModTempSubstrate";
			var idObjectName = "idTemplate";
		}
	//Diplay the ArgModSubstrate form
	if(action == "showEmptyForm"){
	var TextForDiv = '<input type="hidden" id="delStatusArgModSubstrate_lev'+iteration+'" style="width:80px"/><table width="520px" cellspacing="0px" cellpadding="0px" border="0px" align="center" style="margin-bottom:10px; margin-top:10px;"><tr height="35px" valign="middle" align="left"><td width="520px" colspan="4" align="left"><input type="text" id="titleArgModSubstrate_lev'+iteration+'" style="font-size: 11px; width:520px; background-color:#D3D8DC; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border-bottom: 1px solid #D4D4D4; border-left: 0px solid #D4D4D4; border-right:0px solid #D4D4D4; border-top: 0px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#FFFFFF\'" onMouseOut="this.style.backgroundColor=\'#D3D8DC\'" value="Give it a title..."/></td></tr><tr valign="middle" align="left" height="45px"><td width="190px">Material<br><input type="text" id="materialArgModSubstrate_lev'+iteration+'" style="font-size: 11px; width:80px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#FFFFFF\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/></td><td width="190px">Thickness (nm)<br><input type="text" id="thicknessArgModSubstrate_lev'+iteration+'" style="font-size:11px; width:100px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#FFFFFF\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/></td><td width="140px" valign="middle">Resistivity (&mu;&Omega;.cm)<br><input type="text" id="resistivityArgModSubstrate_lev'+iteration+'" style="font-size: 11px; width:105px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#FFFFFF\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/</td></tr><tr valign="middle" align="left" height="45px"><td width="190px" valign="middle"> Size (in) <br><input type="text" id="sizeArgModSubstrate_lev'+iteration+'" style="font-size: 11px; width:80px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#FFFFFF\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/></td><td width="330px" colspan="2">BatchNumber<br><input type="text" id="batchNumberArgModSubstrate_lev'+iteration+'" style="font-size: 11px; width:100px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#FFFFFF\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/></td></tr><tr align="left" valign="middle"><td width="520px" align="left" valign="middle" colspan="3">More Info<br><textarea style="font-size: 11px; width:520px; height: 50px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;"  onMouseOver="this.style.backgroundColor=\'#FFFFFF\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'" id="detailsArgModSubstrate_lev'+iteration+'"> </textarea></td></tr></table>';
	return TextForDiv;
	}
	else if(action == "insert" || action == "update" || action == "downLevel"){
	var titleValue = document.getElementById("titleArgModSubstrate_lev"+iteration).value;
	var materialValue =  document.getElementById("materialArgModSubstrate_lev"+iteration).value;
	var thicknessValue = document.getElementById("thicknessArgModSubstrate_lev"+iteration).value;
	var detailsValue =  document.getElementById("detailsArgModSubstrate_lev"+iteration).value;
	var batchNumberValue =  document.getElementById("batchNumberArgModSubstrate_lev"+iteration).value;
	var sizeValue =  document.getElementById("sizeArgModSubstrate_lev"+iteration).value;
	var resistivityValue = document.getElementById("resistivityArgModSubstrate_lev"+iteration).value;
	var delStatusValue =  document.getElementById("delStatusArgModSubstrate_lev"+iteration).value;
	if(action == "insert"){
		var delStatusValue = 0;
		var insertSqlArg = "INSERT INTO "+thisTableName+" ("+idObjectName+", ModLevel, title, material, thickness, details, batchNumber, size, resistivity, delStatus) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
		db.transaction(function(tx) {
			tx.executeSql(insertSqlArg, [idObjectValue, iteration, titleValue, materialValue, thicknessValue, detailsValue, batchNumberValue, sizeValue, resistivityValue, delStatusValue], null, onError);
		});
	}
	else if(action ==  "update"){
		var updateSqlArg = "UPDATE "+thisTableName+" SET title = ?, material = ?, thickness = ?, details = ?, batchNumber = ?, size = ?, resistivity = ?, delStatus = ? WHERE "+idObjectName+" = ? AND ModLevel = ?";
	db.transaction(function(tx) {
	tx.executeSql(updateSqlArg, [titleValue,  materialValue, thicknessValue, detailsValue, batchNumberValue, sizeValue, resistivityValue,  delStatusValue, idObjectValue, iteration], null, onError);		
    });
	}
	else if(action == "downLevel"){
		var downlevelSqlArg = "UPDATE "+thisTableName+" SET ModLevel = ? WHERE "+idObjectName+" = ? AND ModLevel = ?";
		var newLevel = iteration -1;
	db.transaction(function(tx) {
		tx.executeSql(downlevelSqlArg, [newLevel, idObjectValue, iteration], null, onError);
	});
	}
	return null;
	}
	else if(action == "edit"){
		argModSubstrate(idObjectValue, levelInSLL, "showEmptyForm",object, levelInSLL);
		db.transaction(function(tx){
		var selectArgModSubSQL = "SELECT * FROM "+thisTableName+" WHERE "+idObjectName+" = ? AND ModLevel = ? AND delStatus = ?";
		var dataset;
		tx.executeSql(selectArgModSubSQL, [idObjectValue, iteration, 0], function(tx, result) {
		dataset = result.rows;
			datasetArgSubstrate = result.rows;
			var argSubstrate;
			// Fill up the input of SampleArg
			argSubstrate = datasetArgSubstrate.item(0);
			document.getElementById("titleArgModSubstrate_lev"+levelInSLL).value = argSubstrate['title'];
			document.getElementById("materialArgModSubstrate_lev"+levelInSLL).value = argSubstrate['material'];
			document.getElementById("thicknessArgModSubstrate_lev"+levelInSLL).value = argSubstrate['thickness'];
			document.getElementById("detailsArgModSubstrate_lev"+levelInSLL).value = argSubstrate['details'];
			document.getElementById("batchNumberArgModSubstrate_lev"+levelInSLL).value = argSubstrate['batchNumber'];
			document.getElementById("sizeArgModSubstrate_lev"+levelInSLL).value = argSubstrate['size'];
			document.getElementById("resistivityArgModSubstrate_lev"+levelInSLL).value = argSubstrate['resistivity'];
			document.getElementById("delStatusArgModSubstrate_lev"+levelInSLL).value = argSubstrate['delStatus'];
		}, onError);
		});
	}
}
////////////////////////////////////////////////////////////
///////    INSERT ARGUMENT VALUES OF MODULE SINGLE LAYER  //
////////////////////////////////////////////////////////////
function argModSL(idObjectValue,iteration,action,object,levelInSLL){
	//Diplay the ArgModSL form
		if(object == "sample"){
			var thisTableName = "ModSL";
			var idObjectName = "idSample";
		}
		else{
			var thisTableName = "ModTempSL";
			var idObjectName = "idTemplate";
		}
	if(action == "showEmptyForm"){
	var TextForDiv = '<input type="hidden" id="delStatusArgModSL_lev'+iteration+'" style="width:80px" value="0"/><table width="520px" cellspacing="0px" cellpadding="0px" border="0px solid #00000" align="center" style="margin-bottom:10px; margin-top:10px;"><tr height="35px" align="left" valign="middle"><td width="520px" colspan="3"><input type="text" id="titleArgModSL_lev'+iteration+'" style="font-size: 11px; width:520px; background-color:#D3D8DC; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border-bottom: 1px solid #D4D4D4; border-left: 0px solid #D4D4D4; border-right:0px solid #D4D4D4; border-top: 0px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#FFFFFF\'" onMouseOut="this.style.backgroundColor=\'#D3D8DC\'" value="Give it a title..."/></td></tr><tr valign="middle" align="left" height="45px"><td width="140px">Material<br><input type="text" id="materialArgModSL_lev'+iteration+'" style="font-size: 11px; width:110px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#FFFFFF\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/></td><td width="270px">thickness (nm)<br><input type="text" id="thicknessArgModSL_lev'+iteration+'" style="font-size: 11px; width:50px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#FFFFFF\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/></td><td width="120px" align="left">Base Pressure (Torr)<br><input type="text" id="basePressureArgModSL_lev'+iteration+'" style="font-size: 11px; width:92px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#FFFFFF\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/></td></tr><tr height="45px" valign="middle" align="left"><td width="530px" colspan="3">Tool<br><div id="containerListTool_ModSL'+iteration+'" style="width:200px;"></div><input type="hidden" id="idToolArgModSL_lev'+iteration+'" value=""/></td></tr><tr colspan="3" valign="middle" align="left"><td width="520px" align="left" colspan="3">More Info<br><textarea style="font-size: 11px; width:520px; height: 80px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#FFFFFF\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'" id="detailsArgModSL_lev'+iteration+'"></textarea></td></tr></table>';
	listTools_form("ModSL", iteration);
	return TextForDiv;
	}
	else if(action == "insert" || action == "update" || action == "downLevel"){
		var titleValue = document.getElementById("titleArgModSL_lev"+iteration).value;
		var materialValue =  document.getElementById("materialArgModSL_lev"+iteration).value;
		var thicknessValue = document.getElementById("thicknessArgModSL_lev"+iteration).value;
		var basePressureValue =  document.getElementById("basePressureArgModSL_lev"+iteration).value;
		var detailsValue =  document.getElementById("detailsArgModSL_lev"+iteration).value;
		var idToolValue =  document.getElementById("idToolArgModSL_lev"+iteration).value;
		var delStatusValue =  document.getElementById("delStatusArgModSL_lev"+iteration).value;
		if(action == "insert"){
			var delStatusValue = 0;
			var insertSqlArg = "INSERT INTO "+thisTableName+" ("+idObjectName+", ModLevel, title, material, thickness, basePressure, details, idTool, delStatus) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
		db.transaction(function(tx) {
			tx.executeSql(insertSqlArg, [idObjectValue, iteration, titleValue, materialValue, thicknessValue, basePressureValue, detailsValue, idToolValue, delStatusValue], null, onError);
			});
		}
		else if(action == "update"){
			var updateSqlArg = "UPDATE "+thisTableName+" SET title = ?, material = ?, thickness = ?, basePressure = ?, details = ?, idTool = ?, delStatus = ? WHERE "+idObjectName+" = ? AND ModLevel = ?";
			db.transaction(function(tx) {
			tx.executeSql(updateSqlArg, [titleValue,  materialValue, thicknessValue, basePressureValue, detailsValue, idToolValue, delStatusValue, idObjectValue, iteration], null, onError);
    });
	}
	else if(action == "downLevel"){
		var downlevelSqlArg = "UPDATE "+thisTableName+" SET ModLevel = ? WHERE "+idObjectName+" = ? AND ModLevel = ?";
		var newLevel = iteration -1;
	db.transaction(function(tx) {
		tx.executeSql(downlevelSqlArg, [newLevel, idObjectValue, iteration], null, onError);
	});
	}
	return null;
	}
	else if(action == "edit"){
		argModSL(idObjectValue, levelInSLL, "showEmptyForm", object, levelInSLL);
		db.transaction(function(tx){
		var selectArgModSLSQL = "SELECT * FROM "+thisTableName+" WHERE "+idObjectName+" = ? AND ModLevel = ? AND delStatus = ?";
		var datasetArgSL;
		tx.executeSql(selectArgModSLSQL, [idObjectValue, iteration, 0], function(tx, result) {
		datasetArgSL = result.rows;
		var argSL;
			// Fill up the input of SampleArg
			argSL = datasetArgSL.item(0);
			document.getElementById("titleArgModSL_lev"+levelInSLL).value = argSL['title'];
			document.getElementById("materialArgModSL_lev"+levelInSLL).value = argSL['material'];
			document.getElementById("thicknessArgModSL_lev"+levelInSLL).value = argSL['thickness'];
			document.getElementById("basePressureArgModSL_lev"+levelInSLL).value = argSL['basePressure'];
			document.getElementById("detailsArgModSL_lev"+levelInSLL).value = argSL['details'];
			document.getElementById("idToolArgModSL_lev"+levelInSLL).value = argSL['idTool'];
			document.getElementById("delStatusArgModSL_lev"+levelInSLL).value = argSL['delStatus'];
			var selectBox = document.getElementById("listToolSelect_ModSL"+levelInSLL);
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
function createMLView(level){
	 var material1 = document.getElementById("material1ArgModML_lev"+level).value;
	 var material2 = document.getElementById("material2ArgModML_lev"+level).value;
	 var thickness1 = document.getElementById("thickness1ArgModML_lev"+level).value;
	 var thickness2 = document.getElementById("thickness2ArgModML_lev"+level).value;
	 var repeat = document.getElementById("repeatArgModML_lev"+level).value;
	 var divML = document.getElementById("ViewML"+level);
	 divML.innerHTML = '<font color="0000FF"><b>Compact View:</b> ['+thickness1+'nm '+material1+' / '+thickness2+'nm '+material2+']x'+repeat+'</font>';
}
function argModML(idObjectValue,iteration,action,object,levelInSLL){
	console.log('This is the action:'+action+' ML.');
		if(object == "sample"){
			var thisTableName = "ModML";
			var idObjectName = "idSample";
		}
		else{
			var thisTableName = "ModTempML";
			var idObjectName = "idTemplate";
		}
	//Diplay the ArgModML form
	if(action == "showEmptyForm"){
		var TextForDiv = '<input type="hidden" id="delStatusArgModML_lev'+iteration+'" style="width:80px" value="0"/><table width="520px" cellspacing="0px" cellpadding="0px" border="0px" align="center" style="margin-bottom:10px; margin-top:10px;"><tr height="35px" valign="middle" align="left"><td width="520px" colspan="5" align="left"><input type="text" id="titleArgModML_lev'+iteration+'" style="font-size: 11px; width:520px; background-color:#D3D8DC; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border-bottom: 1px solid #D4D4D4; border-left: 0px solid #D4D4D4; border-right:0px solid #D4D4D4; border-top: 0px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#FFFFFF\'" onMouseOut="this.style.backgroundColor=\'#D3D8DC\'" value="Give it a title..."/></td></tr><tr valign="middle" align="left" height="45px"><td width="115px" align="left">Material_1 <br><input type="text" id="material1ArgModML_lev'+iteration+'" style="font-size:11px; width:100px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#FFFFFF\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'" onkeyup="createMLView('+iteration+');"/></td><td width="100px" align="left"><i>t</i>_1<br><input type="text" id="thickness1ArgModML_lev'+iteration+'" style="font-size: 11px; width:30px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#FFFFFF\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'" onkeyup="createMLView('+iteration+');"/></td><td width="115px" align="left">Material_2<br><input type="text" id="material2ArgModML_lev'+iteration+'" style="font-size:11px; width:100px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#FFFFFF\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'" onkeyup="createMLView('+iteration+');"/></td><td width="100px" align="left"><i>t</i>_2<br><input type="text" id="thickness2ArgModML_lev'+iteration+'" style="font-size: 11px; width:30px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#FFFFFF\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'" onkeyup="createMLView('+iteration+');"/></td><td width="90px" align="left"># repeats<br><input type="text" id="repeatArgModML_lev'+iteration+'" style="font-size: 11px; width:60px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#FFFFFF\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'" onkeyup="createMLView('+iteration+');"/></td></tr><tr valign="middle" align="left" height="35px"><td colspan="5" width="520px" align="left" style="padding-left:10px;"><div id="ViewML'+iteration+'" style="height:20px; width:490px; margin: 0px 15px 0px 0px;"></div></td></tr><tr valign="middle" align="left" height="45px"><td width="215px" valign="middle" align="left" colspan="2">Base Pressure (Torr)<br><input type="text" id="basePressureArgModML_lev'+iteration+'" style="font-size: 11px; width:100px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#FFFFFF\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'" onkeyup="createMLView('+iteration+');"/></td><td width="115px"></td><td width="190px" colspan="2" valign="middle" align="left">Tool<br><div id="containerListTool_ModML'+iteration+'" style="width:150px"></div><input type="hidden" id="idToolArgModML_lev'+iteration+'" value=""/></td></tr><tr valign="middle" align="left"><td valign="middle" width="540px" colspan="5">More Info<br><textarea style="font-size: 11px; width:522px; height: 50px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;"  onMouseOver="this.style.backgroundColor=\'#FFFFFF\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'" id="detailsArgModML_lev'+iteration+'"> </textarea></td></tr></table>';
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
	var basePressureValue =  document.getElementById("basePressureArgModML_lev"+iteration).value;
	var detailsValue =  document.getElementById("detailsArgModML_lev"+iteration).value;
	var idToolValue =  document.getElementById("idToolArgModML_lev"+iteration).value;
	var delStatusValue =  document.getElementById("delStatusArgModML_lev"+iteration).value;	
		if(action == "insert"){
			var delStatus = 0;
			var insertSqlArg = "INSERT INTO "+thisTableName+" ("+idObjectName+", ModLevel, title, details, material1, thickness1, material2, thickness2, repeat, basePressure, idTool, delStatus) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
		db.transaction(function(tx) {
			tx.executeSql(insertSqlArg, [idObjectValue, iteration, titleValue, detailsValue, material1Value, thickness1Value, material2Value, thickness2Value, repeatValue, basePressureValue,  idToolValue, delStatusValue], null, onError);
		});
		}
		else if(action == "update"){
			var updateSqlArg = "UPDATE "+thisTableName+" SET title = ?, material1 = ?, thickness1 = ?, material2 = ?, thickness2 = ?, repeat = ?, basePressure = ?, details = ?, idTool = ?, delStatus = ? WHERE "+idObjectName+" = ? AND ModLevel = ?";
			db.transaction(function(tx) {
			tx.executeSql(updateSqlArg, [titleValue,  material1Value, thickness1Value, material2Value, thickness2Value, repeatValue, basePressureValue, detailsValue, idToolValue, delStatusValue, idObjectValue, iteration], null, onError);
			});
		}
		else if(action == "downLevel"){
		var downlevelSqlArg = "UPDATE "+thisTableName+" SET ModLevel = ? WHERE "+idObjectName+" = ? AND ModLevel = ?";
		var newLevel = iteration -1;
	db.transaction(function(tx){
		tx.executeSql(downlevelSqlArg, [newLevel, idObjectValue, iteration], null, onError);
	});
	}
		return null;
	}
	else if(action == "edit"){
		argModML(idObjectValue, levelInSLL, "showEmptyForm", object, levelInSLL);
		db.transaction(function(tx){
		var selectArgModMLSQL = "SELECT * FROM "+thisTableName+" WHERE "+idObjectName+" = ? AND ModLevel = ?";
		var datasetArgML;
		tx.executeSql(selectArgModMLSQL, [idObjectValue, iteration], function(tx, result) {
		datasetArgML = result.rows;
		var argML;
			// Fill up the input of SampleArg
			argML = datasetArgML.item(0);	
			document.getElementById("titleArgModML_lev"+levelInSLL).value = argML['title'];
			document.getElementById("material1ArgModML_lev"+levelInSLL).value = argML['material1'];
			document.getElementById("thickness1ArgModML_lev"+levelInSLL).value = argML['thickness1'];
			document.getElementById("material2ArgModML_lev"+levelInSLL).value = argML['material2'];
			document.getElementById("thickness2ArgModML_lev"+levelInSLL).value = argML['thickness2'];
			document.getElementById("repeatArgModML_lev"+levelInSLL).value = argML['repeat'];
			document.getElementById("basePressureArgModML_lev"+levelInSLL).value = argML['basePressure'];
			document.getElementById("detailsArgModML_lev"+levelInSLL).value = argML['details'];
			document.getElementById("idToolArgModML_lev"+levelInSLL).value = argML['idTool'];
			document.getElementById("delStatusArgModML_lev"+levelInSLL).value = argML['delStatus'];
			var selectBox = document.getElementById("listToolSelect_ModML"+levelInSLL);
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
function argModSpinCoat(idObjectValue, iteration, action, object, levelInSLL){
	console.log('This is the action:'+action+' Spin Coating.');
	if(object == "sample"){
			var thisTableName = "ModSpinCoat";
			var idObjectName = "idSample";
		}
	else{
			var thisTableName = "ModTempSpinCoat";
			var idObjectName = "idTemplate";
		}
	//Diplay the ArgModSpinCoat form
	if(action == "showEmptyForm"){
	var TextForDiv = '<input type="hidden" id="delStatusArgModSpinCoat_lev'+iteration+'" style="width:80px" value="0"/><table width="530px" cellspacing="0px" cellpadding="0px" border="0px" align="center" style="margin-bottom:10px; margin-top:10px;"><tr height="35px" valign="middle" align="left"><td width="530px" colspan="3" align="left"><input type="text" id="titleArgModSpinCoat_lev'+iteration+'" style="font-size: 11px; width:520px; background-color:#D3D8DC; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border-bottom: 1px solid #D4D4D4; border-left: 0px solid #D4D4D4; border-right:0px solid #D4D4D4; border-top: 0px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#FFFFFF\'" onMouseOut="this.style.backgroundColor=\'#D3D8DC\'" value="Give it a title..."/></td></tr><tr valign="middle" align="left"><td width="200px" align="left" style="padding-top:5px">Name of Resist<br><input type="text" id="resistNameArgModSpinCoat_lev'+iteration+'" style="font-size:11px; width:100px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#FFFFFF\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/> </td><td width="230px" align="left" style="padding-top:5px">Composition of Resist<br><input type="text" id="compoResistArgModSpinCoat_lev'+iteration+'" style="font-size:11px; width:180px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#FFFFFF\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/></td><td width="100px" align="left" style="padding-top:5px">thickness (nm)<br><input type="text" id="resistThickArgModSpinCoat_lev'+iteration+'" style="font-size:11px; width:60px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#FFFFFF\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/></td></tr><tr valign="middle" align="left" ><td width="200px" align="left" style="padding-top:5px">Rotation speed (rpm)<br><input type="text" id="speedArgModSpinCoat_lev'+iteration+'" style="font-size:11px; width:100px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#FFFFFF\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/></td><td width="230px" align="left" style="padding-top:5px">Acceleration (rpm^2)<br><input type="text" id="accelerationArgModSpinCoat_lev'+iteration+'" style="font-size:11px; width:100px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#FFFFFF\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/></td><td width="100px" align="left" style="padding-top:5px">Spin Duration (sec)<br><input type="text" id="spinDurationArgModSpinCoat_lev'+iteration+'" style="font-size:11px; width:60px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#FFFFFF\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/></td></tr><tr><td width="530px" colspan="3" style="padding-top:5px">Tool<br><div id="containerListTool_ModSpinCoat'+iteration+'" style="width:490px"></div><input type="hidden" id="idToolArgModSpinCoat_lev'+iteration+'" value=""/></td></tr><tr valign="middle" align="left" ><td width="200px" align="left" style="padding-top:5px">Baking Temperature (<sup>o</sup>C)<br><input type="text" id="bakeTempArgModSpinCoat_lev'+iteration+'" style="font-size:11px; width:100px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#FFFFFF\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/></td><td width="340px" align="left" style="padding-top:5px" colspan="2">Baking duration (sec)<br><input type="text" id="bakeDurationArgModSpinCoat_lev'+iteration+'" style="font-size:11px; width:60px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#FFFFFF\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/></td></tr><tr valign="middle" align="left" ><td width="200px" align="left" style="padding-top:5px">Developer Name <br><input type="text" id="developerArgModSpinCoat_lev'+iteration+'" style="font-size:11px; width:100px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#FFFFFF\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/></td><td width="330px" align="left" style="padding-top:5px" colspan="2">Developing Time (sec)<br><input type="text" id="developTimeArgModSpinCoat_lev'+iteration+'" style="font-size:11px; width:60px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#FFFFFF\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/></td></tr><tr valign="middle" align="left"><td valign="middle" width="530px" style="padding-top:5px" colspan="3">More Info<br><textarea style="width:530px; height: 70px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#FFFFFF\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'" id="detailsArgModSpinCoat_lev'+iteration+'"></textarea></td></tr></table>';
	listTools_form("ModSpinCoat",iteration);
	return TextForDiv;
	}
	else if(action == "insert" || action == "update" || action == "downLevel"){
	var titleValue = document.getElementById("titleArgModSpinCoat_lev"+iteration).value;
	var detailsValue =  document.getElementById("detailsArgModSpinCoat_lev"+iteration).value;
	var resistNameValue = document.getElementById("resistNameArgModSpinCoat_lev"+iteration).value;
	var compoResistValue =  document.getElementById("compoResistArgModSpinCoat_lev"+iteration).value;
	var resistThickValue = document.getElementById("resistThickArgModSpinCoat_lev"+iteration).value;
	var speedValue = document.getElementById("speedArgModSpinCoat_lev"+iteration).value;
	var accelerationValue =  document.getElementById("accelerationArgModSpinCoat_lev"+iteration).value;
	var spinDurationValue = document.getElementById("spinDurationArgModSpinCoat_lev"+iteration).value;
	var bakeTempValue =  document.getElementById("bakeTempArgModSpinCoat_lev"+iteration).value;
	var bakeDurationValue = document.getElementById("bakeDurationArgModSpinCoat_lev"+iteration).value;
	var developerValue =  document.getElementById("developerArgModSpinCoat_lev"+iteration).value;
	var developTimeValue = document.getElementById("developTimeArgModSpinCoat_lev"+iteration).value;
	var detailsValue =  document.getElementById("detailsArgModSpinCoat_lev"+iteration).value;
	var idToolValue =  document.getElementById("idToolArgModSpinCoat_lev"+iteration).value;
	var delStatusValue =  document.getElementById("delStatusArgModSpinCoat_lev"+iteration).value;
		if(action == "insert"){
			var insertSqlArg = "INSERT INTO "+thisTableName+" ("+idObjectName+", ModLevel, title, resistName, resistComposition, resistThickness, speed, acceleration, spinDuration, bakingTemp, bakingDuration, developerName, developTime, details, idTool, delStatus) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
			db.transaction(function(tx) {
			tx.executeSql(insertSqlArg, [idObjectValue, iteration, titleValue, resistNameValue, compoResistValue, resistThickValue,    speedValue, accelerationValue, spinDurationValue, bakeTempValue, bakeDurationValue, developerValue, developTimeValue, detailsValue, idToolValue, delStatusValue], null, onError);
			});
		}
		else if(action == "update"){
			var updateSqlArg = "UPDATE "+thisTableName+" SET title = ?, resistName = ?, resistComposition = ?, resistThickness = ?, speed = ?, acceleration = ?, spinDuration = ?, bakingTemp = ?, bakingDuration = ?, developerName = ?, developTime = ?, details = ?, idTool = ?, delStatus = ? WHERE "+idObjectName+" = ? AND ModLevel = ?";
			db.transaction(function(tx) {
			tx.executeSql(updateSqlArg, [titleValue, resistNameValue, compoResistValue, resistThickValue, speedValue, accelerationValue, spinDurationValue, bakeTempValue, bakeDurationValue, developerValue, developTimeValue, detailsValue, idToolValue, delStatusValue, idObjectValue, iteration], null, onError);
			});
		}
		else if(action == "downLevel"){
		var downlevelSqlArg = "UPDATE "+thisTableName+" SET ModLevel = ? WHERE "+idObjectName+" = ? AND ModLevel = ?";
		var newLevel = iteration -1;
	db.transaction(function(tx) {
		tx.executeSql(downlevelSqlArg, [newLevel, idObjectValue, iteration], null, onError);
	});
	}
		return null;
	}
	else if(action == "edit"){
		argModSpinCoat(idObjectValue, levelInSLL, "showEmptyForm", object, levelInSLL);
		db.transaction(function(tx){
		var selectArgModSpinCoatSQL = "SELECT * FROM "+thisTableName+" WHERE "+idObjectName+" = ? AND ModLevel = ?";
		var datasetArgSpinCoat;
		tx.executeSql(selectArgModSpinCoatSQL, [idObjectValue, iteration], function(tx, result) {
		datasetArgSpinCoat = result.rows;
		var argSpinCoat;
			// Fill up the input of SampleArg
			argSpinCoat = datasetArgSpinCoat.item(0);
			document.getElementById("titleArgModSpinCoat_lev"+levelInSLL).value = argSpinCoat['title'];
			document.getElementById("idToolArgModSpinCoat_lev"+levelInSLL).value = argSpinCoat['idTool'];
			document.getElementById("detailsArgModSpinCoat_lev"+levelInSLL).value = argSpinCoat['details'];
			document.getElementById("delStatusArgModSpinCoat_lev"+levelInSLL).value = argSpinCoat['delStatus'];
			document.getElementById("resistNameArgModSpinCoat_lev"+levelInSLL).value =  argSpinCoat['resistName'];
			document.getElementById("compoResistArgModSpinCoat_lev"+levelInSLL).value = argSpinCoat['resistComposition'];
			document.getElementById("resistThickArgModSpinCoat_lev"+levelInSLL).value = argSpinCoat['resistThickness'];
			document.getElementById("speedArgModSpinCoat_lev"+levelInSLL).value = argSpinCoat['speed'];
			document.getElementById("accelerationArgModSpinCoat_lev"+levelInSLL).value = argSpinCoat['acceleration'];
			document.getElementById("spinDurationArgModSpinCoat_lev"+levelInSLL).value = argSpinCoat['spinDuration'];
			document.getElementById("bakeTempArgModSpinCoat_lev"+levelInSLL).value = argSpinCoat['bakingTemp'];
			document.getElementById("bakeDurationArgModSpinCoat_lev"+levelInSLL).value = argSpinCoat['bakingDuration'];
			document.getElementById("developerArgModSpinCoat_lev"+levelInSLL).value = argSpinCoat['developerName'];
			document.getElementById("developTimeArgModSpinCoat_lev"+levelInSLL).value = argSpinCoat['developTime'];
			var selectBox = document.getElementById("listToolSelect_ModSpinCoat"+levelInSLL);
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
function argModStepper(idObjectValue, iteration, action, object, levelInSLL){
	console.log('This is the action:'+action+' Stepper.');
		if(object == "sample"){
			var thisTableName = "ModStepper";
			var idObjectName = "idSample";
		}
		else{
			var thisTableName = "ModTempStepper";
			var idObjectName = "idTemplate";
		}
	//Diplay the ArgModStepper form
	if(action == "showEmptyForm"){
	var TextForDiv = '<input type="hidden" id="delStatusArgModStepper_lev'+iteration+'" style="width:80px" value="0"/><table width="520px" cellspacing="0px" cellpadding="0px" border="0px solid #00000" style="margin-top:10px; margin-bottom:10px;"><tr height="35px" valign="middle" align="left"><td width="520px" colspan="2"><input type="text" id="titleArgModStepper_lev'+iteration+'" style="font-size:11px; width:520px; background-color:#D3D8DC; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#FFFFFF\'" onMouseOut="this.style.backgroundColor=\'#D3D8DC\'" value="Give it a Title..."/></td></tr><tr height="45px" valign="middle" align="left"><td width="260px">Tool<br><div id="containerListTool_ModStepper'+iteration+'" style="width:240px"></div><input type="hidden" id="idToolArgModStepper_lev'+iteration+'" value=""/></td><td width="260px">Exposure Time (sec)<br><input type="text" id="expTimeArgModStepper_lev'+iteration+'" style="font-size:11px; width:100px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#FFFFFF\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/></td></tr><tr valign="middle" align="left"><td valign="middle" colspan="2">Details<br><textarea style="width:520px; height:80px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'" id="detailsArgModStepper_lev'+iteration+'"></textarea></td></tr></table>'; 
	listTools_form("ModStepper",iteration);
	return TextForDiv;
	}

	else if(action == "insert" || action == "update" || action == "downLevel"){
	var titleValue = document.getElementById("titleArgModStepper_lev"+iteration).value;
	var detailsValue =  document.getElementById("detailsArgModStepper_lev"+iteration).value;
	var expTimeValue =  document.getElementById("expTimeArgModStepper_lev"+iteration).value;
	var idToolValue =  document.getElementById("idToolArgModStepper_lev"+iteration).value;
	var delStatusValue =  document.getElementById("delStatusArgModStepper_lev"+iteration).value;	
		if(action == "insert"){
			var insertSqlArg = "INSERT INTO "+thisTableName+" ("+idObjectName+", ModLevel, title, expTime, details, idTool, delStatus) VALUES (?, ?, ?, ?, ?, ?, ?)";
			db.transaction(function(tx) {
			tx.executeSql(insertSqlArg, [idObjectValue, iteration, titleValue, expTimeValue, detailsValue, idToolValue, delStatusValue], null, onError);
			});
		}
		else if(action == "update"){
			var updateSqlArg = "UPDATE "+thisTableName+" SET title = ?, details = ?, expTime = ?, idTool = ?, delStatus = ? WHERE "+idObjectName+" = ? AND ModLevel = ?";
			db.transaction(function(tx) {
			tx.executeSql(updateSqlArg, [titleValue, detailsValue, expTimeValue, idToolValue, delStatusValue, idObjectValue, iteration], null, onError);
		});
		}
		else if(action == "downLevel"){
		var downlevelSqlArg = "UPDATE "+thisTableName+" SET ModLevel = ? WHERE "+idObjectName+" = ? AND ModLevel = ?";
		var newLevel = iteration -1;
	db.transaction(function(tx) {
		tx.executeSql(downlevelSqlArg, [newLevel, idObjectValue, iteration], null, onError);
	});
	}
		return null;
	}
	else if(action == "edit"){
		argModStepper(idObjectValue, levelInSLL, "showEmptyForm", object, levelInSLL);
		db.transaction(function(tx){
		var selectArgModStepperSQL = "SELECT * FROM "+thisTableName+" WHERE "+idObjectName+" = ? AND ModLevel = ?";
		var datasetArgStepper;
		tx.executeSql(selectArgModStepperSQL, [idObjectValue, iteration], function(tx, result) {
		datasetArgStepper = result.rows;
		var argStepper;
			// Fill up the input of SampleArg
			argStepper = datasetArgStepper.item(0);		
			document.getElementById("titleArgModStepper_lev"+levelInSLL).value = argStepper['title'];
			document.getElementById("idToolArgModStepper_lev"+levelInSLL).value = argStepper['idTool'];
			document.getElementById("expTimeArgModStepper_lev"+levelInSLL).value = argStepper['expTime'];
			document.getElementById("delStatusArgModStepper_lev"+levelInSLL).value = argStepper['delStatus'];
			document.getElementById("detailsArgModStepper_lev"+levelInSLL).value = argStepper['details'];				
			var selectBox = document.getElementById("listToolSelect_ModStepper"+levelInSLL);
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
function argModEbeamWrite(idObjectValue, iteration, action, object, levelInSLL){
	console.log('This is the action:'+action+' Ebeam Write.');
	if(object == "sample"){
		var thisTableName = "ModEbeamWrite";
		var idObjectName = "idSample";
	}
	else{
		var thisTableName = "ModTempEbeamWrite";
		var idObjectName = "idTemplate";
	}
	//Diplay the ArgModEbeamWrite form
	if(action == "showEmptyForm"){
	var TextForDiv = '<input type="hidden" id="delStatusArgModEbeamWrite_lev'+iteration+'" style="width:80px" value="0"/><table width="520px" cellspacing="0px" cellpadding="0px" border="0px solid #00000" style="margin-top:10px; margin-bottom:10px;"><tr height="35px" valign="middle" align="left"><td width="520px"><input type="text" id="titleArgModEbeamWrite_lev'+iteration+'" style="font-size:11px; width:520px; background-color:#D3D8DC; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#FFFFFF\'" onMouseOut="this.style.backgroundColor=\'#D3D8DC\'" value="Give it a title...."/></td></tr><tr height="45px" align="left" valign="middle"><td width="520px">Tool<br><div id="containerListTool_ModEbeamWrite'+iteration+'" style="width:200px"></div><input type="hidden" id="idToolArgModEbeamWrite_lev'+iteration+'" value=""/></td></tr><tr align="left" valign="middle"><td>More Info<br><textarea style="font-size:11px; width:520px; height:80px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'" id="detailsArgModEbeamWrite_lev'+iteration+'"></textarea></td></tr></table>';
	listTools_form("ModEbeamWrite",iteration);
	return TextForDiv;
	}
	else if(action == "insert" || action == "update" || action == "downLevel"){
var titleValue = document.getElementById("titleArgModEbeamWrite_lev"+iteration).value;
	var detailsValue =  document.getElementById("detailsArgModEbeamWrite_lev"+iteration).value;
	var idToolValue =  document.getElementById("idToolArgModEbeamWrite_lev"+iteration).value;
	var delStatusValue =  document.getElementById("delStatusArgModEbeamWrite_lev"+iteration).value;	
		if(action == "insert"){
			var insertSqlArg = "INSERT INTO "+thisTableName+" ("+idObjectName+", ModLevel, title, details, idTool, delStatus) VALUES (?, ?, ?, ?, ?, ?)";
			db.transaction(function(tx) {
			tx.executeSql(insertSqlArg, [idObjectValue, iteration, titleValue, detailsValue, idToolValue, delStatusValue], null, onError);
			});
		}
		else if(action == "update"){
			var updateSqlArg = "UPDATE "+thisTableName+" SET title = ?, details = ?, idTool = ?, delStatus = ? WHERE "+idObjectName+" = ? AND ModLevel = ?";
			db.transaction(function(tx) {
			tx.executeSql(updateSqlArg, [titleValue, detailsValue, idToolValue, delStatusValue, idObjectValue, iteration], null, onError);
			});
		}
			else if(action == "downLevel"){
		var downlevelSqlArg = "UPDATE "+thisTableName+" SET ModLevel = ? WHERE "+idObjectName+" = ? AND ModLevel = ?";
		var newLevel = iteration -1;
	db.transaction(function(tx) {
		tx.executeSql(downlevelSqlArg, [newLevel, idObjectValue, iteration], null, onError);
	});
	}
		return null;
	}
	else if(action == "edit"){
		argModStepper(idObjectValue, levelInSLL, "showEmptyForm", object, levelInSLL);
		db.transaction(function(tx){
		var selectArgModEbeamWriteSQL = "SELECT * FROM "+thisTableName+" WHERE "+idObjectName+" = ? AND ModLevel = ?";
		var datasetArgEbeamWrite;
		tx.executeSql(selectArgModEbeamWriteSQL, [idObjectValue, iteration], function(tx, result) {
		datasetArgEbeamWrite = result.rows;
		var argEbeamWrite;
			// Fill up the input of SampleArg
			argEbeamWrite = datasetArgEbeamWrite.item(0);
			document.getElementById("titleArgModEbeamWrite_lev"+levelInSLL).value = argEbeamWrite['title'];
			document.getElementById("idToolArgModEbeamWrite_lev"+levelInSLL).value = argEbeamWrite['idTool'];
			document.getElementById("delStatusArgModEbeamWrite_lev"+levelInSLL).value = argEbeamWrite['delStatus'];
			document.getElementById("detailsArgModEbeamWrite_lev"+levelInSLL).value = argEbeamWrite['details'];			
			var selectBox = document.getElementById("listToolSelect_ModEbeamWrite"+levelInSLL);
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
function argModIonMill(idObjectValue, iteration, action, object, levelInSLL){
	console.log('This is the action:'+action+' Ion Mill.');
		if(object == "sample"){
			var thisTableName = "ModIonMill";
			var idObjectName = "idSample";
		}
		else{
			var thisTableName = "ModTempIonMill";
			var idObjectName = "idTemplate";
		}
//Diplay the ArgModIonMill form
	if(action == "showEmptyForm"){
	var TextForDiv = '<input type="hidden" id="delStatusArgModIonMill_lev'+iteration+'" style="width:80px" value="0"/><table width="520px" cellspacing="0px" cellpadding="0px" border="0px solid #00000" align="center" style="margin-bottom:10px; margin-top:10px;"><tr height="35px" valign="middle" align="center"><td width="520px" colspan="4" align="center"><input type="text" id="titleArgModIonMill_lev'+iteration+'" style="font-size:11px; width:520px; background-color:#D3D8DC; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#FFFFFF\'" value="Give it a Title..." onMouseOut="this.style.backgroundColor=\'#D3D8DC\'"/></td></tr><tr height="45px" valign="middle" align="left"><td width="130px" align="left">Base Pressure (Torr)<br><input type="text" id="basePressureArgModIonMill_lev'+iteration+'" style="font-size:11px; width:100px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/></td><td width="130px" align="left">Tilt Angle (deg)<br><input type="text" id="tiltAngleArgModIonMill_lev'+iteration+'" style="font-size: 11px; width:80px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/></td><td width="130px" align="left">Rotation speed (rpm)<br><input type="text" id="speedArgModIonMill_lev'+iteration+'" style="font-size:11px; width:80px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/></td><td width="130px" align="left">Temperature (<sup>o</sup>C)<br><input type="text" id="tempArgModIonMill_lev'+iteration+'" style="font-size:11px; width:80px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/></td></tr><tr height="45px" valign="middle" align="left"><td width="130px" align="left">Gas Name<br><input type="text" id="gasNameArgModIonMill_lev'+iteration+'" style="font-size:11px; width:100px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/></td><td width="130px" align="left">Pressure Gas (Torr)<br><input type="text" id="gasPressureArgModIonMill_lev'+iteration+'" style="font-size:11px; width:80px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/></td><td width="130px align="left"></td><td width="130px" align="left">Etching duration (sec)<br><input type="text" id="durationArgModIonMill_lev'+iteration+'" style="font-size:11px; width:80px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/></td></tr><tr valign="middle" align="left" height="45px"><td width="130px" align="left">Beam Voltage (V)<br> <input type="text" id="beamVoltageArgModIonMill_lev'+iteration+'" style="font-size:11px; width:100px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/></td><td width="130px" align="left">Beam Current (A)<input type="text" id="beamCurrentArgModIonMill_lev'+iteration+'" style="font-size:11px; width:80px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/></td><td width="130px" align="left">Suppressor Voltage (V)<br><input type="text" id="suppVoltageArgModIonMill_lev'+iteration+'" style="font-size:11px; width:80px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/></td><td width="130px" align="left">Discharge Voltage (V)<br><input type="text" id="dischVoltageArgModIonMill_lev'+iteration+'" style="font-size:11px; width:80px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/></td></tr><tr height="45px" valign="middle" align="left"><td width="260px" align="left" colspan="2">Adjustment Cathode (mA)<br><input type="text" id="adjCathodeArgModIonMill_lev'+iteration+'" style="font-size:11px; width:100px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/></td><td width="260px" align="left" colspan="2">Adjustment Neutralizer (mA)<br><input type="text" id="adjNeutralizerArgModIonMill_lev'+iteration+'" style="font-size:11px; width:80px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/></td></tr><tr height="50px" valign="middle" align="left"><td width="520px" colspan="4">Tool<br><div id="containerListTool_ModIonMill'+iteration+'" style="width:200px"></div><input type="hidden" id="idToolArgModIonMill_lev'+iteration+'" value=""/></td></tr><tr height="50px" align="left" valign="middle"><td valign="middle" colspan="4">Details<br><textarea style="font-size:11px; width:510px; height: 80px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'" id="detailsArgModIonMill_lev'+iteration+'"></textarea></td></tr></table>';
	listTools_form("ModIonMill",iteration);
	return TextForDiv;
	}
	else if(action == "insert" || action == "update" || action == "downLevel"){
var titleValue = document.getElementById("titleArgModIonMill_lev"+iteration).value;
	var tiltAngleValue = document.getElementById("tiltAngleArgModIonMill_lev"+iteration).value;
	var basePressureValue = document.getElementById("basePressureArgModIonMill_lev"+iteration).value;
	var gasNameValue = document.getElementById("gasNameArgModIonMill_lev"+iteration).value;
	var gasPressureValue = document.getElementById("gasPressureArgModIonMill_lev"+iteration).value;
	var durationValue = document.getElementById("durationArgModIonMill_lev"+iteration).value;
	var speedValue = document.getElementById("speedArgModIonMill_lev"+iteration).value;
	var beamVoltageValue = document.getElementById("beamVoltageArgModIonMill_lev"+iteration).value;
	var beamCurrentValue = document.getElementById("beamCurrentArgModIonMill_lev"+iteration).value;
	var suppVoltageValue = document.getElementById("suppVoltageArgModIonMill_lev"+iteration).value;
	var dischVoltageValue = document.getElementById("dischVoltageArgModIonMill_lev"+iteration).value;
	var adjCathodeValue = document.getElementById("suppVoltageArgModIonMill_lev"+iteration).value;
	var adjNeutralizerValue = document.getElementById("adjNeutralizerArgModIonMill_lev"+iteration).value;
	var temperatureValue = document.getElementById("tempArgModIonMill_lev"+iteration).value;
	var detailsValue =  document.getElementById("detailsArgModIonMill_lev"+iteration).value;
	var idToolValue =  document.getElementById("idToolArgModIonMill_lev"+iteration).value;
	var delStatusValue =  document.getElementById("delStatusArgModIonMill_lev"+iteration).value;
		if(action == "insert"){
			var insertSqlArg = "INSERT INTO "+thisTableName+" ("+idObjectName+", ModLevel, title, tiltAngle, basePressure, gasName, gasPressure, duration, speed, beamVoltage, beamCurrent, suppVoltage, dischVoltage, adjCathode, adjNeutralizer, temperature, details, idTool, delStatus) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
			db.transaction(function(tx) {
			tx.executeSql(insertSqlArg, [idObjectValue, iteration, titleValue, tiltAngleValue, basePressureValue, gasNameValue, gasPressureValue, durationValue, speedValue, beamVoltageValue, beamCurrentValue, suppVoltageValue, dischVoltageValue, adjCathodeValue, adjNeutralizerValue, temperatureValue, detailsValue, idToolValue, delStatusValue], null, onError);
			});
		}
		else if(action == "update"){
			var updateSqlArg = "UPDATE "+thisTableName+" SET title = ?, tiltAngle = ?, basePressure = ?, gasName = ?, gasPressure = ?, duration = ?, speed = ?, beamVoltage = ?, beamCurrent = ?, suppVoltage = ?, dischVoltage = ?, adjCathode = ?, adjNeutralizer = ?,  temperature = ?, details = ?, idTool = ?, delStatus = ? WHERE "+idObjectname+" = ? AND ModLevel = ?";
			db.transaction(function(tx) {
			tx.executeSql(updateSqlArg, [titleValue, tiltAngleValue, basePressureValue, gasNameValue, gasPressureValue, durationValue, speedValue, beamVoltageValue, beamCurrentValue, suppVoltageValue, dischVoltageValue, adjCathodeValue, adjNeutralizerValue, temperatureValue, detailsValue, idToolValue, delStatusValue, idObjectValue, iteration], null, onError);
			});
		}
		else if(action == "downLevel"){
		var downlevelSqlArg = "UPDATE "+thisTableName+" SET ModLevel = ? WHERE "+idObjectName+" = ? AND ModLevel = ?";
		var newLevel = iteration -1;
	db.transaction(function(tx) {
		tx.executeSql(downlevelSqlArg, [newLevel, idObjectValue, iteration], null, onError);
	});
	}
		return null;
	}
	else if(action == "edit"){
		argModIonMill(idObjectValue, levelInSLL, "showEmptyForm", object, levelInSLL);
		db.transaction(function(tx){
		var selectArgModIonMillSQL = "SELECT * FROM "+thisTableName+" WHERE "+idObjectName+" = ? AND ModLevel = ?";
		var datasetArgIonMill;
		tx.executeSql(selectArgModIonMillSQL, [idObjectValue, iteration], function(tx, result) {
		datasetArgIonMill = result.rows;
		var argIonMill;
			// Fill up the input of IonMillArg
			argIonMill = datasetArgIonMill.item(0);
			document.getElementById("titleArgModIonMill_lev"+levelInSLL).value = argIonMill['title'];
			document.getElementById("tiltAngleArgModIonMill_lev"+levelInSLL).value = argIonMill['tiltAngle'];
			document.getElementById("basePressureArgModIonMill_lev"+levelInSLL).value = argIonMill['basePressure'];
			document.getElementById("gasNameArgModIonMill_lev"+levelInSLL).value = argIonMill['gasName'];
			document.getElementById("speedArgModIonMill_lev"+levelInSLL).value = argIonMill['speed'];
			document.getElementById("gasPressureArgModIonMill_lev"+levelInSLL).value = argIonMill['gasPressure'];
			document.getElementById("durationArgModIonMill_lev"+levelInSLL).value = argIonMill['duration'];
			document.getElementById("beamVoltageArgModIonMill_lev"+levelInSLL).value = argIonMill['beamVoltage'];
			document.getElementById("beamCurrentArgModIonMill_lev"+levelInSLL).value = argIonMill['beamCurrent'];
			document.getElementById("suppVoltageArgModIonMill_lev"+levelInSLL).value = argIonMill['suppVoltage'];
			document.getElementById("dischVoltageArgModIonMill_lev"+levelInSLL).value = argIonMill['dischVoltage'];
			document.getElementById("adjCathodeArgModIonMill_lev"+levelInSLL).value = argIonMill['adjCathode'];
			document.getElementById("adjNeutralizerArgModIonMill_lev"+levelInSLL).value = argIonMill['adjNeutralizer'];
			document.getElementById("tempArgModIonMill_lev"+levelInSLL).value = argIonMill['temperature'];
			document.getElementById("detailsArgModIonMill_lev"+levelInSLL).value = argIonMill['details'];
			document.getElementById("idToolArgModIonMill_lev"+levelInSLL).value = argIonMill['idTool'];
			document.getElementById("delStatusArgModIonMill_lev"+levelInSLL).value = argIonMill['delStatus'];
			var selectBox = document.getElementById("listToolSelect_ModIonMill"+levelInSLL);
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
function argModRIE(idObjectValue, iteration, action, object, levelInSLL){
		console.log('This is the action:'+action+' RIE.');
		if(object == "sample"){
			var thisTableName = "ModRIE";
			var idObjectName = "idSample";
		}
		else{
			var thisTableName = "ModTempRIE";
			var idObjectName = "idTemplate";
		}
		//Diplay the ArgModRIE form
	if(action == "showEmptyForm"){
	var TextForDiv = '<input type="hidden" id="delStatusArgModRIE_lev'+iteration+'" style="width:80px" value="0"/><table width="520px" cellspacing="0px" cellpadding="0px" border="0px solid #00000" align="center" style="margin-bottom:10px; margin-top:10px;"><tr height="35px" align="left" valign="middle"><td width="520px" colspan="3"><input type="text" id="titleArgModRIE_lev'+iteration+'" style="font-size:11px; width:520px; background-color:#D3D8DC; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#FFFFFF\'" onMouseOut="this.style.backgroundColor=\'#D3D8DC\'" value="Give it a Title"/></td></tr><tr height="45px" valign="middle" align="left"><td width="173px">Base Pressure (Torr)<br><input type="text" id="basePressureArgModRIE_lev'+iteration+'" style="font-size:11px; width:150px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/></td><td width="174px" ></td><td width="173px"></td></tr><tr height="45px" valign="middle" align="left"><td width="173px">Gas Name<br> <input type="text" id="gasNameArgModRIE_lev'+iteration+'" style="font-size:11px; width:120px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/><td width="174px"> Set Pressure (Torr)<br><input type="text" id="setPressureArgModRIE_lev'+iteration+'" style="font-size: 11px; width:100px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/></td><td width="173px">Gas Flow (sccm)<br><input type="text" id="gasFlowArgModRIE_lev'+iteration+'" style="font-size: 11px; width:100px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/></td></tr><tr height="45px" valign="middle" align="left"><td width="173px">Forward Power (W)<br><input type="text" id="forwardPowerArgModRIE_lev'+iteration+'" style="font-size: 11px; width:100px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/></td><td width="174px">DC Bias (V)<br><input type="text" id="dcBiasArgModRIE_lev'+iteration+'" style="font-size:11px; width:100px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/></td><td width="173px">Duration (sec)<br><input type="text" id="durationArgModRIE_lev'+iteration+'" style="font-size: 11px; width:100px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/></td></tr><tr height="45px" valign="middle" align="left"><td width="173px">Etching Rate (nm/sec)<br><input type="text" id="etchingRateArgModRIE_lev'+iteration+'" style="font-size:11px; width:100px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/></td><td width="174px">Temperature (<sup>o</sup>C)<br><input type="text" id="tempArgModRIE_lev'+iteration+'" style="font-size:11px; width:100px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/></td><td width="173px">Tool<br><div id="containerListTool_ModRIE'+iteration+'" style="width:150px"></div><input type="hidden" id="idToolArgModRIE_lev'+iteration+'" value=""/></td></tr><tr valign="middle" align="left"><td width="520px" colspan="3">More Info<br><textarea style="font-size:11px; width:520px; height: 80px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'" id="detailsArgModRIE_lev'+iteration+'"></textarea></td></tr></table>';
	listTools_form("ModRIE",iteration);
	return TextForDiv;
	}
	else if(action == "insert" || action == "update" || action == "downLevel"){
var titleValue = document.getElementById("titleArgModRIE_lev"+iteration).value;
	var basePressureValue = document.getElementById("basePressureArgModRIE_lev"+iteration).value;
	var gasNameValue = document.getElementById("gasNameArgModRIE_lev"+iteration).value;
	var setPressureValue = document.getElementById("setPressureArgModRIE_lev"+iteration).value;
	var gasFlowValue = document.getElementById("gasFlowArgModRIE_lev"+iteration).value;
	var forwardPowerValue = document.getElementById("forwardPowerArgModRIE_lev"+iteration).value;
	var dcBiasValue = document.getElementById("dcBiasArgModRIE_lev"+iteration).value;
	var durationValue = document.getElementById("durationArgModRIE_lev"+iteration).value;	
	var etchingRateValue = document.getElementById("etchingRateArgModRIE_lev"+iteration).value;
	var tempValue = document.getElementById("tempArgModRIE_lev"+iteration).value;
	var detailsValue =  document.getElementById("detailsArgModRIE_lev"+iteration).value;
	var idToolValue =  document.getElementById("idToolArgModRIE_lev"+iteration).value;
	var delStatusValue =  document.getElementById("delStatusArgModRIE_lev"+iteration).value;
		if(action == "insert"){
			var insertSqlArg = "INSERT INTO "+thisTableName+" ("+idObjectName+", ModLevel, title, basePressure, gasName, setPressure, gasFlow, forwardPower, dcBias, duration, etchingRate, temperature, details, idTool, delStatus) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
		db.transaction(function(tx) {
			tx.executeSql(insertSqlArg, [idObjectValue, iteration, titleValue, basePressureValue, gasNameValue, setPressureValue, gasFlowValue, forwardPowerValue, dcBiasValue, durationValue, etchingRateValue, tempValue, detailsValue, idToolValue, delStatusValue], null, onError);
		});
		}
		else if(action == "update"){
			var updateSqlArg = "UPDATE "+thisTableName+" SET title = ?,  basePressure = ?, gasName = ?, setPressure = ?, gasFlow = ?, forwardPower = ?, dcBias = ?, duration = ?, etchingRate = ?, temperature = ?, details = ?, idTool = ?, delStatus = ? WHERE "+idObjectName+" = ? AND ModLevel = ?";
			db.transaction(function(tx) {
			tx.executeSql(updateSqlArg, [titleValue, basePressureValue, gasNameValue, setPressureValue, gasFlowValue, forwardPowerValue, dcBiasValue, durationValue, etchingRateValue, tempValue, detailsValue, idToolValue, delStatusValue, idObjectValue, iteration], null, onError);
			});
		}
		else if(action == "downLevel"){
		var downlevelSqlArg = "UPDATE "+thisTableName+" SET ModLevel = ? WHERE "+idObjectName+" = ? AND ModLevel = ?";
		var newLevel = iteration -1;
	db.transaction(function(tx) {
		tx.executeSql(downlevelSqlArg, [newLevel, idObjectValue, iteration], null, onError);
	});
	}
		return null;
	}
	else if(action == "edit"){
		argModRIE(idObjectValue, levelInSLL, "showEmptyForm", object, levelInSLL);
		db.transaction(function(tx){
		var selectArgModRIESQL = "SELECT * FROM "+thisTableName+" WHERE "+idObjectName+" = ? AND ModLevel = ?";
		var datasetArgRIE;
		tx.executeSql(selectArgModRIESQL, [idObjectValue, iteration], function(tx, result) {
		datasetArgRIE = result.rows;
		var argRIE;
			// Fill up the input of RIEArg
			argRIE = datasetArgRIE.item(0);
			document.getElementById("titleArgModRIE_lev"+levelInSLL).value = argRIE['title'];
			document.getElementById("basePressureArgModRIE_lev"+levelInSLL).value = argRIE['basePressure'];
			document.getElementById("gasNameArgModRIE_lev"+levelInSLL).value = argRIE['gasName'];
			document.getElementById("setPressureArgModRIE_lev"+levelInSLL).value = argRIE['setPressure'];
			document.getElementById("forwardPowerArgModRIE_lev"+levelInSLL).value = argRIE['forwardPower'];
			document.getElementById("gasFlowArgModRIE_lev"+levelInSLL).value = argRIE['gasFlow'];
			document.getElementById("dcBiasArgModRIE_lev"+levelInSLL).value = argRIE['dcBias'];
			document.getElementById("durationArgModRIE_lev"+levelInSLL).value = argRIE['duration'];
			document.getElementById("etchingRateArgModRIE_lev"+levelInSLL).value = argRIE['etchingRate'];
			document.getElementById("tempArgModRIE_lev"+levelInSLL).value = argRIE['temperature'];
			document.getElementById("detailsArgModRIE_lev"+levelInSLL).value = argRIE['details'];
			document.getElementById("idToolArgModRIE_lev"+levelInSLL).value = argRIE['idTool'];
			document.getElementById("delStatusArgModRIE_lev"+levelInSLL).value = argRIE['delStatus'];
			var selectBox = document.getElementById("listToolSelect_ModRIE"+levelInSLL);
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
function argModVSM(idObjectValue, iteration, action, object, levelInSLL){
	console.log('This is the action:'+action+' VSM.');
			if(object == "sample"){
			var thisTableName = "ModVSM";
			var idObjectName = "idSample";
		}
		else{
			var thisTableName = "ModTempVSM";
			var idObjectName = "idTemplate";
		}
		//Diplay the ArgModVSM form
	if(action == "showEmptyForm"){
var TextForDiv = '<input type="hidden" id="delStatusArgModVSM_lev'+iteration+'" style="width:80px" value="0"/><table width="520px" cellspacing="0px" cellpadding="0px" border="0px solid #00000" style="margin-top:10px;"><tr height="35px" valign="middle" align="left"><td width="520px" colspan="2"><input type="text" id="titleArgModVSM_lev'+iteration+'" style="font-size:11px; width:510px; background-color:#D3D8DC; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#FFFFFF\'" onMouseOut="this.style.backgroundColor=\'#D3D8DC\'" value="Give It a Name"/></td></tr><tr height="45px" valign="middle" align="left"><td width="520px" colspan="2">Tool<br><div id="containerListTool_ModVSM'+iteration+'" style="width:380px"></div><input type="hidden" id="idToolArgModVSM_lev'+iteration+'" value=""/></td></tr><tr height="45px" valign="middle" align="left"><td width="30px">H<sub>sat</sub></td><td width="480px"><input type="text" id="HsatArgModVSM_lev'+iteration+'" style="font-size:11px; width:100px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/> +/- <input type="text" id="errHsatArgModVSM_lev'+iteration+'" style="font-size:11px; width:100px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/><select id="selectHsat_lev'+iteration+'" onChange="unitSelectValue(this.value, unitHsatArgModVSM_lev'+iteration+');"><option value="blank">select a unit</option><option value="Gauss">Gauss</option><option value="Tesla">Tesla</option></select><input type="hidden" id="unitHsatArgModVSM_lev'+iteration+'" style="font-size:11px; width:30px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/></td></tr><tr height="45px" valign="middle" align="left"><td>H<sup>c</sup></td><td><input type="text" id="HcArgModVSM_lev'+iteration+'" style="font-size:11px; width:100px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/> +/- <input type="text" id="errHcArgModVSM_lev'+iteration+'" style="font-size:11px; width:100px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/><select id="selectHc_lev'+iteration+'" onChange="unitSelectValue(this.value, unitHcArgModVSM_lev'+iteration+');"><option value="blank">select a unit</option><option value="Gauss">Gauss</option><option value="Tesla">Tesla</option></select><input type="hidden" id="unitHcArgModVSM_lev'+iteration+'" style="width:30px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/></td></tr><tr height="45px" valign="middle" align="left"><td>M<sub>sat</sub></td><td><input type="text" id="MsatArgModVSM_lev'+iteration+'" style="font-size:11px; width:100px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/> +/- <input type="text" id="errMsatArgModVSM_lev'+iteration+'" style="font-size:11px; width:100px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/><select id="selectMsat_lev'+iteration+'" onChange="unitSelectValue(this.value, unitMsatArgModVSM_lev'+iteration+');"><option value="blank">select a unit</option><option value="emu/cm^3">emu/cm^3</option><option value="SI">SI</option></select><input type="hidden" id="unitMsatArgModVSM_lev'+iteration+'" style="width:30px; background-color:#E0E5EA; margin:0px 0px 10px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/></td></tr></table><table width="520px" cellspacing="0px" cellpadding="0px" border="0px solid #00000" style="margin-bottom:10px;"><tr height="45px" align="left" valign="middle"><td width="260px">Temperature (K)<br><input type="text" id="temperatureArgModVSM_lev'+iteration+'" style="font-size:11px; width:100px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/></td><td width="260px">Field direction (degree)<br><input type="text" id="fldDirArgModVSM_lev'+iteration+'" style="font-size:11px; width:100px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/></td></tr><tr valign="middle" align="left"><td width="520px" colspan="2">More Info<br><textarea style="width:98%; height: 80px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'" id="detailsArgModVSM_lev'+iteration+'"></textarea></td></tr></table>';
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
			var insertSqlArg = "INSERT INTO "+thisTableName+" ("+idObjectName+", ModLevel, title, Hc, unitHc, errHc, Hsat, unitHsat, errHsat, Msat, unitMsat, errMsat, temperature, fldDir, details, idTool, delStatus) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
		db.transaction(function(tx) {
			tx.executeSql(insertSqlArg, [idObjectValue, iteration, titleValue, HcValue, unitHcValue, errHcValue, HsatValue, unitHsatValue, errHsatValue, MsatValue, unitMsatValue, errMsatValue, temperatureValue, fldDirValue, detailsValue, idToolValue, delStatusValue], null, onError);
			});
		}
		else if(action == "update"){
			var updateSqlArg = "UPDATE "+thisTableName+" SET title = ?, Hc = ?, unitHc = ?, errHc = ?, Hsat = ?, unitHsat = ?, errHsat = ?, Msat = ?, unitMsat = ?, errMsat = ?, temperature = ?, fldDir = ?, details = ?, idTool = ?, delStatus = ? WHERE "+idObjectName+" = ? AND ModLevel = ?";
			db.transaction(function(tx) {
			tx.executeSql(updateSqlArg, [titleValue, HcValue, unitHcValue, errHcValue, HsatValue, unitHsatValue, errHsatValue, MsatValue, unitMsatValue, errMsatValue, temperatureValue, fldDirValue, detailsValue, idToolValue, delStatusValue, idObjectValue, iteration], null, onError);
			});
		}
		else if(action == "downLevel"){
		var downlevelSqlArg = "UPDATE "+thisTableName+" SET ModLevel = ? WHERE "+idObjectName+" = ? AND ModLevel = ?";
		var newLevel = iteration -1;
	db.transaction(function(tx) {
		tx.executeSql(downlevelSqlArg, [newLevel, idObjectValue, iteration], null, onError);
	});
	}
	else if(action == "downLevel"){
		var downlevelSqlArg = "UPDATE "+thisTableName+" SET ModLevel = ? WHERE "+idObjectName+" = ? AND ModLevel = ?";
		var newLevel = iteration -1;
	db.transaction(function(tx) {
		tx.executeSql(downlevelSqlArg, [newLevel, idObjectValue, iteration], null, onError);
	});
	}
		return null;
	}
	else if(action == "edit"){
		argModVSM(idObjectValue, levelInSLL, "showEmptyForm", object, levelInSLL);
		db.transaction(function(tx){
		var selectArgModVSMSQL = "SELECT * FROM "+thisTableName+" WHERE "+idObjectName+" = ? AND ModLevel = ?";
		var datasetArgVSM;
		tx.executeSql(selectArgModVSMSQL, [idObjectValue, iteration], function(tx, result) {
		datasetArgVSM = result.rows;
		var argVSM;
			// Fill up the input of VSMArg
			argVSM = datasetArgVSM.item(0);
			document.getElementById("titleArgModVSM_lev"+levelInSLL).value = argVSM['title'];
			document.getElementById("HcArgModVSM_lev"+levelInSLL).value = argVSM['Hc'];
			document.getElementById("unitHcArgModVSM_lev"+levelInSLL).value = argVSM['unitHc'];
			//set selectbox  to appropriate unit
			var selectHcUnit = document.getElementById("selectHc_lev"+levelInSLL);
			var itemsOfSelectHcUnit = selectHcUnit.getElementsByTagName("option");
				for (var x = 0; x < itemsOfSelectHcUnit.length; x++) { 
					if (selectHcUnit.options[x].value == argVSM['unitHc']) { 
						selectHcUnit.options[x].selected = true; 
					} 
				}
			document.getElementById("errHcArgModVSM_lev"+levelInSLL).value = argVSM['errHc'];
			document.getElementById("HsatArgModVSM_lev"+levelInSLL).value = argVSM['Hsat'];;
			document.getElementById("unitHsatArgModVSM_lev"+levelInSLL).value = argVSM['unitHsat'];
			document.getElementById("errHsatArgModVSM_lev"+levelInSLL).value = argVSM['errHsat'];
			//set selectbox  to appropriate unit
			var selectHsatUnit = document.getElementById("selectHsat_lev"+levelInSLL);
			var itemsOfSelectHsatUnit = selectHsatUnit.getElementsByTagName("option");
				for (var x = 0; x < itemsOfSelectHsatUnit.length; x++) { 
					if (selectHsatUnit.options[x].value == argVSM['unitHsat']) { 
						selectHsatUnit.options[x].selected = true; 
					} 
				}
			document.getElementById("MsatArgModVSM_lev"+levelInSLL).value = argVSM['Msat'];
			document.getElementById("unitMsatArgModVSM_lev"+levelInSLL).value = argVSM['unitMsat'];
			document.getElementById("errMsatArgModVSM_lev"+levelInSLL).value = argVSM['errMsat'];
			//set selectbox  to appropriate unit
			var selectMsatUnit = document.getElementById("selectMsat_lev"+levelInSLL);
			var itemsOfSelectMsatUnit = selectMsatUnit.getElementsByTagName("option");
				for (var x = 0; x < itemsOfSelectMsatUnit.length; x++) { 
					if (selectMsatUnit.options[x].value == argVSM['unitMsat']) { 
						selectMsatUnit.options[x].selected = true; 
					} 
				}
			document.getElementById("temperatureArgModVSM_lev"+levelInSLL).value = argVSM['temperature'];
			document.getElementById("fldDirArgModVSM_lev"+levelInSLL).value = argVSM['fldDir'];
			document.getElementById("detailsArgModVSM_lev"+levelInSLL).value = argVSM['details'];
			document.getElementById("idToolArgModVSM_lev"+levelInSLL).value = argVSM['idTool'];
			document.getElementById("delStatusArgModVSM_lev"+levelInSLL).value = argVSM['delStatus'];
			var selectBox = document.getElementById("listToolSelect_ModVSM"+levelInSLL);
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
function argModSQUID(idObjectValue, iteration, action, object, levelInSLL){
	console.log('This is the action:'+action+' SQUID.');
		if(object == "sample"){
			var thisTableName = "ModSQUID";
			var idObjectName = "idSample";
		}
		else{
			var thisTableName = "ModTempSQUID";
			var idObjectName = "idTemplate";
		}
		//Diplay the ArgModSQUID form
	if(action == "showEmptyForm"){
			var TextForDiv = '<input type="hidden" id="delStatusArgModSQUID_lev'+iteration+'" style="width:80px" value="0"/><table width="520px" cellspacing="0px" cellpadding="0px" border="0px solid #00000" style="margin-top:10px;"><tr height="35px" valign="middle" align="left"><td width="520px" colspan="2"><input type="text" id="titleArgModSQUID_lev'+iteration+'" style="font-size:11px; width:510px; background-color:#D3D8DC; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#FFFFFF\'" onMouseOut="this.style.backgroundColor=\'#D3D8DC\'" value="Give It a Name"/></td></tr><tr height="45px" valign="middle" align="left"><td width="520px" colspan="2">Tool<br><div id="containerListTool_ModSQUID'+iteration+'" style="width:380px"></div><input type="hidden" id="idToolArgModSQUID_lev'+iteration+'" value=""/></td></tr><tr height="45px" valign="middle" align="left"><td width="30px">H<sub>sat</sub></td><td width="480px"><input type="text" id="HsatArgModSQUID_lev'+iteration+'" style="font-size:11px; width:100px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/> +/- <input type="text" id="errHsatArgModSQUID_lev'+iteration+'" style="font-size:11px; width:100px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/><select id="selectHsat_lev'+iteration+'" onChange="unitSelectValue(this.value, unitHsatArgModSQUID_lev'+iteration+');"><option value="blank">select a unit</option><option value="Gauss">Gauss</option><option value="Tesla">Tesla</option></select><input type="hidden" id="unitHsatArgModSQUID_lev'+iteration+'" style="font-size:11px; width:30px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/></td></tr><tr height="45px" valign="middle" align="left"><td>H<sup>c</sup></td><td><input type="text" id="HcArgModSQUID_lev'+iteration+'" style="font-size:11px; width:100px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/> +/- <input type="text" id="errHcArgModSQUID_lev'+iteration+'" style="font-size:11px; width:100px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/><select id="selectHc_lev'+iteration+'" onChange="unitSelectValue(this.value, unitHcArgModSQUID_lev'+iteration+');"><option value="blank">select a unit</option><option value="Gauss">Gauss</option><option value="Tesla">Tesla</option></select><input type="hidden" id="unitHcArgModSQUID_lev'+iteration+'" style="width:30px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/></td></tr><tr height="45px" valign="middle" align="left"><td>M<sub>sat</sub></td><td><input type="text" id="MsatArgModSQUID_lev'+iteration+'" style="font-size:11px; width:100px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/> +/- <input type="text" id="errMsatArgModSQUID_lev'+iteration+'" style="font-size:11px; width:100px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/><select id="selectMsat_lev'+iteration+'" onChange="unitSelectValue(this.value, unitMsatArgModSQUID_lev'+iteration+');"><option value="blank">select a unit</option><option value="emu/cm^3">emu/cm^3</option><option value="SI">SI</option></select><input type="hidden" id="unitMsatArgModSQUID_lev'+iteration+'" style="width:30px; background-color:#E0E5EA; margin:0px 0px 10px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/></td></tr></table><table width="520px" cellspacing="0px" cellpadding="0px" border="0px solid #00000" style="margin-bottom:10px;"><tr height="45px" align="left" valign="middle"><td width="260px">Temperature (K)<br><input type="text" id="temperatureArgModSQUID_lev'+iteration+'" style="font-size:11px; width:100px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/></td><td width="260px">Field direction (degree)<br><input type="text" id="fldDirArgModSQUID_lev'+iteration+'" style="font-size:11px; width:100px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/></td></tr><tr valign="middle" align="left"><td width="520px" colspan="2">More Info<br><textarea style="width:98%; height: 80px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'" id="detailsArgModSQUID_lev'+iteration+'"></textarea></td></tr></table>';
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
			var insertSqlArg = "INSERT INTO "+thisTableName+" ("+idObjectName+", ModLevel, title, Hc, unitHc, errHc, Hsat, unitHsat, errHsat, Msat, unitMsat, errMsat, temperature, fldDir, details, idTool, delStatus) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
		db.transaction(function(tx) {
			tx.executeSql(insertSqlArg, [idObjectValue, iteration, titleValue, HcValue, unitHcValue, errHcValue, HsatValue, unitHsatValue, errHsatValue, MsatValue, unitMsatValue, errMsatValue, temperatureValue, fldDirValue, detailsValue, idToolValue, delStatusValue], null, onError);
			});
		}
		else if(action == "update"){
			var updateSqlArg = "UPDATE "+thisTableName+" SET title = ?, Hc = ?, unitHc = ?, errHc = ?, Hsat = ?, unitHsat = ?, errHsat = ?, Msat = ?, unitMsat = ?, errMsat = ?, temperature = ?, fldDir = ?, details = ?, idTool = ?, delStatus = ? WHERE "+idObjectName+" = ? AND ModLevel = ?";
			db.transaction(function(tx) {
			tx.executeSql(updateSqlArg, [titleValue, HcValue, unitHcValue, errHcValue, HsatValue, unitHsatValue, errHsatValue, MsatValue, unitMsatValue, errMsatValue, temperatureValue, fldDirValue, detailsValue, idToolValue, delStatusValue, idObjectValue, iteration], null, onError);
			});
		}
		else if(action == "downLevel"){
		var downlevelSqlArg = "UPDATE "+thisTableName+" SET ModLevel = ? WHERE "+idObjectName+" = ? AND ModLevel = ?";
		var newLevel = iteration -1;
	db.transaction(function(tx) {
		tx.executeSql(downlevelSqlArg, [newLevel, idObjectValue, iteration], null, onError);
	});
	}
		return null;
	}
	else if(action == "edit"){
		argModSQUID(idObjectValue, levelInSLL, "showEmptyForm", object, levelInSLL);
		db.transaction(function(tx){
		var selectArgModSQUIDSQL = "SELECT * FROM "+thisTableName+" WHERE "+idObjectName+" = ? AND ModLevel = ?";
		var datasetArgSQUID;
		tx.executeSql(selectArgModSQUIDSQL, [idObjectValue, iteration], function(tx, result) {
		datasetArgSQUID = result.rows;
		var argSQUID;
			// Fill up the input of SQUIDArg
			argSQUID = datasetArgSQUID.item(0);
			document.getElementById("titleArgModSQUID_lev"+levelInSLL).value = argSQUID['title'];
			document.getElementById("HcArgModSQUID_lev"+levelInSLL).value = argSQUID['Hc'];
			document.getElementById("unitHcArgModSQUID_lev"+levelInSLL).value = argSQUID['unitHc'];
						//set selectbox  to appropriate unit
			var selectHcUnit = document.getElementById("selectHc_lev"+levelInSLL);
			var itemsOfSelectHcUnit = selectHcUnit.getElementsByTagName("option");
				for (var x = 0; x < itemsOfSelectHcUnit.length; x++) { 
					if (selectHcUnit.options[x].value == argSQUID['unitHc']) { 
						selectHcUnit.options[x].selected = true; 
					} 
				}
			document.getElementById("errHcArgModSQUID_lev"+levelInSLL).value = argSQUID['errHc'];
			document.getElementById("HsatArgModSQUID_lev"+levelInSLL).value = argSQUID['Hsat'];;
			document.getElementById("unitHsatArgModSQUID_lev"+levelInSLL).value = argSQUID['unitHsat'];
			document.getElementById("errHsatArgModSQUID_lev"+levelInSLL).value = argSQUID['errHsat'];
						//set selectbox  to appropriate unit
			var selectHsatUnit = document.getElementById("selectHsat_lev"+levelInSLL);
			var itemsOfSelectHsatUnit = selectHsatUnit.getElementsByTagName("option");
				for (var x = 0; x < itemsOfSelectHsatUnit.length; x++) { 
					if (selectHsatUnit.options[x].value == argSQUID['unitHsat']) { 
						selectHsatUnit.options[x].selected = true; 
					} 
				}
			document.getElementById("MsatArgModSQUID_lev"+levelInSLL).value = argSQUID['Msat'];
			document.getElementById("unitMsatArgModSQUID_lev"+levelInSLL).value = argSQUID['unitMsat'];
			document.getElementById("errMsatArgModSQUID_lev"+levelInSLL).value = argSQUID['errMsat'];
			//set selectbox  to appropriate unit
			var selectMsatUnit = document.getElementById("selectMsat_lev"+levelInSLL);
			var itemsOfSelectMsatUnit = selectMsatUnit.getElementsByTagName("option");
				for (var x = 0; x < itemsOfSelectMsatUnit.length; x++) { 
					if (selectMsatUnit.options[x].value == argSQUID['unitMsat']) { 
						selectMsatUnit.options[x].selected = true; 
					} 
				}
			document.getElementById("temperatureArgModSQUID_lev"+levelInSLL).value = argSQUID['temperature'];
			document.getElementById("fldDirArgModSQUID_lev"+levelInSLL).value = argSQUID['fldDir'];
			document.getElementById("detailsArgModSQUID_lev"+levelInSLL).value = argSQUID['details'];
			document.getElementById("idToolArgModSQUID_lev"+levelInSLL).value = argSQUID['idTool'];
			document.getElementById("delStatusArgModSQUID_lev"+levelInSLL).value = argSQUID['delStatus'];
			var selectBox = document.getElementById("listToolSelect_ModSQUID"+levelInSLL);
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
function argModMaskAlign(idObjectValue, iteration, action, object, levelInSLL){
	console.log('This is the action:'+action+' Mask Align.');
			if(object == "sample"){
			var thisTableName = "ModMaskAlign";
			var idObjectName = "idSample";
		}
		else{
			var thisTableName = "ModTempMaskAlign";
			var idObjectName = "idTemplate";
		}
	//Diplay the ArgModMaskAlign form
	if(action == "showEmptyForm"){
	var TextForDiv = '<input type="hidden" id="delStatusArgModMaskAlign_lev'+iteration+'" style="width:80px" value="0"/><table width="520px" cellspacing="0px" cellpadding="0px" border="0px solid #00000" style="margin-top:10px; margin-bottom:10px;"><tr height="35px" valign="middle" align="left"><td width="520px" colspan="2"><input type="text" id="titleArgModMaskAlign_lev'+iteration+'" style="font-size:11px; width:520px; background-color:#D3D8DC; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#FFFFFF\'" onMouseOut="this.style.backgroundColor=\'#D3D8DCA\'" value="Give it a Title"/></td></tr><tr height="45px" valign="middle" align="left"><td width="260px">Exposure Time (sec)<br><input type="text" id="expoTimeArgModMaskAlign_lev'+iteration+'" style="font-size:11px; width:100px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/></td><td width="260px">Power (W)<br><input type="text" id="powerArgModMaskAlign_lev'+iteration+'" style="font-size:11px; width:100px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/></td></tr><tr height="45px" valign="middle" align="left"><td colspan="2" width="520px">Tool<br><div id="containerListTool_ModMaskAlign'+iteration+'" style="width:200px"></div><input type="hidden" id="idToolArgModMaskAlign_lev'+iteration+'" value=""/><br></td></tr><tr valign="middle" align="left"><td width="520px" colspan="2">More Info<br><textarea id="detailsArgModMaskAlign_lev'+iteration+'" style="width:520px; height:80px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"></textarea></td></tr></table>';
	listTools_form("ModMaskAlign",iteration);
	return TextForDiv;
	}
	else if(action == "insert" || action == "update" || action == "downLevel"){
	var titleValue = document.getElementById("titleArgModMaskAlign_lev"+iteration).value;
	var powerValue = document.getElementById("powerArgModMaskAlign_lev"+iteration).value;
	var timeValue = document.getElementById("expoTimeArgModMaskAlign_lev"+iteration).value;
	var detailsValue =  document.getElementById("detailsArgModMaskAlign_lev"+iteration).value;
	var idToolValue =  document.getElementById("idToolArgModMaskAlign_lev"+iteration).value;
	var delStatusValue =  document.getElementById("delStatusArgModMaskAlign_lev"+iteration).value;	
		if(action == "insert"){
			var insertSqlArg = "INSERT INTO "+thisTableName+" ("+idObjectName+", ModLevel, title, expoTime, power, details, idTool, delStatus) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
			db.transaction(function(tx) {
			tx.executeSql(insertSqlArg, [idObjectValue, iteration, titleValue, timeValue, powerValue, detailsValue, idToolValue, delStatusValue], null, onError);
			});
		}
		else if(action == "update"){
			var updateSqlArg = "UPDATE "+thisTableName+" SET title = ?, expoTime = ?, power = ?, details = ?, idTool = ?, delStatus = ? WHERE "+idObjectName+" = ? AND ModLevel = ?";
			db.transaction(function(tx) {
			tx.executeSql(updateSqlArg, [titleValue, timeValue, powerValue, detailsValue, idToolValue, delStatusValue, idObjectValue, iteration], null, onError);
			});
		}
		else if(action == "downLevel"){
		var downlevelSqlArg = "UPDATE "+thisTableName+" SET ModLevel = ? WHERE "+idObjectName+" = ? AND ModLevel = ?";
		var newLevel = iteration -1;
	db.transaction(function(tx) {
		tx.executeSql(downlevelSqlArg, [newLevel, idObjectValue, iteration], null, onError);
	});
	}
		return null;
	}
	else if(action == "edit"){
		argModMaskAlign(idObjectValue, levelInSLL, "showEmptyForm", object, levelInSLL);
		db.transaction(function(tx){
		var selectArgModMaskAlignSQL = "SELECT * FROM "+thisTableName+" WHERE "+idObjectName+" = ? AND ModLevel = ?";
		var datasetArgMaskAlign;
		tx.executeSql(selectArgModMaskAlignSQL, [idObjectValue, iteration], function(tx, result) {
		datasetArgMaskAlign = result.rows;
		var argMaskAlign;
			// Fill up the input of SQUIDArg
			argMaskAlign = datasetArgMaskAlign.item(0);
			document.getElementById("titleArgModMaskAlign_lev"+levelInSLL).value = argMaskAlign['title'];
			document.getElementById("detailsArgModMaskAlign_lev"+levelInSLL).value = argMaskAlign['details'];
			document.getElementById("expoTimeArgModMaskAlign_lev"+levelInSLL).value = argMaskAlign['expoTime'];
			document.getElementById("powerArgModMaskAlign_lev"+levelInSLL).value = argMaskAlign['power'];
			document.getElementById("idToolArgModMaskAlign_lev"+levelInSLL).value = argMaskAlign['idTool'];
			document.getElementById("delStatusArgModMaskAlign_lev"+levelInSLL).value = argMaskAlign['delStatus'];
			var selectBox = document.getElementById("listToolSelect_ModMaskAlign"+levelInSLL);
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
function argModMOKE(idObjectValue, iteration, action, object, levelInSLL){
		if(object == "sample"){
			var thisTableName = "ModMOKE";
			var idObjectName = "idSample";
		}
		else{
			var thisTableName = "ModTempMOKE";
			var idObjectName = "idTemplate";
		}
	console.log('This is the action:'+action+' MOKE.');
	//Diplay the ArgMOKE form
	if(action == "showEmptyForm"){
	var TextForDiv = '<input type="hidden" id="delStatusArgModMOKE_lev'+iteration+'" style="width:80px" value="0"/><table width="520px" cellspacing="0px" cellpadding="0px" border="0px solid #00000" style="margin-top:10px; margin-bottom:10px;"><tr height="35px" valign="middle" align="left"><td width="520px"><input type="text" id="titleArgModMOKE_lev'+iteration+'" style="font-size:11px; width:520px; background-color:#D3D8DC; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#FFFFFF\'" onMouseOut="this.style.backgroundColor=\'#D3D8DC\'" value="Give It a Title..."/></td></tr><tr height="45px" valign="middle" align="left"><td width="520px">Tool<br><div id="containerListTool_ModMOKE'+iteration+'" style="width:200px"></div><input type="hidden" id="idToolArgModMOKE_lev'+iteration+'" value=""/></td></tr><tr valign="middle" align="left"><td valign="top">Details<br><textarea id="detailsArgModMOKE_lev'+iteration+'" style="font-size:11px; width:520px; height: 80px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"></textarea></td></tr></table>';
	listTools_form("ModMOKE",iteration);
	return TextForDiv;
	}
	else if(action == "insert" || action == "update" || action == "downLevel"){
	var titleValue = document.getElementById("titleArgModMOKE_lev"+iteration).value;
	var detailsValue =  document.getElementById("detailsArgModMOKE_lev"+iteration).value;
	var idToolValue =  document.getElementById("idToolArgModMOKE_lev"+iteration).value;
	var delStatusValue =  document.getElementById("delStatusArgModMOKE_lev"+iteration).value;	
		if(action == "insert"){
			var insertSqlArg = "INSERT INTO "+thisTableName+" ("+idObjectName+", ModLevel, title, details, idTool, delStatus) VALUES (?, ?, ?, ?, ?, ?)";
			db.transaction(function(tx) {
			tx.executeSql(insertSqlArg, [idObjectName, iteration, titleValue, detailsValue, idToolValue, delStatusValue], null, onError);
			});
		}
		else if(action == "update"){
			var updateSqlArg = "UPDATE "+thisTableName+" SET title = ?, details = ?, idTool = ?, delStatus = ? WHERE "+idObjectName+" = ? AND ModLevel = ?";
			db.transaction(function(tx) {
			tx.executeSql(updateSqlArg, [titleValue, detailsValue, idToolValue, delStatusValue, idObjectValue, iteration], null, onError);
			});
		}
		else if(action == "downLevel"){
		var downlevelSqlArg = "UPDATE "+thisTableName+" SET ModLevel = ? WHERE "+idObjectname+" = ? AND ModLevel = ?";
		var newLevel = iteration -1;
	db.transaction(function(tx) {
		tx.executeSql(downlevelSqlArg, [newLevel, idObjectValue, iteration], null, onError);
	});
	}
		return null;
	}
	else if(action == "edit"){
		argModMOKE(idObjectValue, levelInSLL, "showEmptyForm", object, levelInSLL);
		db.transaction(function(tx){
		var selectArgModMOKESQL = "SELECT * FROM "+thisTableName+" WHERE "+idObjectName+" = ? AND ModLevel = ?";
		var datasetArgMOKE;
		tx.executeSql(selectArgModMOKESQL, [idObjectValue, iteration], function(tx, result) {
		datasetArgMOKE = result.rows;
		var argMOKE;
			// Fill up the input of SQUIDArg
			argMOKE = datasetArgMOKE.item(0);
			document.getElementById("titleArgModMOKE_lev"+levelInSLL).value = argMOKE['title'];
			document.getElementById("detailsArgModMOKE_lev"+levelInSLL).value = argMOKE['details'];
			document.getElementById("idToolArgModMOKE_lev"+levelInSLL).value = argMOKE['idTool'];
			document.getElementById("delStatusArgModMOKE_lev"+levelInSLL).value = argMOKE['delStatus'];
			var selectBox = document.getElementById("listToolSelect_ModMOKE"+levelInSLL);
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
function argModAFM(idObjectValue, iteration, action, object, levelInSLL){
	console.log('This is the action:'+action+' AFM.');
			if(object == "sample"){
			var thisTableName = "ModAFM";
			var idObjectName = "idSample";
		}
		else{
			var thisTableName = "ModTempAFM";
			var idObjectName = "idTemplate";
		}
	//Diplay the ArgAFM form
	if(action == "showEmptyForm"){
	var TextForDiv = '<input type="hidden" id="delStatusArgModAFM_lev'+iteration+'" style="width:80px" value="0"/><table width="520px" cellspacing="0px" cellpadding="0px" border="0px solid #00000" style="margin-top:10px; margin-bottom:10px;"><tr height="35px" valign="middle" align="left"><td width="520px"><input type="text" id="titleArgModAFM_lev'+iteration+'" style="font-size:11px; width:520px; background-color:#D3D8DC; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#FFFFFF\'" onMouseOut="this.style.backgroundColor=\'#D3D8DC\'" value="Give It a Title..."/></td></tr><tr height="45px" valign="middle" align="left"><td width="520px">Tool<br><div id="containerListTool_ModAFM'+iteration+'" style="width:200px"></div><input type="hidden" id="idToolArgModAFM_lev'+iteration+'" value=""/></td></tr><tr valign="middle" align="left"><td valign="top">Details<br><textarea id="detailsArgModAFM_lev'+iteration+'" style="font-size:11px; width:520px; height: 80px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"></textarea></td></tr></table>';
	listTools_form("ModAFM",iteration);
	return TextForDiv;
	}
	else if(action == "insert" || action == "update" || action == "downLevel"){
	var titleValue = document.getElementById("titleArgModAFM_lev"+iteration).value;
	var detailsValue =  document.getElementById("detailsArgModAFM_lev"+iteration).value;
	var idToolValue =  document.getElementById("idToolArgModAFM_lev"+iteration).value;
	var delStatusValue =  document.getElementById("delStatusArgModAFM_lev"+iteration).value;	
		if(action == "insert"){
			var insertSqlArg = "INSERT INTO "+thisTableName+" ("+idObjectName+", ModLevel, title, details, idTool, delStatus) VALUES (?, ?, ?, ?, ?, ?)";
			db.transaction(function(tx) {
			tx.executeSql(insertSqlArg, [idObjectValue, iteration, titleValue, detailsValue, idToolValue, delStatusValue], null, onError);
			});
		}
		else if(action == "update"){
			var updateSqlArg = "UPDATE "+thisTableName+" SET title = ?, details = ?, idTool = ?, delStatus = ? WHERE "+idObjectName+" = ? AND ModLevel = ?";
			db.transaction(function(tx) {
			tx.executeSql(updateSqlArg, [titleValue, detailsValue, idToolValue, delStatusValue, idObjectValue, iteration], null, onError);
			});
		}
		else if(action == "downLevel"){
		var downlevelSqlArg = "UPDATE "+thisTableName+" SET ModLevel = ? WHERE "+idObjectName+" = ? AND ModLevel = ?";
		var newLevel = iteration -1;
	db.transaction(function(tx) {
		tx.executeSql(downlevelSqlArg, [newLevel, idObjectValue, iteration], null, onError);
	});
	}
		return null;
	}
	else if(action == "edit"){
		argModAFM(idObjectValue, levelInSLL, "showEmptyForm", object, levelInSLL);
		db.transaction(function(tx){
		var selectArgModAFMSQL = "SELECT * FROM "+thisTableName+" WHERE "+idObjectName+" = ? AND ModLevel = ?";
		var datasetArgAFM;
		tx.executeSql(selectArgModAFMSQL, [idObjectValue, iteration], function(tx, result) {
		datasetArgAFM = result.rows;
		var argAFM;
			// Fill up the input of SQUIDArg
			argAFM = datasetArgAFM.item(0);
			document.getElementById("titleArgModAFM_lev"+levelInSLL).value = argAFM['title'];
			document.getElementById("detailsArgModAFM_lev"+levelInSLL).value = argAFM['details'];
			document.getElementById("idToolArgModAFM_lev"+levelInSLL).value = argAFM['idTool'];
			document.getElementById("delStatusArgModAFM_lev"+levelInSLL).value = argAFM['delStatus'];
			var selectBox = document.getElementById("listToolSelect_ModAFM"+levelInSLL);
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
function argModMFM(idObjectValue, iteration, action, object, levelInSLL){
	console.log('This is the action:'+action+' MFM.');
			if(object == "sample"){
			var thisTableName = "ModMFM";
			var idObjectName = "idSample";
		}
		else{
			var thisTableName = "ModTempMFM";
			var idObjectName = "idTemplate";
		}
		//Diplay the ArgModMFM form
	if(action == "showEmptyForm"){
	var TextForDiv = '<input type="hidden" id="delStatusArgModMFM_lev'+iteration+'" style="width:80px" value="0"/><table width="520px" cellspacing="0px" cellpadding="0px" border="0px solid #00000" style="margin-top:10px; margin-bottom:10px;"><tr height="35px" valign="middle" align="left"><td width="520px"><input type="text" id="titleArgModMFM_lev'+iteration+'" style="font-size:11px; width:520px; background-color:#D3D8DC; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#FFFFFF\'" onMouseOut="this.style.backgroundColor=\'#D3D8DC\'" value="Give It a Title..."/></td></tr><tr height="45px" valign="middle" align="left"><td width="520px">Tool<br><div id="containerListTool_ModMFM'+iteration+'" style="width:200px"></div><input type="hidden" id="idToolArgModMFM_lev'+iteration+'" value=""/></td></tr><tr valign="middle" align="left"><td valign="top">Details<br><textarea id="detailsArgModMFM_lev'+iteration+'" style="font-size:11px; width:520px; height: 80px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"></textarea></td></tr></table>';
	listTools_form("ModMFM",iteration);
	return TextForDiv;
	}
	else if(action == "insert" || action == "update" || action == "downLevel"){
	var titleValue = document.getElementById("titleArgModMFM_lev"+iteration).value;
	var detailsValue =  document.getElementById("detailsArgModMFM_lev"+iteration).value;
	var idToolValue =  document.getElementById("idToolArgModMFM_lev"+iteration).value;
	var delStatusValue =  document.getElementById("delStatusArgModMFM_lev"+iteration).value;	
		if(action == "insert"){
			var insertSqlArg = "INSERT INTO "+thisTableName+" ("+idObjectName+", ModLevel, title, details, idTool, delStatus) VALUES (?, ?, ?, ?, ?, ?)";
			db.transaction(function(tx) {
			tx.executeSql(insertSqlArg, [idObjectValue, iteration, titleValue, detailsValue, idToolValue, delStatusValue], null, onError);
			});
		}
		else if(action == "update"){
			var updateSqlArg = "UPDATE "+thisTableName+" SET title = ?, details = ?, idTool = ?, delStatus = ? WHERE "+idObjectName+" = ? AND ModLevel = ?";
			db.transaction(function(tx) {
			tx.executeSql(updateSqlArg, [titleValue, detailsValue, idToolValue, delStatusValue, idObjectValue, iteration], null, onError);
			});
		}
		else if(action == "downLevel"){
		var downlevelSqlArg = "UPDATE "+thisTableName+" SET ModLevel = ? WHERE "+idObjectName+" = ? AND ModLevel = ?";
		var newLevel = iteration -1;
	db.transaction(function(tx) {
		tx.executeSql(downlevelSqlArg, [newLevel, idObjectValue, iteration], null, onError);
	});
	}
		return null;
	}
	else if(action == "edit"){
		argModMFM(idObjectValue, levelInSLL, "showEmptyForm", object, levelInSLL);
		db.transaction(function(tx){
		var selectArgModMFMSQL = "SELECT * FROM "+thisTableName+" WHERE "+idObjectname+" = ? AND ModLevel = ?";
		var datasetArgMFM;
		tx.executeSql(selectArgModMFMSQL, [idObjectValue, iteration], function(tx, result) {
		datasetArgMFM = result.rows;
		var argMFM;
			// Fill up the input of SQUIDArg
			argMFM = datasetArgMFM.item(0);
			document.getElementById("titleArgModMFM_lev"+levelInSLL).value = argMFM['title'];
			document.getElementById("detailsArgModMFM_lev"+levelInSLL).value = argMFM['details'];
			document.getElementById("idToolArgModMFM_lev"+levelInSLL).value = argMFM['idTool'];
			document.getElementById("delStatusArgModMFM_lev"+levelInSLL).value = argMFM['delStatus'];
			var selectBox = document.getElementById("listToolSelect_ModMFM"+levelInSLL);
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
function argModAlfaStep(idObjectValue, iteration, action, object, levelInSLL){
	console.log('This is the action:'+action+' Alfa Step.');
		if(object == "sample"){
			var thisTableName = "ModAlfaStep";
			var idObjectName = "idSample";
		}
		else{
			var thisTableName = "ModTempAlfaStep";
			var idObjectName = "idTemplate";
		}
	//Diplay the ArgAlfaStep form
	if(action == "showEmptyForm"){
	var TextForDiv = '<input type="hidden" id="delStatusArgModAlfaStep_lev'+iteration+'" style="width:80px" value="0"/><table width="520px" cellspacing="0px" cellpadding="0px" border="0px solid #00000" style="margin-top:10px; margin-bottom:10px;"><tr height="35px" valign="middle" align="left"><td width="520px"><input type="text" id="titleArgModAlfaStep_lev'+iteration+'" style="font-size:11px; width:520px; background-color:#D3D8DC; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#FFFFFF\'" onMouseOut="this.style.backgroundColor=\'#D3D8DC\'" value="Give It a Title..."/></td></tr><tr height="45px" valign="middle" align="left"><td width="520px">Tool<br><div id="containerListTool_ModAlfaStep'+iteration+'" style="width:200px"></div><input type="hidden" id="idToolArgModAlfaStep_lev'+iteration+'" value=""/></td></tr><tr valign="middle" align="left"><td valign="top">Details<br><textarea id="detailsArgModAlfaStep_lev'+iteration+'" style="font-size:11px; width:520px; height: 80px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"></textarea></td></tr></table>';
	listTools_form("ModAlfaStep",iteration);
	return TextForDiv;
	}
	else if(action == "insert" || action == "update" || action == "downLevel"){
	var titleValue = document.getElementById("titleArgModAlfaStep_lev"+iteration).value;
	var detailsValue =  document.getElementById("detailsArgModAlfaStep_lev"+iteration).value;
	var idToolValue =  document.getElementById("idToolArgModAlfaStep_lev"+iteration).value;
	var delStatusValue =  document.getElementById("delStatusArgModAlfaStep_lev"+iteration).value;	
		if(action == "insert"){
			var insertSqlArg = "INSERT INTO "+thisTableName+" ("+idObjectName+", ModLevel, title, details, idTool, delStatus) VALUES (?, ?, ?, ?, ?, ?)";
			db.transaction(function(tx) {
			tx.executeSql(insertSqlArg, [idObjectValue, iteration, titleValue, detailsValue, idToolValue, delStatusValue], null, onError);
			});
		}
		else if(action == "update"){
			var updateSqlArg = "UPDATE "+thisTableName+" SET title = ?, details = ?, idTool = ?, delStatus = ? WHERE "+idObjectName+" = ? AND ModLevel = ?";
			db.transaction(function(tx) {
			tx.executeSql(updateSqlArg, [titleValue, detailsValue, idToolValue, delStatusValue, idObjectValue, iteration], null, onError);
			});
		}
			else if(action == "downLevel"){
		var downlevelSqlArg = "UPDATE "+thisTableName+" SET ModLevel = ? WHERE "+idObjectName+" = ? AND ModLevel = ?";
		var newLevel = iteration -1;
	db.transaction(function(tx) {
		tx.executeSql(downlevelSqlArg, [newLevel, idObjectValue, iteration], null, onError);
	});
	}
		return null;
	}
	else if(action == "edit"){
		argModAlfaStep(idObjectValue, levelInSLL, "showEmptyForm", object, levelInSLL);
		db.transaction(function(tx){
		var selectArgModAlfaStepSQL = "SELECT * FROM "+thisTableName+" WHERE "+idObjectName+" = ? AND ModLevel = ?";
		var datasetArgAlfaStep;
		tx.executeSql(selectArgModAlfaStepSQL, [idObjectValue, iteration], function(tx, result) {
		datasetArgAlfaStep = result.rows;
		var argAlfaStep;
			// Fill up the input of SQUIDArg
			argAlfaStep = datasetArgAlfaStep.item(0);
			document.getElementById("titleArgModAlfaStep_lev"+levelInSLL).value = argAlfaStep['title'];
			document.getElementById("detailsArgModAlfaStep_lev"+levelInSLL).value = argAlfaStep['details'];
			document.getElementById("idToolArgModAlfaStep_lev"+levelInSLL).value = argAlfaStep['idTool'];
			document.getElementById("delStatusArgModAlfaStep_lev"+levelInSLL).value = argAlfaStep['delStatus'];
			var selectBox = document.getElementById("listToolSelect_ModAlfaStep"+levelInSLL);
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
function argModAnnealing(idObjectValue, iteration, action, object, levelInSLL){
	console.log('This is the action:'+action+' Annealing.');
		if(object == "sample"){
			var thisTableName = "ModAnnealing";
			var idObjectName = "idSample";
		}
		else{
			var thisTableName = "ModTempAnnealing";
			var idObjectName = "idTemplate";
		}
//Diplay the ArgAnnealing form
	if(action == "showEmptyForm"){
	var TextForDiv = '<input type="hidden" id="delStatusArgModAnnealing_lev'+iteration+'" style="width:80px" value="0"/><table width="520px" cellspacing="0px" cellpadding="0px" border="1px solid #00000" style="margin-top: 10px; margin-bottom:10px;"><tr height="35px" valign="middle" align="left"><td colspan="2"><input type="text" id="titleArgModAnnealing_lev'+iteration+'" style="width:520px; background-color:#D3D8DC; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/></td></tr><tr height="45px" valign="middle" align="left"><td colspan="2">Tool<br><div id="containerListTool_ModAnnealing'+iteration+'" style="width:200px"></div><input type="hidden" id="idToolArgModAnnealing_lev'+iteration+'" value=""/></td></tr><tr height="45px" valign="middle" align="left"><td width="260px">Temperature (K)<br><input type="text" id="tempArgModAnnealing_lev'+iteration+'" style="width:100px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/></td><td width="260px">Duration<br><input type="text" id="durationArgModAnnealing_lev'+iteration+'" style="width:100px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/> <select id="selectAnnealDuration_lev'+iteration+'" onChange="unitSelectValue(this.value, unitDurationArgModAnnealing_lev'+iteration+');" width="100px"><option value="sec">sec</option><option value="min">min</option><option value="hr">hr</option></select> <input type="hidden" id="unitDurationArgModAnnealing_lev'+iteration+'" style="width:50px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"/></td></tr><tr height="35px" valign="middle" align="left"><td width="520px" colspan="2">Details<br><textarea id="detailsArgModAnnealing_lev'+iteration+'" style="font-size:11px; width:520px; height: 80px; background-color:#E0E5EA; margin:0px 0px 0px 0px; -webkit-border-radius: 2px; border: 1px solid #D4D4D4; padding: 2px 2px 2px 2px; outline: none;" onMouseOver="this.style.backgroundColor=\'#E7E6E6\'" onMouseOut="this.style.backgroundColor=\'#E0E5EA\'"></textarea></td></tr></table>';
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
			var insertSqlArg = "INSERT INTO "+thisTableName+" ("+idObjectName+", ModLevel, title, temperature, duration, unitDuration, details, idTool, delStatus) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
			db.transaction(function(tx) {
			tx.executeSql(insertSqlArg, [idObjectValue, iteration, titleValue, tempValue, durationValue, unitDurationValue, detailsValue, idToolValue, delStatusValue], null, onError);
			});
		}
		else if(action == "update"){
			var updateSqlArg = "UPDATE "+thisTableName+" SET title = ?, temp = ?, duration = ?, unitDuration = ?, details = ?, idTool = ?, delStatus = ? WHERE "+idObjectName+" = ? AND ModLevel = ?";
			db.transaction(function(tx) {
			tx.executeSql(updateSqlArg, [titleValue, tempValue, durationValue, unitDurationValue, detailsValue, idToolValue, delStatusValue, idObjectValue, iteration], null, onError);
			});
		}
			else if(action == "downLevel"){
		var downlevelSqlArg = "UPDATE "+thisTableName+" SET ModLevel = ? WHERE "+idObjectName+" = ? AND ModLevel = ?";
		var newLevel = iteration -1;
	db.transaction(function(tx) {
		tx.executeSql(downlevelSqlArg, [newLevel, idObjectValue, iteration], null, onError);
	});
	}
		return null;
	}
	else if(action == "edit"){
		argModAnnealing(idObjectValue, levelInSLL, "showEmptyForm", object, levelInSLL);
		db.transaction(function(tx){
		var selectArgModAnnealingSQL = "SELECT * FROM "+thisTableName+" WHERE "+idObjectname+" = ? AND ModLevel = ?";
		var datasetArgAnnealing;
		tx.executeSql(selectArgModAnnealingSQL, [idObjectValue, iteration], function(tx, result) {
		datasetArgAnnealing = result.rows;
		var argAnnealing;
			// Fill up the input of SQUIDArg
			argAnnealing = datasetArgAnnealing.item(0);
			document.getElementById("titleArgModAnnealing_lev"+levelInSLL).value = argAnnealing['title'];
			document.getElementById("detailsArgModAnnealing_lev"+levelInSLL).value = argAnnealing['details'];
			document.getElementById("idToolArgModAnnealing_lev"+levelInSLL).value = argAnnealing['idTool'];
			document.getElementById("delStatusArgModAnnealing_lev"+levelInSLL).value = argAnnealing['delStatus'];
			var selectBox = document.getElementById("listToolSelect_ModAnnealing"+levelInSLL);
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
function argModTransport(idObjectValue, iteration, action, object, levelInSLL){
	console.log('This is the action:'+action+' Transport.');
			if(object == "sample"){
			var thisTableName = "ModTransport";
			var idObjectName = "idSample";
		}
		else{
			var thisTableName = "ModTempTransport";
			var idObjectName = "idTemplate";
		}
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
			var insertSqlArg = "INSERT INTO "+thisTableName+" ("+idObjectName+", ModLevel, title, details, idTool, delStatus) VALUES (?, ?, ?, ?, ?, ?)";
			db.transaction(function(tx) {
			tx.executeSql(insertSqlArg, [idObjectValue, iteration, titleValue, detailsValue, idToolValue, delStatusValue], null, onError);
			});
		}
		else if(action == "update"){
			var updateSqlArg = "UPDATE "+thisTableName+" SET title = ?, details = ?, idTool = ?, delStatus = ? WHERE "+idObjectName+" = ? AND ModLevel = ?";
			db.transaction(function(tx) {
			tx.executeSql(updateSqlArg, [titleValue, detailsValue, idToolValue, delStatusValue, idObjectValue, iteration], null, onError);
			});
		}
			else if(action == "downLevel"){
		var downlevelSqlArg = "UPDATE "+thisTableName+" SET ModLevel = ? WHERE "+idObjectName+" = ? AND ModLevel = ?";
		var newLevel = iteration -1;
	db.transaction(function(tx) {
		tx.executeSql(downlevelSqlArg, [newLevel, idObjectValue, iteration], null, onError);
	});
	}
		return null;
	}
	else if(action == "edit"){
		argModTransport(idObjectValue, levelInSLL, "showEmptyForm", object, levelInSLL);
		db.transaction(function(tx){
		var selectArgModTransportSQL = "SELECT * FROM "+thisTableName+" WHERE "+idObjectName+" = ? AND ModLevel = ?";
		var datasetArgTransport;
		tx.executeSql(selectArgModTransportSQL, [idObjectValue, iteration], function(tx, result) {
		datasetArgTransport = result.rows;
		var argTransport;
			// Fill up the input of SQUIDArg
			argTransport = datasetArgTransport.item(0);
			document.getElementById("titleArgModTransport_lev"+levelInSLL).value = argTransport['title'];
			document.getElementById("detailsArgModTransport_lev"+levelInSLL).value = argTransport['details'];
			document.getElementById("idToolArgModTransport_lev"+levelInSLL).value = argTransport['idTool'];
			document.getElementById("delStatusArgModTransport_lev"+levelInSLL).value = argTransport['delStatus'];
			var selectBox = document.getElementById("listToolSelect_ModTransport"+levelInSLL);
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