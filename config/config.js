export default {
  singular: true,
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
      },
    ],
  ],
  routes: [
    {
      path: '/',
      component: '../layout',
      routes: [
        { path: 'helloworld', component: './HelloWorld' },
        { path: 'puzzlecards', component: './puzzlecards' },
      ],
    },
  ],
}
