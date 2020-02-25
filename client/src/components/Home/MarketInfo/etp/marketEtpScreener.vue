<template>
  <v-container>
    <v-layout row wrap>
      <v-flex grow xs12>
        <v-card flat>
          <v-card-title primary-title>
            <h3 class="headline subtit" pb-0>
              ETP Screener |
              <span class="grey--text">조건에 맞는 ETP종목을 찾아줍니다.</span>
            </h3>
          </v-card-title>
          <v-card class="register_wrap pt0" flat xs12 color="lighten-1">
            <h4>조건 설정</h4>
          </v-card>
          <v-card flat>
            <v-layout>
              <v-flex xs5>
                <!---조건설정 탭--->
                <v-card>
                  <v-toolbar flat color="primary" dark>
                    <v-toolbar-title>User Profile</v-toolbar-title>
                  </v-toolbar>
                  <v-tabs
                    v-model="tab"
                    class="elevation-2 v-tabs--vertical"
                    :centered="centered"
                    :grow="grow"
                    :vertical="vertical"
                    :right="right"
                    :prev-icon="prevIcon ? 'mdi-arrow-left-bold-box-outline' : undefined"
                    :next-icon="nextIcon ? 'mdi-arrow-right-bold-box-outline' : undefined"
                    :icons-and-text="icons"
                  >
                    <v-tabs-slider></v-tabs-slider>

                    <v-tab v-for="i in tabs" :key="i" :href="`#tab-${i}`">
                      Tab {{ i }}
                      <v-icon v-if="icons">mdi-phone</v-icon>
                    </v-tab>

                    <v-tab-item v-for="i in tabs" :key="i" :value="'tab-' + i">
                      <v-card flat tile>
                        <v-card-text>{{ text }}</v-card-text>
                      </v-card>
                    </v-tab-item>
                  </v-tabs>
                </v-card>
                <!---조건설정 탭 end--->
              </v-flex>
              <v-flex xs6></v-flex>
            </v-layout>
          </v-card>
        </v-card>
      </v-flex>
      <v-flex grow xs12>
        <v-card flat>
          <v-card class="register_wrap pt0" flat xs12 color="lighten-1">
            <h4>검색결과
              <span class="text_result">100/630</span>
              <span class="text_result_t">results</span></h4>
          </v-card>
          <v-tabs v-model="activeTab" centered grow>
              <v-tabs-slider></v-tabs-slider>
              <v-tab v-for="item in items" :key="item.tab">{{ item.tab }}</v-tab>
          </v-tabs>
          <v-tabs-items v-model="activeTab">
            <v-tab-item v-for="item in items" :key="item.tab">
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
                      <th class="txt_left sorting">종목명</th>
                      <th class="sorting">종목코드</th>
                      <th class="txt_right sorting_asc">순자산총액(단위:억)</th>
                      <th class="txt_right sorting_desc">NAV</th>
                      <th class="txt_right sorting">NAV 등락(%)</th>
                      <th class="txt_right sorting">현재가</th>
                      <th class="txt_right sorting">현재가 등락(%)</th>
                      <th class="txt_right sorting">거래량</th>
                      <th class="txt_right sorting">거래대금(단위:억)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="txt_left">KODEX 200</td>
                      <td>005930</td>
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
                      <td>005930</td>
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
              </v-tab-item>
              <v-tab-item>
              
              </v-tab-item>
            </v-tabs-items>

        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        tab: null,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        icons: false,
        centered: false,
        grow: false,
        vertical: false,
        prevIcon: false,
        nextIcon: false,
        right: false,
        tabs: 3,
      }
    },
  }



</script>