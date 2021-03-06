// import request from '../util/request'
const delay = millisecond => {
  return new Promise(resolve => {
    setTimeout(resolve, millisecond)
  })
}
export default {
  namespace: 'cards',
  state: {
    cardsList: [],
    counter: 3,
  },
  effects: {
    *queryList(_, sagaEffects) {
      const listData = [
        {
          name: 'umi',
          desc: '极快的类 Next.js 的 React 应用框架',
          url: 'https://umijs.org',
          key: '1',
        },
        {
          name: 'antd',
          desc: '一个服务于企业级产品的设计体系',
          url: 'https://ant.design/index-cn',
          key: '2',
        },
        {
          name: 'antd-pro',
          desc: '一个服务于企业级产品的设计体系',
          url: 'https://ant.design/index-cn',
          key: '3',
        },
      ]
      const { call, put } = sagaEffects
      yield call(delay, 1000)
      yield put({ type: 'initList', payload: listData })
    },
  },
  reducers: {
    addOne(state, { payload: newCard }) {
      const nextCounter = state.counter + 1
      const newCardWithKey = { ...newCard, key: nextCounter.toString() }
      const nextCardsList = state.cardsList.concat(newCardWithKey)
      return {
        cardsList: nextCardsList,
        counter: nextCounter,
      }
    },
    initList(state, { payload }) {
      const cardsList = [...payload]
      return {
        cardsList,
      }
    },
  },
}
