// 사용자
import Home from './components/Home/Home.vue'
// MARKET ETP PORTAL
import EtpPortalMain from './components/Home/MarketInfo/etpportal/EtpPortalMain.vue'
import EtpPortal from './components/Home/MarketInfo/etpportal/EtpPortal.vue'
import EtpScreener from './components/Home/MarketInfo/etpportal/EtpScreener.vue'
// MARKET ETP INFO
import EtpInfoMain from './components/Home/MarketInfo/etp/EtpInfoMain.vue'
// MARKET INDEX INFO
import IndexInfoMain from './components/Home/MarketInfo/index/IndexInfoMain.vue'
import KrxIndexList from './components/Home/MarketInfo/index/KrxIndexList.vue'
import FngIndexList from './components/Home/MarketInfo/index/FngIndexList.vue'

// INDEX        
import IndexManageMain from './components/Home/Index/Manage/IndexManageMain.vue'
import IndexMainSummary from '@/components/Home/Index/Manage/Summary.vue';
import IndexMainIndexList from '@/components/Home/Index/Manage/IndexList.vue';
import IndexMainIndexDetailList from '@/components/Home/Index/Manage/IndexDetailList.vue';
import IndexRegisterMain from './components/Home/Index/Register/IndexRegisterMain.vue'
import IndexDetailInfo from './components/Home/Index/Manage/IndexDetailInfo.vue'
// ETP
import EtpOperMain from './components/Home/Etp/Manage/EtpOperMain.vue' /* ETP 운용관리 메인 */
import EtpOperInfo from "./components/Home/Etp/Manage/EtpOperInfo.vue"; /* ETP 운용정보 */
import EtpOperIndex from "./components/Home/Etp/Manage/EtpOperIndex.vue"; /* 지수관리 */
import EtpOperPdf from "./components/Home/Etp/Manage/EtpOperPdf.vue"; /* PDF 관리 */
import EtpRegisterMain from './components/Home/Etp/Register/EtpRegisterMain.vue';
import EtpContractMain from './components/Home/Etp/Contract/EtpContractMain.vue';
// LP
import LpOperMain from './components/Home/Lp/Manage/LpOperMain.vue' /* LP 운용관리 메인 */
import LpOperInfo from "./components/Home/Lp/Manage/LpOperInfo.vue"; /* LP 운용정보 */
// simulation
import SimulationControl from '@/components/Home/Simulation/SimulationControl.vue'
import SimulationList from '@/components/Home/Simulation/SimulationList.vue'
import Simulation from '@/components/Home/Simulation/Simulation.vue'
import SimulationResult from '@/components/Home/Simulation/SimulationResult.vue'
import SimulationTimeSeriesUpload from '@/components/Home/Simulation/SimulationTimeSeriesUpload.vue'
// OperSupport
import OperSupportControl from '@/components/Home/OperSupport/OperSupportControl.vue'
// 기초지수 장애내역
import IndexFaultControl from '@/components/Home/IndexFault/IndexFaultControl.vue'
// 사용자(MOBILE)
import MobileHome from './components/MobileHome/M_Home.vue'
export const routes = [{
    path: '/home',
    component: Home,
    children: [
      // MARKET INFO
      { 
        name: 'etpInfo',
        path: 'info/etpinfo',
        component: EtpInfoMain,
        meta: {
          requiresAuth: false
        },
      }, {
        name: 'indexInfo',
        path: 'info/indexinfo',
        component: IndexInfoMain,
        children: [{
          name: 'krxindexlist',
          path: 'krxindexlist',
          component: KrxIndexList
        }, {
          name: 'fngindexlist',
          path: 'fngindexlist',
          component: FngIndexList
        }, ]
      },
      // INDEX
      {
        name: 'indexManage',
        path: 'index/manage',
        component: IndexManageMain,
        meta: {
          requiresAuth: true,
          requiresType: ['0003', '0005']
        },
        children: [{
          name: 'indexSummary',
          path: 'indexSummary',
          component: IndexMainSummary,
          meta: {
            requiresAuth: true,
            requiresType: ['0003', '0005']
          },
        }, {
          name: 'indexList',
          path: 'indexList',
          component: IndexMainIndexList,
          meta: {
            requiresAuth: true,
            requiresType: ['0003', '0005']
          },
        }, {
          name: 'indexDetailList',
          path: 'indexDetailList',
          component: IndexMainIndexDetailList,
          meta: {
            requiresAuth: true,
            requiresType: ['0003', '0005']
          },
        }, ]
      }, {
        name: 'IndexDetailInfo',
        path: '/index/manage/IndexDetailInfo',
        component: IndexDetailInfo,
        meta: {
          requiresAuth: true,
          requiresType: ['0003', '0005']
        },
      }, {
        name: 'indexRegister',
        path: '/index/register',
        component: IndexRegisterMain,
        meta: {
          requiresAuth: true,
          requiresType: ['0003', '0005']
        },
      },
      //  ETP 운용관리
      {
        name: 'etpOperMain',
        path: 'etp/manage',
        component: EtpOperMain,
        /* ETP 운용관리 메인 */
        meta: {
          requiresAuth: true,
          requiresType: ['0001', '0002', '0004', '0005']
        },
        children: [{
          name: 'etpOperInfo',
          path: 'etpOperInfo',
          component: EtpOperInfo,
          /* ETP 운용정보 */
          meta: {
            requiresAuth: true,
            requiresType: ['0001', '0002', '0004', '0005']
          },
        }, {
          name: 'etpOperIndex',
          path: 'etpOperIndex',
          component: EtpOperIndex,
          /* 지수관리 */
          meta: {
            requiresAuth: true,
            requiresType: ['0001', '0002', '0004', '0005']
          },
        }, {
          name: 'etpOperPdf',
          path: 'etpOperPdf',
          component: EtpOperPdf,
          /* PDF 관리 */
          meta: {
            requiresAuth: true,
            requiresType: ['0001', '0002', '0004', '0005']
          },
        }, ]
      }, {
      //  ETP 신규등록
        name: 'etpRegister',
        path: 'etp/register',
        component: EtpRegisterMain,
        meta: {
          requiresAuth: true,
          requiresType: ['0001', '0002', '0004', '0005']
        },
      }, {
        name: 'etpContract',
        path: 'etp/contract',
        component: EtpContractMain,
        meta: {
          requiresAuth: true,
          requiresType: ['0001', '0002', '0004', '0005']
        },
      },
      //  LP 운용관리
      {
        name: 'lpOperMain',
        path: 'lp/manage',
        component: LpOperMain,
        /* LP 운용관리 메인 */
        meta: {
          requiresAuth: false,
        },
        children: [{
          name: 'lpOperInfo',
          path: 'lpOperInfo',
          component: LpOperInfo,
          /* LP 운용정보 */
          meta: {
            requiresAuth: false,
          },
        }, ]
      },
      //  시뮬레이션
      {
        name: 'simulationControl',
        path: 'simulation/simulationControl',
        component: SimulationControl,
        meta: {
          requiresAuth: false,
        },
      }, {
        name: 'simulationList',
        path: 'simulation/simulationList',
        component: SimulationList,
        meta: {
          requiresAuth: false,
        },
      }, {
        name: 'simulation',
        path: 'simulation/simulation',
        component: Simulation,
        meta: {
          requiresAuth: false,
        },
      }, {
        name: 'simulationResult',
        path: 'simulation/simulationResult',
        component: SimulationResult,
        meta: {
          requiresAuth: false,
        },
      }, {
        name: 'SimulationTimeSeriesUpload',
        path: 'simulation/SimulationTimeSeriesUpload',
        component: SimulationTimeSeriesUpload,
        meta: {
          requiresAuth: false,
        },
      },
      //운용지원
      {
        name: 'OperSupportControl',
        path: 'OperSupport/OperSupportControl',
        component: OperSupportControl,
        meta: {
          requiresAuth: false,
        },
      },
      //기초지수 장애내역
      {
        name: 'IndexFaultControl',
        path: 'IndexFault/IndexFaultControl',
        component: IndexFaultControl,
        meta: {
          requiresAuth: false,
        },
      // ETP PORTAL
      }, {
        name: 'etpPortal',
        path: 'info/etpportal',
        component: EtpPortalMain,
        children: [{
          path: 'portal',
          component: EtpPortal
        }, {
          path: 'screener',
          component: EtpScreener
        }, ]
      },
    ]
  },
  // MOBILE
  {
    name: 'mobileHome',
    path: '/mobile',
    component: MobileHome,
    children: [
      // MARKET INFO
      {
        name: 'mobileEtpInfo',
        path: 'info/etpinfo',
        component: EtpInfoMain,
        meta: {
          requiresAuth: false
        },
      },
    ]
  },
  // NOT FOUND
  /*
  {
    path: '*',
    component: Home,
  }
  */
]