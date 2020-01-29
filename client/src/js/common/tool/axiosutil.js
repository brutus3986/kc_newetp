var axiosutil = {
  /*
   *  axios 를 수행한다.
   *  2019-09-25  bkLove(촤병국)
   */
  axiosCall(p_param = {
    url: "",
    method: "",
    data: {},
    headers: {},
    paramKey: "",
    responseType: ""
  }, p_callback = {}, p_error_callback = {}) {
    try {
      if(p_param) {
        if(typeof p_param.url == "undefined" || !p_param.url) {
          p_param.url = "";
        }
        if(typeof p_param.method == "undefined" || !p_param.method) {
          p_param.method = "post";
        }
        if(typeof p_param.paramKey == "undefined") {
          p_param.paramKey = "data";
        }
        if(typeof p_param.data == "undefined" || !p_param.data) {
          p_param.data = {};
        }
        if(typeof p_param.headers == "undefined" || !p_param.headers) {
          p_param.headers = {};
        }
        if(typeof p_param.responseType == "undefined" || !p_param.responseType) {
          p_param.responseType = "";
        }
      }
      var axiosParam = {};
      axiosParam.url = p_param.url;
      axiosParam.method = p_param.method;
      if(p_param.responseType != "") {
        axiosParam.responseType = p_param.responseType;
      }
      switch (p_param.paramKey) {
        case "":
          axiosParam.data = {};
          axiosParam.data = p_param.data;
          break;
        case "data":
          axiosParam.data = {};
          axiosParam.data.data = p_param.data;
          break;
        case "params":
          if(p_param.method == "get") {
            axiosParam.params = p_param.data;
          } else if(p_param.method == "post") {
            axiosParam.data = {};
            axiosParam.data.params = p_param.data;
          }
          break;
      }
      /* headers 가 존재하는 경우 */
      if(Object.keys(p_param.headers).length > 0) {
        axiosParam.headers = p_param.headers;
      }
      axios(axiosParam).then(function(response) {
        /* 세션이 만료된 경우 */
        if(response && response.data && response.data.success == -1) {
          if(p_error_callback && typeof p_error_callback == "function") {
            var msg = (response.data.message ? response.data.message : "처리 중 오류가 발생하였습니다.");
            p_error_callback(msg);
          }
          return false;
        }
        if(p_callback && typeof p_callback == "function") {
          p_callback(response);
        }
      }).catch(error => {
        console.log("[error] axiosCall", error);
        if(p_error_callback && typeof p_error_callback == "function") {
          error = "서버로 부터 응답을 받지 못하였습니다.";
          p_error_callback(error);
        }
      });
    } catch (ex) {
      console.log("[error] axiosCall", ex);
    }
  },
}
export default axiosutil