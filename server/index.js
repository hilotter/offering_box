const querystring = require('querystring');
const axios = require('axios');
const Web3 = require('web3');
const OfferingBox = require('../build/contracts/OfferingBox.json');

const wsProvider = new Web3.providers.WebsocketProvider(process.env.INFURA_WS_URL)
const web3 = new Web3(wsProvider);

const instance = new web3.eth.Contract(OfferingBox.abi, process.env.CONTRACT_ADDRESS);

const fortuneteller = () => {
  const results = [
    '「大吉」です。何か良いことが起こりそうです。',
    '「中吉」です。今日も元気に過ごしましょう。',
    '「小吉」です。今日もがんばりましょう。',
    '「凶」です。いつも以上に気をつけて過ごしましょう。',
  ];

  const random = Math.floor(Math.random() * results.length);
  return `本日の運勢は${results[random]}`;
}

const event = instance.events.Donate();
event.on('data', async (event) => {
  console.log(event);
  const result = fortuneteller()
  const params = querystring.stringify({ text: result });
  try {
    await axios.post(process.env.GOOGLE_HOME_API_URL, params)
    console.log(params);
  } catch(error) {
    console.log(error);
  }
});
event.on('changed', (event) => {
  console.log("changed", event);
});
event.on('error', (error) => {
  console.log("error", error);
});

