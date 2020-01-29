import excel from "xlsx";
var excelutil = {
  /*
   *  엑셀을 다운로드 한다.
   *  2019-07-09  bkLove(촤병국)
   */
  fn_downExcel: function(excelInfo) {
    var vm = this;
    if(!excelInfo || Object.keys(excelInfo).length == 0) {
      console.log("엑셀 다운로드시 필요한 정보를 확인해 주세요.")
      return false;
    }
    if(!excelInfo.arrHeaderNm || excelInfo.arrHeaderNm.length == 0) {
      console.log("노출할 헤더 정보를 확인해 주세요.");
      return false;
    }
    if(!excelInfo.arrHeaderKey || excelInfo.arrHeaderKey.length == 0) {
      console.log("노출할 헤더의 key 정보를 확인해 주세요.");
      return false;
    }
    if(!excelInfo.sheetNm) {
      console.log("엑셀 seeht 명 정보를 확인해 주세요.");
      return false;
    }
    if(!excelInfo.excelFileNm) {
      console.log("다운로드 파일명 정보를 확인해 주세요.");
      return false;
    }
    if(!excelInfo.dataInfo) {
      console.log("엑셀 다운로드할 데이터 정보를 확인해 주세요.");
      return false;
    }
    var options = {
      skipHeader: true,
      origin: "A2",
      colStartIndex: 0,
      rowStartIndex: 1,
      colsInfo: {
        hidden: false,
        width: 15
      },
      rowsInfo: {
        hidden: false,
        hpt: 20
      }
    };
    var dataWS = excel.utils.aoa_to_sheet([excelInfo.arrHeaderNm]);
    options = Object.assign(options, excelInfo.options);
    /* 설정할 컬럼 정보 */
    /* 헤더 컬럼별 설정정보가 있는 경우 */
    if(excelInfo.arrColsInfo && excelInfo.arrColsInfo.length > 0) {
      dataWS['!cols'] = [];
      for(var i = options.colStartIndex; i < excelInfo.arrHeaderKey.length; i++) {
        var colsInfo = {};
        colsInfo = Object.assign(colsInfo, options.colsInfo);
        /* arrColsInfo 갯수와 arrHeaderKey 갯수가 다를수 있기에 arrColsInfo 의 인덱스가 arrHeaderKey 인덱스 안에 포함되는 경우 */
        if(i < excelInfo.arrColsInfo.length) {
          colsInfo = Object.assign(colsInfo, excelInfo.arrColsInfo[i]);
        }
        dataWS['!cols'][i] = colsInfo;
      }
    }
    /* 기본 컬럼 설정정보가 있는 경우 */
    else if(excelInfo.colsInfo && Object.keys(excelInfo.colsInfo).length > 0) {
      dataWS['!cols'] = [];
      for(var i = options.colStartIndex; i < excelInfo.arrHeaderKey.length; i++) {
        var colsInfo = Object.assign({}, options.colsInfo, excelInfo.colsInfo);
        dataWS['!cols'][i] = colsInfo;
      }
    }
    /* 설정할 레코드 정보 */
    /* 레코드별 설정정보가 있는 경우 */
    if(excelInfo.arrRowsInfo && excelInfo.arrRowsInfo.length > 0) {
      dataWS['!rows'] = [];
      for(var i = 0, row = options.rowStartIndex; i < excelInfo.dataInfo.length; i++, row++) {
        var rowsInfo = {};
        rowsInfo = Object.assign(rowsInfo, options.rowsInfo);
        /* arrRowsInfo 갯수와 dataInfo 갯수가 다를수 있기에 arrRowsInfo 의 인덱스가 dataInfo 인덱스 안에 포함되는 경우 */
        if(i < excelInfo.arrRowsInfo.length) {
          rowsInfo = Object.assign(rowsInfo, excelInfo.arrRowsInfo[i]);
        }
        dataWS['!rows'][row] = rowsInfo;
      }
    }
    /* 기본 레코드 설정정보가 있는 경우 */
    else if(excelInfo.rowsInfo && Object.keys(excelInfo.rowsInfo).length > 0) {
      dataWS['!rows'] = [];
      for(var i = options.colStartIndex; i < excelInfo.arrHeaderKey.length; i++) {
        var rowsInfo = Object.assign({}, options.rowsInfo, excelInfo.rowsInfo);
        dataWS['!rows'][i] = rowsInfo;
      }
    }
    excel.utils.sheet_add_json(dataWS, excelInfo.dataInfo, {
      header: excelInfo.arrHeaderKey,
      skipHeader: options.skipHeader,
      origin: options.origin
    });
    var wb = excel.utils.book_new();
    excel.utils.book_append_sheet(wb, dataWS, excelInfo.sheetNm);
    excel.writeFile(wb, excelInfo.excelFileNm + "_" + vm.getToday() + ".xlsx");
  },
}
export default excelutil