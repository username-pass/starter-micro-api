const axios = require('axios');

const wordsUrl = 'https://raw.githubusercontent.com/dwyl/english-words/master/words.txt';
const baseUrl = 'https://replit.com/@';

const existingUsers = [];
const nonExistingUsers = [];

async function checkUserExistence(username) {
  try {
    const response = await axios.get(`${baseUrl}${username}`);
    const title = response.data.match(/<title>(.*?)<\/title>/)[1];
    if (title.toLowerCase().includes('404') /*|| response.data.toLowerCase().includes('404') */) {
			console.log(username,'doesn\'t exist, from title' + title)
      nonExistingUsers.push(username);
    } else {
      existingUsers.push(username);
    }
  } catch (error) {
		console.log(error)
    nonExistingUsers.push(username);
  }
}

async function main() {
  const response = await axios.get(wordsUrl);
  const dictionary = response.data.split('\n');
  for (let i = 100; i < 120; i++) {
    await checkUserExistence(dictionary[i]);
  }
  console.log('Existing users:', existingUsers);
  console.log('Non-existing users:', nonExistingUsers);
}

main();
