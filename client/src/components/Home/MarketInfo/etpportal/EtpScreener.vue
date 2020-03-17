<template>
  <v-container>
    <v-layout row wrap class="content_margin con_wrap">
      <v-flex grow xs12> 
    <v-layout row wrap >
      <v-flex grow xs12>
        <v-card flat>
          <v-card-title primary-title>
            <h3 class="headline subtit" pb-0>
              ETP Screener |
              <span class="grey--text">조건에 맞는 ETP종목을 찾아줍니다.</span>
            </h3>
          </v-card-title>
          <v-card class="register_wrap pt0 ml-3" flat xs12 color="lighten-1">
            <h4>조건 설정</h4>
          </v-card>
          <v-card flat class="ml-3" >
            <v-layout>
              <v-flex xs6>
                <!---조건설정 탭--->
                <v-card class="tab_vertical" flat>
                  <v-toolbar flat color="primary" dark>
                    <v-toolbar-title>조건 추가</v-toolbar-title>
                  </v-toolbar>
                  <v-tabs class="v-tabs--vertical">
                    <v-tab> 키워드</v-tab>
                      <v-tab>구성종목</v-tab>
                      <v-tab>성과</v-tab>
                      <v-tab>산업</v-tab>
                      <v-tab>자금유입</v-tab>
                      <v-tab> 배당</v-tab>
                    <v-tab-item>
                      <v-card flat class="pad_a1">
                        종목명에 키워드가 포함된 ETF를 검색합니다.
                        <v-layout class="pt-2">
                          <v-flex>
                           <v-text-field outline placeholder="키워드 입력" ></v-text-field>
                          </v-flex>
                          <v-flex xs3>
                            <v-btn depressed  small color="primary" @click.stop="">확인</v-btn>
                          </v-flex>
                        </v-layout>
                      </v-card>
                    </v-tab-item>

                    <v-tab-item >
                      <v-card flat class="pad_a2">
                        PDF에 포함된 종목을 기준으로  ETF를 검색합니다.<br>
                        조건편집창에 해당 종목의 비중설정도 가능합니다.
                        <v-layout class="pt-2">
                          <v-flex >
                           <v-text-field outline placeholder="ISIN/단축코드/종목명"></v-text-field>
                          </v-flex>
                          <v-flex xs3>
                            <v-btn depressed  small color="primary" @click.stop="">확인</v-btn>
                          </v-flex>
                        </v-layout>
                      </v-card>
                  </v-tab-item>

                   <v-tab-item>
                      <v-card flat class="pad_a1">
                        종목명에 키워드가 포함된 ETF를 검색합니다.
                        <v-layout class="pt-2">
                          <v-flex>
                           <v-text-field outline placeholder="키워드 입력" ></v-text-field>
                          </v-flex>
                          <v-flex xs3>
                            <v-btn depressed  small color="primary" @click.stop="">확인</v-btn>
                          </v-flex>
                        </v-layout>
                      </v-card>
                    </v-tab-item>

                  <v-tab-item>
                    <div v-model="model" class="industry_W">
                      <div v-for="(item, i) in items" :key="i" >
                        <ul>
                          <li v-text="item.text"></li>
                        </ul>
                      </div>
                    </div>
                  </v-tab-item>

                   <v-tab-item>
                      <v-card flat class="pad_a1">
                        종목명에 키워드가 포함된 ETF를 검색합니다.
                        <v-layout class="pt-2">
                          <v-flex>
                           <v-text-field outline placeholder="키워드 입력" ></v-text-field>
                          </v-flex>
                          <v-flex xs3>
                            <v-btn depressed  small color="primary" @click.stop="">확인</v-btn>
                          </v-flex>
                        </v-layout>
                       </v-card>
                    </v-tab-item>

                    <v-tab-item>
                     <v-card flat class="pad_a1">
                        종목명에 키워드가 포함된 ETF를 검색합니다.
                       <v-layout class="pt-2">
                         <v-flex>
                           <v-text-field outline placeholder="키워드 입력" ></v-text-field>
                         </v-flex>
                         <v-flex xs3>
                           <v-btn depressed  small color="primary" @click.stop="">확인</v-btn>
                         </v-flex>
                       </v-layout>
                      </v-card>
                    </v-tab-item>
                  </v-tabs>
                </v-card>
                <!---조건설정 탭 end--->
              </v-flex>
              <v-flex class="ml-3" style="width:48%;">
                <!---조건편집---->
                <v-card class="tab_vertical" flat>
                  <v-toolbar flat color="primary" dark>
                    <v-toolbar-title>조건 편집</v-toolbar-title>
                  </v-toolbar>
                <div class="table-box-wrap v3">
                  <div class="table-box" style="max-height:240px;">
                    <table class="tbl_type ver10" id="table01">
                      <caption>헤더 고정 테이블</caption>
                      <colgroup>
                        <col width="35%" />
                        <col width="25%" />
                        <col width="30%" />
                        <col width="10%" />
                      </colgroup>
                      <tbody>
                        <tr>
                          <td class="txt_left">구성종목>삼성전자(005930)</td>
                          <td class="txt_right">
                            <select> 
                                <option selected>선택</option> 
                                <option>위</option> 
                                <option>위거나 같은</option> 
                                <option>아래</option>
                                <option>아래거나 같은</option> 
                              </select> 
                          </td>
                          <td class="txt_right"><input type="text" name="importance" class="txt_right wid100" value /> %</td>
                          <td class="txt_right"><button class="btn_icon v-icon material-icons"  name="btn_F16013_search" >highlight_off</button></td>
                        </tr>
                        <tr>
                          <td class="txt_left">구성종목>삼성전자(005930)</td>
                          <td class="txt_right">
                            <select> 
                                <option selected>선택</option> 
                                <option>위</option> 
                                <option>위거나 같은</option> 
                                <option>아래</option>
                                <option>아래거나 같은</option>
                              </select> 
                          </td>
                          <td class="txt_right"><input type="text" name="importance" class="txt_right wid100" value /> </td>
                          <td class="txt_right"><button class="btn_icon v-icon material-icons"  name="btn_F16013_search" >highlight_off</button></td>
                        </tr>
                        <tr>
                          <td class="txt_left">구성종목>삼성전자(005930)</td>
                          <td class="txt_right">
                            <select> 
                                <option selected>선택</option> 
                                <option>위</option> 
                                <option>위거나 같은</option> 
                                <option>아래</option>
                                <option>아래거나 같은</option>
                              </select> 
                          </td>
                          <td class="txt_right"><input type="text" name="importance" class="txt_right wid60" value /> % ~ <input type="text" name="importance" class="txt_right wid60" value /> %</td>
                          <td class="txt_right"><button class="btn_icon v-icon material-icons"  name="btn_F16013_search" >highlight_off</button></td>
                        </tr>
                        <tr>
                          <td class="txt_left">구성종목>삼성전자(005930)</td>
                          <td class="txt_right">
                             <select id="test4"> 
                                <option selected>선택</option> 
                                <option>위</option> 
                                <option>위거나 같은</option> 
                                <option>아래</option>
                                <option>아래거나 같은</option>
                              </select> 
                          </td>
                          <td class="txt_right"><input type="text" name="importance" class="txt_right wid100" value /> 원</td>
                          <td class="txt_right"><button class="btn_icon v-icon material-icons"  name="btn_F16013_search" >highlight_off</button></td>
                        </tr>
                        <tr>
                          <td class="txt_left">구성종목>삼성전자(005930)</td>
                          <td class="txt_right">
                             <select> 
                                <option selected>선택</option> 
                                <option>위</option> 
                                <option>위거나 같은</option> 
                                <option>아래</option>
                                <option>아래거나 같은</option>
                              </select> 
                          </td>
                          <td class="txt_right"><input type="text" name="importance" class="txt_right wid100" value /> %</td>
                          <td class="txt_right"><button class="btn_icon v-icon material-icons"  name="btn_F16013_search" >highlight_off</button></td>
                        </tr>
                        <tr>
                          <td class="txt_left">구성종목>삼성전자(005930)</td>
                          <td class="txt_right">
                            <select> 
                               <option selected>선택</option> 
                                <option>위</option> 
                                <option>위거나 같은</option> 
                                <option>아래</option>
                                <option>아래거나 같은</option>
                              </select> 
                          </td>
                          <td class="txt_right"><input type="text" name="importance" class="txt_right wid100" value /> %</td>
                          <td class="txt_right"><button class="btn_icon v-icon material-icons"  name="btn_F16013_search" >highlight_off</button></td>
                        </tr>
                        <tr>
                          <td class="txt_left">구성종목>삼성전자(005930)</td>
                          <td class="txt_right">
                            <select> 
                                <option selected>선택</option> 
                                <option>위</option> 
                                <option>위거나 같은</option> 
                                <option>아래</option>
                                <option>아래거나 같은</option>
                              </select> 
                          </td>
                          <td class="txt_right"><input type="text" name="importance" class="txt_right wid100" value /> %</td>
                          <td class="txt_right"><button class="btn_icon v-icon material-icons"  name="btn_F16013_search" >highlight_off</button></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                </v-card>
                <!---조건편집 end---->
              </v-flex>
            </v-layout>
          </v-card>
        </v-card>
      </v-flex>
      <v-flex grow xs12>
        <v-card flat class="pl-3 pr-3 pt-4">
          <v-card class="register_wrap v2" flat xs12 color="lighten-1">
            <h4>검색결과
              <span class="text_result">100/630</span>
              <span class="text_result_t">results</span></h4>
          </v-card>
          <v-tabs class="tab_wid_fix">
              <v-tabs-slider></v-tabs-slider>
              <v-tab>시세</v-tab>
              <v-tab>성과</v-tab>
              <v-tab>산업</v-tab>
              <v-tab>자금유입</v-tab>
              <v-tab>배당</v-tab>
          
          <v-tabs-items>
            <!--검색결과 탭1 시세--->
            <v-tab-item >
              <div class="btn_only_r v2">
                <span class="btn_rr">
                  <button
                    type="button"
                    class="exceldown_btn"
                    id="jsonFileDownload"
                    @click="fn_jsonFileDownload()"
                  ></button>
                </span>
              </div>
              <div class="table-box-wrap v2">
                  <div class="table-box" style="max-height:600px;">
              <table class="tbl_type sort" style="width:100%">
                  <colgroup>
                    <col width="20%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="10%" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th width="20%" class="txt_left sorting">종목명</th>
                      <th width="10%" class="txt_right sorting">종목코드</th>
                      <th width="10%" class="txt_right sorting_asc">순자산총액(단위:억)</th>
                      <th width="10%" class="txt_right sorting_desc">NAV</th>
                      <th width="10%" class="txt_right sorting">NAV 등락(%)</th>
                      <th width="10%" class="txt_right sorting">현재가</th>
                      <th width="10%" class="txt_right sorting">현재가 등락(%)</th>
                      <th width="10%" class="txt_right sorting">거래량</th>
                      <th width="10%" class="txt_right sorting">거래대금(단위:억)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="txt_left">KODEX 200</td>
                      <td class="txt_right">005930</td>
                      <td class="txt_right">999,999</td>
                      <td class="txt_right">999,999.99</td>
                      <td class="txt_right">-99.99%</td>
                      <td class="txt_right">999,999</td>
                      <td class="txt_right">-99.99%</td>
                      <td class="txt_right">999,999,999</td>
                      <td class="txt_right">999,999,999</td>
                    </tr>
                    <tr>
                      <td class="txt_left">KODEX 200</td>
                      <td class="txt_right">005930</td>
                      <td class="txt_right">999,999</td>
                      <td class="txt_right">999,999.99</td>
                      <td class="txt_right">-99.99%</td>
                      <td class="txt_right">999,999</td>
                      <td class="txt_right">-99.99%</td>
                      <td class="txt_right">999,999,999</td>
                      <td class="txt_right">999,999,999</td>
                    </tr>
                  </tbody>
                </table>
                  </div>
              </div>
              </v-tab-item>
               <!--검색결과 탭1 end--->
              <!--검색결과 탭2 성과--->
              <v-tab-item >
                <div class="table-box-wrap v2">
                  <div class="table-box" style="max-height:600px;">
              <table class="tbl_type sort" style="width:100%">
                  <colgroup>
                    <col width="20%" />
                    <col width="8%" />
                    <col width="8%" />
                    <col width="8%" />
                    <col width="8%" />
                    <col width="8%" />
                    <col width="8%" />
                    <col width="8%" />
                    <col width="8%" />
                    <col width="8%" />
                    <col width="8%" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th width="20%" class="txt_left sorting">종목명</th>
                      <th width="8%" class="txt_right sorting">종목코드</th>
                      <th width="8%" class="txt_right sorting_asc">Daily</th>
                      <th width="8%" class="txt_right sorting_desc">1Week</th>
                      <th width="8%" class="txt_right sorting">1Month</th>
                      <th width="8%" class="txt_right sorting">3Month</th>
                      <th width="8%" class="txt_right sorting">YTD</th>
                      <th width="8%" class="txt_right sorting">1Year</th>
                      <th width="8%" class="txt_right sorting">3Year</th>
                      <th width="8%" class="txt_right sorting">5Year</th>
                      <th width="8%" class="txt_right sorting">10Year</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="txt_left">KODEX 200</td>
                      <td class="txt_right">005930</td>
                      <td class="txt_right">999,999</td>
                      <td class="txt_right">999,999.99</td>
                      <td class="txt_right">-99.99%</td>
                      <td class="txt_right">999,999</td>
                      <td class="txt_right">-99.99%</td>
                      <td class="txt_right">999,999,999</td>
                      <td class="txt_right">999,999,999</td>
                      <td class="txt_right">999,999,999</td>
                      <td class="txt_right">999,999,999</td>
                    </tr>
                    <tr>
                      <td class="txt_left">KODEX 200</td>
                      <td class="txt_right" >005930</td>
                      <td class="txt_right">999,999</td>
                      <td class="txt_right">999,999.99</td>
                      <td class="txt_right">-99.99%</td>
                      <td class="txt_right">999,999</td>
                      <td class="txt_right">-99.99%</td>
                      <td class="txt_right">999,999,999</td>
                      <td class="txt_right">999,999,999</td>
                      <td class="txt_right">999,999,999</td>
                      <td class="txt_right">999,999,999</td>
                    </tr>
                  </tbody>
                </table>
                  </div>
                </div>
              </v-tab-item>
               <!--검색결과 탭2 end--->
                <!--검색결과 탭3 산업--->
              <v-tab-item>
                <div class="table-box-wrap v2">
                  <div class="table-box" style="max-height:600px;">
              <table class="tbl_type ver13 sort" style="width:100%">
                  <colgroup>
                    <col width="12%" />
                    <col width="8%" />
                    <col width="8%" />
                    <col width="8%" />
                    <col width="8%" />
                    <col width="8%" />
                    <col width="8%" />
                    <col width="8%" />
                    <col width="8%" />
                    <col width="8%" />
                    <col width="8%" />
                    <col width="8%" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th width="12%" class="txt_left sorting">종목명</th>
                      <th width="8%" class="txt_right sorting">종목코드</th>
                      <th width="8%" class="txt_right sorting_asc">에너지</th>
                      <th width="8%" class="txt_right sorting_desc">소재</th>
                      <th width="8%" class="txt_right sorting">산업재</th>
                      <th width="8%" class="txt_right sorting">자유소비재</th>
                      <th width="8%" class="txt_right sorting">필수소비재</th>
                      <th width="8%" class="txt_right sorting">건강관리</th>
                      <th width="8%" class="txt_right sorting">금융</th>
                      <th width="8%" class="txt_right sorting">정보기술</th>
                      <th width="8%" class="txt_right sorting">커뮤니케이션서비스</th>
                      <th width="8%" class="txt_right sorting">유틸리티</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="txt_left">KODEX 200</td>
                      <td class="txt_right">005930</td>
                      <td class="txt_right">999,999</td>
                      <td class="txt_right">999,999.99</td>
                      <td class="txt_right">-99.99%</td>
                      <td class="txt_right">999,999</td>
                      <td class="txt_right">-99.99%</td>
                      <td class="txt_right">999,999,999</td>
                      <td class="txt_right">999,999,999</td>
                      <td class="txt_right">999,999,999</td>
                      <td class="txt_right">999,999,999</td>
                      <td class="txt_right">999,999,999</td>
                    </tr>
                    <tr>
                      <td class="txt_left">KODEX 200</td>
                      <td class="txt_right">005930</td>
                      <td class="txt_right">999,999</td>
                      <td class="txt_right">999,999.99</td>
                      <td class="txt_right">-99.99%</td>
                      <td class="txt_right">999,999</td>
                      <td class="txt_right">-99.99%</td>
                      <td class="txt_right">999,999,999</td>
                      <td class="txt_right">999,999,999</td>
                      <td class="txt_right">999,999,999</td>
                      <td class="txt_right">999,999,999</td>
                      <td class="txt_right">999,999,999</td>
                    </tr>
                  </tbody>
                </table>
                  </div>
                </div>
              </v-tab-item>
               <!--검색결과 탭3 end--->
              <!--검색결과 탭4 자금유입--->
              <v-tab-item>
                <div class="btn_only_r">
                <span class="btn_rr">
                  (단위: 억원)
                </span>
              </div>
                <div class="table-box-wrap v2">
                  <div class="table-box" style="max-height:600px;">
              <table class="tbl_type sort" style="width:100%">
                  <colgroup>
                    <col width="20%" />
                    <col width="16%" />
                    <col width="16%" />
                    <col width="16%" />
                    <col width="16%" />
                    <col width="16%" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th width="20%" class="txt_left sorting">종목명</th>
                      <th width="16%" class="txt_right sorting">종목코드</th>
                      <th width="16%" class="txt_right sorting_asc">1주</th>
                      <th width="16%" class="txt_right sorting_desc">1개월</th>
                      <th width="16%" class="txt_right sorting">3개월</th>
                      <th width="16%" class="txt_right sorting">6개월</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="txt_left">KODEX 200</td>
                      <td class="txt_right">005930</td>
                      <td class="txt_right">999,999</td>
                      <td class="txt_right">999,999.99</td>
                      <td class="txt_right">-99.99%</td>
                      <td class="txt_right">999,999</td>
                    </tr>
                    <tr>
                      <td class="txt_left">KODEX 200</td>
                      <td class="txt_right">005930</td>
                      <td class="txt_right">999,999</td>
                      <td class="txt_right">999,999.99</td>
                      <td class="txt_right">-99.99%</td>
                      <td class="txt_right">999,999</td>
                    </tr>
                  </tbody>
                </table>
                  </div>
                </div>
              </v-tab-item>
               <!--검색결과 탭4 end--->
               <!--검색결과 탭5 배당--->
              <v-tab-item>
                <div class="btn_only_r">
                <span class="btn_rr">
                  (단위: 억원)
                </span>
              </div>
                <div class="table-box-wrap v2">
                  <div class="table-box" style="max-height:600px;">
              <table class="tbl_type sort" style="width:100%">
                  <colgroup>
                    <col width="20%" />
                    <col width="16%" />
                    <col width="16%" />
                    <col width="16%" />
                    <col width="16%" />
                    <col width="16%" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th width="20%" class="txt_left sorting">종목명</th>
                      <th width="16%" class="txt_right sorting">종목코드</th>
                      <th width="16%" class="txt_right sorting_asc">1주</th>
                      <th width="16%" class="txt_right sorting_desc">1개월</th>
                      <th width="16%" class="txt_right sorting">3개월</th>
                      <th width="16%" class="txt_right sorting">6개월</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="txt_left">KODEX 200</td>
                      <td class="txt_right">005930</td>
                      <td class="txt_right">999,999</td>
                      <td class="txt_right">999,999.99</td>
                      <td class="txt_right">-99.99%</td>
                      <td class="txt_right">999,999</td>
                    </tr>
                    <tr>
                      <td class="txt_left">KODEX 200</td>
                      <td class="txt_right">005930</td>
                      <td class="txt_right">999,999</td>
                      <td class="txt_right">999,999.99</td>
                      <td class="txt_right">-99.99%</td>
                      <td class="txt_right">999,999</td>
                    </tr>
                  </tbody>
                </table>
                  </div>
                </div>
              </v-tab-item>
               <!--검색결과 탭5 end--->
            </v-tabs-items>
            </v-tabs>

        </v-card>
      </v-flex>
    </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>



<script>
  export default {
    data() {
      return {
        tab: null,
        text: '',
        icons: false,
        centered: false,
        grow: false,
        vertical: false,
        prevIcon: false,
        nextIcon: false,
        right: false,
        tabs: 3,
        items: [
        {
          text: '에너지',
        },
        {
          text: '소재',
        },
        {
          text: '산업재',
        },
        {
          text: '자유소비재',
        },
        {
          text: '필수소비재',
        },
        {
          text: '건강관리',
        },
        {
          text: '건강관리',
        },
        {
          text: '건강관리',
        },
        {
          text: '건강관리',
        },
        {
          text: '건강관리',
        },
      ],
      model: 1,
      }
    }
  }




</script>